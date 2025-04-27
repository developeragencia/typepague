import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { db } from "./db";
import { plans } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication with Passport
  setupAuth(app);

  // Plan routes
  app.get("/api/plans", async (req, res) => {
    try {
      // Check if there are any plans in the database
      const existingPlans = await storage.getAllPlans();
      
      if (existingPlans.length > 0) {
        return res.json(existingPlans);
      }
      
      // If no plans, create some default ones
      const defaultPlans = [
        {
          name: "Básico",
          price: 29,
          billingCycle: "mês",
          features: [
            "Processe até R$10.000/mês",
            "2,9% + R$0,30 por transação",
            "Aceite principais cartões de crédito",
            "Proteção básica contra fraudes",
            "Suporte por e-mail 24/7"
          ],
          isPopular: false
        },
        {
          name: "Profissional",
          price: 79,
          billingCycle: "mês",
          features: [
            "Processe até R$50.000/mês",
            "2,5% + R$0,25 por transação",
            "Todos os métodos de pagamento",
            "Proteção avançada contra fraudes",
            "Suporte prioritário 24/7",
            "Painel de análise detalhado"
          ],
          isPopular: true
        },
        {
          name: "Empresarial",
          price: 249,
          billingCycle: "mês",
          features: [
            "Processamento ilimitado",
            "Preços personalizados disponíveis",
            "Todos os métodos de pagamento",
            "Proteção avançada premium contra fraudes",
            "Gerente de conta dedicado",
            "Integrações personalizadas"
          ],
          isPopular: false
        }
      ];
      
      // Insert plans into database
      await db.insert(plans).values(defaultPlans);
      
      // Fetch the inserted plans
      const newPlans = await storage.getAllPlans();
      res.json(newPlans);
    } catch (error) {
      console.error("Erro ao buscar planos:", error);
      res.status(500).json({ message: "Erro ao buscar planos" });
    }
  });
  
  // Customer Support routes
  app.post("/api/support", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Não autorizado" });
      }
      
      const ticket = await storage.createSupportTicket({
        ...req.body,
        userId: req.user!.id
      });
      
      res.status(201).json(ticket);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/support", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Não autorizado" });
      }
      
      const tickets = await storage.getSupportTicketsByUser(req.user!.id);
      res.json(tickets);
    } catch (error) {
      next(error);
    }
  });
  
  // User Subscription routes
  app.get("/api/subscriptions", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Não autorizado" });
      }
      
      const subscriptions = await storage.getSubscriptionsByUser(req.user!.id);
      res.json(subscriptions);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
