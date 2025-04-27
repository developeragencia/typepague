import { 
  users, 
  plans, 
  subscriptions, 
  transactions, 
  customerSupport, 
  type User, 
  type Plan, 
  type Subscription,
  type Transaction, 
  type CustomerSupport,
  type InsertUser, 
  type InsertPlan,
  type InsertSubscription,
  type InsertTransaction,
  type InsertCustomerSupport
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import { Store } from "express-session";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Admin methods
  getAllUsers(): Promise<User[]>;
  getAllPlans(): Promise<Plan[]>;
  createPlan(plan: InsertPlan): Promise<Plan>;
  updatePlan(id: number, plan: Partial<Plan>): Promise<Plan | undefined>;
  deletePlan(id: number): Promise<boolean>;
  
  // Subscription methods
  getSubscriptionsByUser(userId: number): Promise<Subscription[]>;
  getAllSubscriptions(): Promise<Subscription[]>;
  
  // Support methods
  getSupportTicketsByUser(userId: number): Promise<CustomerSupport[]>;
  createSupportTicket(ticket: InsertCustomerSupport): Promise<CustomerSupport>;
  
  // Session store
  sessionStore: Store;
}

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: Store;
  
  constructor() {
    const PgStore = connectPg(session);
    this.sessionStore = new PgStore({ 
      pool, 
      createTableIfMissing: true 
    }) as Store;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  async getAllPlans(): Promise<Plan[]> {
    return await db.select().from(plans);
  }
  
  async createPlan(plan: InsertPlan): Promise<Plan> {
    const [newPlan] = await db
      .insert(plans)
      .values(plan)
      .returning();
    return newPlan;
  }
  
  async updatePlan(id: number, planUpdate: Partial<Plan>): Promise<Plan | undefined> {
    const [updatedPlan] = await db
      .update(plans)
      .set(planUpdate)
      .where(eq(plans.id, id))
      .returning();
    return updatedPlan;
  }
  
  async deletePlan(id: number): Promise<boolean> {
    const result = await db
      .delete(plans)
      .where(eq(plans.id, id))
      .returning();
    return result.length > 0;
  }
  
  async getSubscriptionsByUser(userId: number): Promise<Subscription[]> {
    return await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));
  }
  
  async getAllSubscriptions(): Promise<Subscription[]> {
    return await db.select().from(subscriptions);
  }
  
  async getSupportTicketsByUser(userId: number): Promise<CustomerSupport[]> {
    return await db
      .select()
      .from(customerSupport)
      .where(eq(customerSupport.userId, userId));
  }
  
  async createSupportTicket(ticket: InsertCustomerSupport): Promise<CustomerSupport> {
    const [newTicket] = await db
      .insert(customerSupport)
      .values(ticket)
      .returning();
    return newTicket;
  }
}

export const storage = new DatabaseStorage();
