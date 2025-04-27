import { db } from "./db";
import { users } from "@shared/schema";
import { hashPassword } from "./auth";

async function createAdminUser() {
  try {
    const username = "admin";
    const password = "admin123";
    
    // Verificar se o admin já existe
    const [existingAdmin] = await db
      .select()
      .from(users)
      .where(field => field.username.equals(username));
    
    if (existingAdmin) {
      console.log("Usuário admin já existe!");
      return;
    }
    
    // Criar o admin
    const hashedPassword = await hashPassword(password);
    
    const [adminUser] = await db
      .insert(users)
      .values({
        username,
        password: hashedPassword,
        fullName: "Administrador",
        email: "admin@payhub.com",
        isAdmin: true
      })
      .returning();
    
    console.log("Usuário admin criado com sucesso!");
    console.log("Credenciais:");
    console.log("- Username:", username);
    console.log("- Password:", password);
    
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error);
  } finally {
    process.exit(0);
  }
}

createAdminUser();