import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "super-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: await hashPassword(req.body.password),
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });

  // Middleware to check if user is an admin
  const isAdmin = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    if (req.isAuthenticated() && req.user?.isAdmin) {
      return next();
    }
    return res.status(403).json({ error: "Acesso negado" });
  };

  // Admin routes
  app.get("/api/admin/users", isAdmin, async (req, res, next) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/plans", isAdmin, async (req, res, next) => {
    try {
      const plans = await storage.getAllPlans();
      res.json(plans);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/admin/plans", isAdmin, async (req, res, next) => {
    try {
      const plan = await storage.createPlan(req.body);
      res.status(201).json(plan);
    } catch (error) {
      next(error);
    }
  });

  app.put("/api/admin/plans/:id", isAdmin, async (req, res, next) => {
    try {
      const planId = parseInt(req.params.id);
      const updatedPlan = await storage.updatePlan(planId, req.body);
      if (!updatedPlan) {
        return res.status(404).json({ error: "Plano não encontrado" });
      }
      res.json(updatedPlan);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/admin/plans/:id", isAdmin, async (req, res, next) => {
    try {
      const planId = parseInt(req.params.id);
      const success = await storage.deletePlan(planId);
      if (!success) {
        return res.status(404).json({ error: "Plano não encontrado" });
      }
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/subscriptions", isAdmin, async (req, res, next) => {
    try {
      const subscriptions = await storage.getAllSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      next(error);
    }
  });
}