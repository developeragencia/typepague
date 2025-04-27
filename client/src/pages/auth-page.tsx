import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, UserCheck, Lock, Building } from "lucide-react";
import { loginAnimation, switchModeAnimation, setupAnimations } from "@/lib/animations";

// Schemas de validação
const loginSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
  isAdmin: z.boolean().default(false)
});

const registerSchema = z.object({
  username: z.string().min(3, "Usuário deve ter no mínimo 3 caracteres"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  fullName: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  company: z.string().optional()
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const { user, loginMutation, registerMutation } = useAuth();
  const loginFormRef = useRef<HTMLDivElement>(null);

  // Inicializa animações
  useEffect(() => {
    setupAnimations();
    const animation = loginAnimation();
    
    return () => {
      animation.kill();
    };
  }, []);

  // Efeito para animar troca entre admin/cliente
  useEffect(() => {
    if (loginFormRef.current) {
      const animation = switchModeAnimation();
      return () => animation.kill();
    }
  }, [isAdminMode]);

  // Configuração dos formulários
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      isAdmin: false
    },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      email: "",
      company: ""
    },
  });

  // Manipuladores de eventos
  const onLoginSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data);
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  // Redirecionar se já estiver logado
  if (user) {
    if (user.isAdmin) {
      return <Redirect to="/admin" />;
    }
    return <Redirect to="/" />;
  }

  // Componentes de background
  const BackgroundShapes = () => (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <motion.div 
        className="bg-shape absolute top-20 right-20 h-40 w-40 rounded-full bg-blue-400 opacity-20 blur-3xl"
        animate={{ y: [-15, 15], rotate: 5 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 5, ease: "easeInOut" }}
      />
      <motion.div 
        className="bg-shape absolute bottom-20 left-40 h-60 w-60 rounded-full bg-cyan-400 opacity-20 blur-3xl"
        animate={{ y: [10, -10], rotate: -5 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 7, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div 
        className="bg-shape absolute top-40 left-1/4 h-32 w-32 rounded-full bg-purple-400 opacity-20 blur-3xl"
        animate={{ y: [-20, 20], x: [10, -10] }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 9, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative">
      <BackgroundShapes />
      
      <div className="flex flex-col justify-center items-center w-full px-4 py-12">
        <motion.div 
          className="login-card w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Cabeçalho com logotipo */}
          <div className="pt-8 px-8 text-center">
            <motion.h1 
              className="login-title text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {isAdminMode ? "Painel Administrativo" : "Portal do Cliente"}
            </motion.h1>
            <motion.p 
              className="text-gray-500 dark:text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {isAdminMode 
                ? "Acesse o painel de gerenciamento" 
                : "Gerencie seus pagamentos"}
            </motion.p>
          </div>

          {/* Toggle para modo admin/cliente */}
          <div className="flex justify-center mt-4 mb-2">
            <motion.div 
              className="relative inline-flex items-center px-1 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <button 
                onClick={() => setIsAdminMode(false)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  !isAdminMode ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Cliente
              </button>
              <button 
                onClick={() => setIsAdminMode(true)}
                className={`relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                  isAdminMode ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Administrador
              </button>
            </motion.div>
          </div>

          {/* Formulários com tabs */}
          <div className="p-8" ref={loginFormRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={isAdminMode ? "admin" : "client"}
                initial={{ opacity: 0, x: isAdminMode ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isAdminMode ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                className="login-form"
              >
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Cadastro</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usuário</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input className="pl-10" placeholder="Seu usuário" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input className="pl-10" type="password" placeholder="Sua senha" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        <motion.div 
                          className="login-button"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all duration-300"
                            size="lg"
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> 
                                Autenticando...
                              </>
                            ) : (
                              isAdminMode ? "Acessar Painel" : "Entrar"
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </TabsContent>

                  <TabsContent value="register">
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Usuário</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input className="pl-10" placeholder="Escolha um usuário" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input className="pl-10" type="password" placeholder="Crie uma senha" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                        >
                          <FormField
                            control={registerForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome Completo</FormLabel>
                                <FormControl>
                                  <Input placeholder="Seu nome completo" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="seu@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                        
                        <motion.div 
                          className="form-field"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <FormField
                            control={registerForm.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Empresa</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input className="pl-10" placeholder="Sua empresa" {...field} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        <motion.div 
                          className="login-button mt-6"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7, duration: 0.5 }}
                        >
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white transition-all duration-300"
                            size="lg"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> 
                                Processando...
                              </>
                            ) : (
                              "Criar Conta"
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </AnimatePresence>
            
            {/* Dicas de acesso */}
            <motion.div 
              className="text-xs text-center text-gray-500 dark:text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {isAdminMode ? (
                <p>
                  Para acesso administrativo, use: <br />
                  <span className="font-semibold">Usuário: admin</span> | <span className="font-semibold">Senha: admin123</span>
                </p>
              ) : (
                <p>
                  Crie uma conta ou acesse com seu usuário.<br />
                  Esqueceu sua senha? <a href="#" className="text-blue-600 hover:underline">Recuperar acesso</a>
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Rodapé */}
        <motion.div 
          className="text-center text-gray-500 dark:text-gray-400 text-xs mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p>PayHub © {new Date().getFullYear()} | Todos os direitos reservados</p>
          <p className="mt-1">Versão 2.0 | Tecnologia de processamento de pagamentos</p>
        </motion.div>
      </div>
    </div>
  );
}