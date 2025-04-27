import { useQuery } from "@tanstack/react-query";
import { User, Plan, Subscription } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { Loader2, Users, CreditCard, LifeBuoy, ChevronRight, TrendingUp, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layout/admin-layout";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    queryFn: getQueryFn({ on401: "throw" }),
  });
  
  const { data: plans, isLoading: isLoadingPlans } = useQuery<Plan[]>({
    queryKey: ["/api/admin/plans"],
    queryFn: getQueryFn({ on401: "throw" }),
  });
  
  const { data: subscriptions, isLoading: isLoadingSubscriptions } = useQuery<Subscription[]>({
    queryKey: ["/api/admin/subscriptions"],
    queryFn: getQueryFn({ on401: "throw" }),
  });
  
  const isLoading = isLoadingUsers || isLoadingPlans || isLoadingSubscriptions;

  // Animação para os cards de estatísticas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Admin</h1>
            <p className="text-gray-500 dark:text-gray-400">Bem-vindo ao painel administrativo do PayHub</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-1" />
              Notificações
            </Button>
            <Button variant="default" size="sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              Relatórios
            </Button>
          </div>
        </div>

        {/* Cards de estatísticas com animação */}
        <motion.div 
          className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-blue-700 dark:text-blue-400">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoadingUsers ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    users?.length || 0
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Total de usuários cadastrados
                  </p>
                  <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +12% este mês
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-purple-700 dark:text-purple-400">
                  <CreditCard className="h-4 w-4 mr-2 text-purple-500" />
                  Planos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoadingPlans ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    plans?.length || 0
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Planos disponíveis
                  </p>
                  <div className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    Atualizado
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-green-700 dark:text-green-400">
                  <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                  Assinaturas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoadingSubscriptions ? (
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  ) : (
                    subscriptions?.length || 0
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Assinaturas ativas
                  </p>
                  <div className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    Monitorando
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="users" className="mt-6">
            <TabsList className="mb-8 bg-blue-50 dark:bg-blue-900/20 p-1">
              <TabsTrigger value="users" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="plans" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                <CreditCard className="h-4 w-4 mr-2" />
                Planos
              </TabsTrigger>
              <TabsTrigger value="support" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                <LifeBuoy className="h-4 w-4 mr-2" />
                Suporte
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gerenciamento de Usuários</CardTitle>
                      <CardDescription>
                        Visualize e gerencie todos os usuários da plataforma.
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Adicionar usuário
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingUsers ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                            <th className="text-left py-3 px-4 font-medium">ID</th>
                            <th className="text-left py-3 px-4 font-medium">Usuário</th>
                            <th className="text-left py-3 px-4 font-medium">Nome</th>
                            <th className="text-left py-3 px-4 font-medium">Email</th>
                            <th className="text-left py-3 px-4 font-medium">Empresa</th>
                            <th className="text-left py-3 px-4 font-medium">Admin</th>
                            <th className="text-right py-3 px-4 font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users?.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="py-3 px-4">{user.id}</td>
                              <td className="py-3 px-4 font-medium">{user.username}</td>
                              <td className="py-3 px-4">{user.fullName || "-"}</td>
                              <td className="py-3 px-4">{user.email || "-"}</td>
                              <td className="py-3 px-4">{user.company || "-"}</td>
                              <td className="py-3 px-4">
                                {user.isAdmin ? (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                    Sim
                                  </span>
                                ) : (
                                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                                    Não
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button variant="ghost" size="sm">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="plans">
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gerenciamento de Planos</CardTitle>
                      <CardDescription>
                        Visualize e gerencie os planos de assinatura.
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Novo plano
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingPlans ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                            <th className="text-left py-3 px-4 font-medium">ID</th>
                            <th className="text-left py-3 px-4 font-medium">Nome</th>
                            <th className="text-left py-3 px-4 font-medium">Preço</th>
                            <th className="text-left py-3 px-4 font-medium">Ciclo</th>
                            <th className="text-left py-3 px-4 font-medium">Destaque</th>
                            <th className="text-left py-3 px-4 font-medium">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plans?.map((plan) => (
                            <tr key={plan.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="py-3 px-4">{plan.id}</td>
                              <td className="py-3 px-4 font-medium">{plan.name}</td>
                              <td className="py-3 px-4">R$ {plan.price}</td>
                              <td className="py-3 px-4">{plan.billingCycle}</td>
                              <td className="py-3 px-4">
                                {plan.isPopular ? (
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                    Sim
                                  </span>
                                ) : (
                                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                                    Não
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">Editar</Button>
                                  <Button variant="destructive" size="sm">Excluir</Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="support">
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Tickets de Suporte</CardTitle>
                      <CardDescription>
                        Gerencie os tickets de suporte dos clientes.
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <LifeBuoy className="h-4 w-4 mr-2" />
                      Novo ticket
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="py-8 text-center text-muted-foreground">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <LifeBuoy className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-lg font-medium">Funcionalidade em desenvolvimento</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        O sistema de tickets de suporte estará disponível em breve.
                      </p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </AdminLayout>
  );
}