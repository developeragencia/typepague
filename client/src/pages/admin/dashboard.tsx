import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { User, Plan, Subscription } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { Loader2, Users, CreditCard, LifeBuoy, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { user, logoutMutation } = useAuth();
  
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-semibold text-gray-900">Painel Administrativo</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Logado como: <span className="font-medium text-gray-900">{user?.fullName || user?.username}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </>
              )}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoadingUsers ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  users?.length || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de usuários cadastrados
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Planos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoadingPlans ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  plans?.length || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Planos disponíveis
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Assinaturas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoadingSubscriptions ? (
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  subscriptions?.length || 0
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Assinaturas ativas
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users">
          <TabsList className="mb-8">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="plans">
              <CreditCard className="h-4 w-4 mr-2" />
              Planos
            </TabsTrigger>
            <TabsTrigger value="support">
              <LifeBuoy className="h-4 w-4 mr-2" />
              Suporte
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os usuários da plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Usuário</th>
                          <th className="text-left py-3 px-4 font-medium">Nome</th>
                          <th className="text-left py-3 px-4 font-medium">Email</th>
                          <th className="text-left py-3 px-4 font-medium">Empresa</th>
                          <th className="text-left py-3 px-4 font-medium">Admin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{user.id}</td>
                            <td className="py-3 px-4">{user.username}</td>
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
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Planos</CardTitle>
                <CardDescription>
                  Visualize e gerencie os planos de assinatura.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingPlans ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
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
                          <tr key={plan.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{plan.id}</td>
                            <td className="py-3 px-4">{plan.name}</td>
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
            <Card>
              <CardHeader>
                <CardTitle>Tickets de Suporte</CardTitle>
                <CardDescription>
                  Gerencie os tickets de suporte dos clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="py-8 text-center text-muted-foreground">
                  Funcionalidade em desenvolvimento...
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}