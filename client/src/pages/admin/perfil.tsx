import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layout/admin-layout";
import { 
  User, 
  Key, 
  Bell, 
  Shield,
  Mail,
  Building,
  Check,
  Loader2,
  Settings,
  LogOut,
} from "lucide-react";

export default function Perfil() {
  const { user, logoutMutation } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Meu Perfil</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gerencie suas informações e preferências
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader className="pb-2 text-center">
                <div className="flex justify-center mb-2">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-2xl text-white">
                      {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user?.fullName || user?.username}</CardTitle>
                <CardDescription>{user?.email || "admin@payhub.com.br"}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <div className="flex items-center py-2">
                    <Building className="h-4 w-4 mr-2" />
                    <span>{user?.company || "PayHub Sistemas"}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>{user?.isAdmin ? "Administrador" : "Usuário"}</span>
                  </div>
                  <div className="flex items-center py-2">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Email verificado</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações da Conta
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" 
                  size="sm"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Sair da Conta
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="infoPessoal">
              <TabsList className="mb-6">
                <TabsTrigger value="infoPessoal">
                  <User className="h-4 w-4 mr-2" />
                  Informações Pessoais
                </TabsTrigger>
                <TabsTrigger value="seguranca">
                  <Key className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="notificacoes">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
              </TabsList>

              <TabsContent value="infoPessoal">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>
                      Atualize seus dados pessoais e informações de contato
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nome completo</Label>
                        <Input 
                          id="fullName" 
                          defaultValue={user?.fullName || ""} 
                          placeholder="Seu nome completo" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="username">Nome de usuário</Label>
                        <Input 
                          id="username" 
                          defaultValue={user?.username} 
                          placeholder="Seu nome de usuário" 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={user?.email || ""} 
                          placeholder="seu.email@exemplo.com" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input 
                          id="phone" 
                          defaultValue="" 
                          placeholder="(00) 00000-0000" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input 
                        id="company" 
                        defaultValue={user?.company || ""} 
                        placeholder="Nome da sua empresa" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <textarea 
                        id="bio" 
                        className="w-full min-h-[100px] p-2 border rounded-md bg-background"
                        placeholder="Conte um pouco sobre você..."
                      ></textarea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="seguranca">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>
                      Gerencie sua senha e configurações de segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha atual</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        placeholder="Digite sua senha atual" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nova senha</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          placeholder="Digite uma nova senha" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar senha</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          placeholder="Confirme sua nova senha" 
                        />
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Verificação em duas etapas</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium">Autenticação em dois fatores</div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Adicione uma camada extra de segurança à sua conta
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Sessões Ativas</h3>
                      
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Chrome em Windows</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                São Paulo, Brasil · Ativo agora
                              </div>
                            </div>
                            <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Atual
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Safari em iPhone</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                São Paulo, Brasil · Há 2 dias
                              </div>
                            </div>
                            <Button variant="outline" size="sm">Encerrar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      Encerrar todas as sessões
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notificacoes">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>
                      Configure como e quando deseja receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Email</h3>
                      
                      {[
                        { id: "email-marketing", label: "Atualizações de marketing", desc: "Receba emails sobre novos recursos e promoções" },
                        { id: "email-account", label: "Atualizações da conta", desc: "Receba emails sobre atividades da sua conta e segurança" },
                        { id: "email-transaction", label: "Transações", desc: "Receba emails sobre suas transações e pagamentos" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label htmlFor={item.id}>{item.label}</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          <Switch id={item.id} defaultChecked={item.id !== "email-marketing"} />
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-6 space-y-4">
                      <h3 className="font-medium">Push Notifications</h3>
                      
                      {[
                        { id: "push-transactions", label: "Transações", desc: "Receba notificações quando uma transação for concluída" },
                        { id: "push-security", label: "Segurança", desc: "Receba notificações sobre eventos de segurança" },
                        { id: "push-updates", label: "Atualizações do sistema", desc: "Receba notificações sobre novas funcionalidades" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2">
                          <div className="space-y-0.5">
                            <Label htmlFor={item.id}>{item.label}</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          <Switch id={item.id} defaultChecked={item.id === "push-transactions"} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Salvar Preferências
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}