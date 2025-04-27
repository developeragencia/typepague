import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  company: text("company"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  billingCycle: text("billing_cycle").notNull(),
  features: text("features").array(),
  isPopular: boolean("is_popular").default(false),
});

export const statusEnum = pgEnum('status', ['pending', 'active', 'canceled']);

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  planId: integer("plan_id").notNull(),
  status: statusEnum("status").default('pending'),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  lastBilled: timestamp("last_billed"),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subscriptionId: integer("subscription_id"),
  amount: integer("amount").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const customerSupport = pgTable("customer_support", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default('open'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  company: true,
  isAdmin: true,
});

export const insertPlanSchema = createInsertSchema(plans);
export const insertSubscriptionSchema = createInsertSchema(subscriptions);
export const insertTransactionSchema = createInsertSchema(transactions);
export const insertCustomerSupportSchema = createInsertSchema(customerSupport);

export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type InsertCustomerSupport = z.infer<typeof insertCustomerSupportSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Plan = typeof plans.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type CustomerSupport = typeof customerSupport.$inferSelect;
