import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error during registration" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Don't return the password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Server error during login" });
    }
  });

  // Plan routes
  app.get("/api/plans", async (req, res) => {
    try {
      const plans = [
        {
          id: 1,
          name: "Starter",
          price: 29,
          billingCycle: "month",
          features: [
            "Process up to $10,000/month",
            "2.9% + 30¢ per transaction",
            "Accept major credit cards",
            "Basic fraud protection",
            "24/7 email support"
          ],
          isPopular: false
        },
        {
          id: 2,
          name: "Professional",
          price: 79,
          billingCycle: "month",
          features: [
            "Process up to $50,000/month",
            "2.5% + 25¢ per transaction",
            "All payment methods",
            "Advanced fraud protection",
            "24/7 priority support",
            "Detailed analytics dashboard"
          ],
          isPopular: true
        },
        {
          id: 3,
          name: "Enterprise",
          price: 249,
          billingCycle: "month",
          features: [
            "Unlimited processing",
            "Custom pricing available",
            "All payment methods",
            "Advanced fraud protection plus",
            "Dedicated account manager",
            "Custom integrations"
          ],
          isPopular: false
        }
      ];
      
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Server error fetching plans" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
