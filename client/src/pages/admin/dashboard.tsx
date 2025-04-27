import { useQuery } from "@tanstack/react-query";
import { User, Plan, Subscription } from "@shared/schema";
import { getQueryFn } from "@/lib/queryClient";
import { 
  Loader2, Users, CreditCard, LifeBuoy, ChevronRight, TrendingUp, Bell,
  CircleDollarSign, Wallet, LineChart, ArrowUpRight, Clock, Activity,
  Search, ArrowDownUp, CheckCircle2, Banknote, UserPlus, BarChart3,
  ShoppingCart, Settings, PieChart, LayoutGrid, List as ListIcon,
  Sparkles, Eye, Pencil, Trash2, Filter, MoreHorizontal
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/layout/admin-layout";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface GradientCardProps {
  icon: React.ReactNode;
  title: string; 
  value: React.ReactNode;
  subtitle: string;
  change: string;
  changeType?: "positive" | "negative" | "neutral";
  colorFrom?: string;
  colorTo?: string;
  pattern?: "dots" | "lines" | "grid" | "none";
}

// Componente para exibir cards com efeito de gradiente e animações
function GradientCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  change, 
  changeType = "positive",
  colorFrom = "from-blue-600",
  colorTo = "to-indigo-700",
  pattern = "dots"
}: GradientCardProps) {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden group"
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className={`border-0 shadow-lg relative h-full bg-gradient-to-br ${colorFrom} ${colorTo} overflow-hidden`}>
        {/* Padrão decorativo */}
        {pattern !== "none" && (
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundSize: pattern === "dots" ? "20px 20px" : pattern === "lines" ? "10px 10px" : "30px 30px",
              backgroundImage: pattern === "dots" 
                ? `radial-gradient(white 2px, transparent 0)`
                : pattern === "lines"
                  ? `repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 10px)`
                  : `linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)`
            }}
          ></div>
        )}
        
        {/* Elementos decorativos animados */}
        <motion.div 
          className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 10,
            ease: "easeInOut" 
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 5, 0],
            y: [0, 5, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 12,
            ease: "easeInOut" 
          }}
        ></motion.div>
        
        <CardHeader className="pb-2 border-b border-white/10 z-10 relative">
          <div className="flex justify-between items-start">
            <motion.div 
              className="flex items-center justify-center text-white p-2 rounded-lg bg-white/20"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
            <motion.div 
              className={cn(
                "text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full",
                changeType === "positive" ? "bg-green-500/30 text-white border border-white/20" : 
                changeType === "negative" ? "bg-red-500/30 text-white border border-white/20" : 
                "bg-yellow-500/30 text-white border border-white/20"
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {changeType === "positive" ? <ArrowUpRight className="h-3 w-3" /> : 
               changeType === "negative" ? <ArrowDownUp className="h-3 w-3" /> : 
               <Clock className="h-3 w-3" />}
              {change}
            </motion.div>
          </div>
        </CardHeader>
        
        <CardContent className="z-10 relative">
          <div className="relative">
            <motion.div 
              className="text-3xl font-bold mt-2 text-white"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {value}
            </motion.div>
            <motion.div 
              className="absolute -bottom-1 left-0 h-[2px] bg-white opacity-25" 
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          
          <div className="flex flex-col mt-1">
            <motion.p 
              className="text-base font-medium text-white"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {title}
            </motion.p>
            <motion.p 
              className="text-xs text-white/80 mt-1"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          </div>
        </CardContent>
        
        {/* Efeito de brilho no hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1500 ease-in-out"
        />
      </Card>
    </motion.div>
  );
}

interface TableRowProps {
  children: React.ReactNode;
  isHighlighted?: boolean;
  onClick?: () => void;
}

// Componente de linha de tabela com efeito hover
function TableRow({ children, isHighlighted = false, onClick }: TableRowProps) {
  return (
    <tr 
      className={cn(
        "border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer relative group",
        isHighlighted && "bg-blue-50/50 dark:bg-blue-900/10"
      )}
      onClick={onClick}
    >
      <td className="w-0.5 p-0">
        <div 
          className="w-0.5 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </td>
      {children}
    </tr>
  );
}

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const { theme } = useTheme();
  
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

  // Dados para gráfico simplificado
  const chartData = [35, 48, 42, 55, 72, 68, 80];
  
  // Animar as barras do gráfico quando a página carrega
  useEffect(() => {
    const bars = document.querySelectorAll('.chart-bar');
    
    gsap.fromTo(
      bars, 
      { scaleY: 0, transformOrigin: 'bottom' },
      { 
        scaleY: 1, 
        stagger: 0.1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
      }
    );
  }, []);

  // Função para filtrar usuários com base no termo de pesquisa
  const filteredUsers = users?.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="relative">
        {/* Sem fundo decorativo para uma aparência mais limpa */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Dashboard Admin</h1>
            <p className="text-gray-500 dark:text-gray-400">Bem-vindo ao painel administrativo do PayHub</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <Bell className="h-4 w-4 mr-1" />
              Notificações
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Relatórios
            </Button>
          </div>
        </div>

        {/* Cards de estatísticas com animação */}
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <GradientCard
            icon={<Users className="h-5 w-5" />}
            title="Usuários"
            value={isLoadingUsers ? <Loader2 className="h-6 w-6 animate-spin" /> : (users?.length || 0)}
            subtitle="Total de usuários cadastrados"
            change="+12% este mês"
            changeType="positive"
            colorFrom="from-blue-600"
            colorTo="to-indigo-700"
            pattern="dots"
          />
          
          <GradientCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Planos"
            value={isLoadingPlans ? <Loader2 className="h-6 w-6 animate-spin" /> : (plans?.length || 0)}
            subtitle="Planos disponíveis"
            change="Atualizado"
            changeType="neutral"
            colorFrom="from-purple-600"
            colorTo="to-pink-700"
            pattern="grid"
          />
          
          <GradientCard
            icon={<Wallet className="h-5 w-5" />}
            title="Assinaturas"
            value={isLoadingSubscriptions ? <Loader2 className="h-6 w-6 animate-spin" /> : (subscriptions?.length || 0)}
            subtitle="Assinaturas ativas"
            change="Monitorando"
            changeType="neutral"
            colorFrom="from-emerald-600"
            colorTo="to-teal-700"
            pattern="lines"
          />
          
          <GradientCard
            icon={<CircleDollarSign className="h-5 w-5" />}
            title="Receita"
            value="R$ 0,00"
            subtitle="Receita mensal"
            change="Sem dados"
            changeType="negative"
            colorFrom="from-amber-600"
            colorTo="to-orange-700"
            pattern="dots"
          />
        </motion.div>
        
        {/* Menu Grid com cores alternadas e efeitos */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mr-2"
            >
              <Sparkles className="h-5 w-5 text-amber-500" />
            </motion.span>
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Acesso Rápido
            </motion.span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
            {[
              { 
                icon: <BarChart3 className="w-6 h-6" />, 
                title: "Estatísticas", 
                desc: "Relatórios e métricas", 
                bgColor: "bg-gradient-to-tr from-blue-600 to-indigo-700", 
                accentColor: "bg-blue-400",
                borderColor: "border-blue-500/50",
                path: "/admin/dashboard-padrao",
                pattern: "pattern-dots"
              },
              { 
                icon: <CreditCard className="w-6 h-6" />, 
                title: "Produtos", 
                desc: "Gerenciar produtos", 
                bgColor: "bg-gradient-to-tr from-purple-600 to-pink-700",
                accentColor: "bg-purple-400",
                borderColor: "border-purple-500/50",
                path: "/admin/produtos",
                pattern: "pattern-zigzag"
              },
              { 
                icon: <ShoppingCart className="w-6 h-6" />, 
                title: "Checkout", 
                desc: "Links de pagamento", 
                bgColor: "bg-gradient-to-tr from-emerald-600 to-teal-700",
                accentColor: "bg-emerald-400",
                borderColor: "border-emerald-500/50",
                path: "/admin/checkout-link",
                pattern: "pattern-dots"
              },
              { 
                icon: <PieChart className="w-6 h-6" />, 
                title: "Builder", 
                desc: "Personalizar checkout", 
                bgColor: "bg-gradient-to-tr from-amber-600 to-orange-700",
                accentColor: "bg-amber-400",
                borderColor: "border-amber-500/50",
                path: "/admin/checkout-builder",
                pattern: "pattern-zigzag"
              },
              { 
                icon: <LayoutGrid className="w-6 h-6" />, 
                title: "Layout", 
                desc: "Temas e aparência", 
                bgColor: "bg-gradient-to-tr from-blue-500 to-indigo-600",
                accentColor: "bg-blue-300",
                borderColor: "border-blue-400/50",
                path: "/admin/lista-layout",
                pattern: "pattern-dots"
              },
              { 
                icon: <ListIcon className="w-6 h-6" />, 
                title: "Transações", 
                desc: "Histórico financeiro", 
                bgColor: "bg-gradient-to-tr from-rose-600 to-red-700",
                accentColor: "bg-rose-400",
                borderColor: "border-rose-500/50",
                path: "/admin/transacoes",
                pattern: "pattern-zigzag"
              },
              { 
                icon: <Users className="w-6 h-6" />, 
                title: "Clientes", 
                desc: "Base de clientes", 
                bgColor: "bg-gradient-to-tr from-cyan-600 to-blue-700",
                accentColor: "bg-cyan-400",
                borderColor: "border-cyan-500/50",
                path: "/admin/clientes",
                pattern: "pattern-dots"
              },
              { 
                icon: <Settings className="w-6 h-6" />, 
                title: "Ajustes", 
                desc: "Configurações", 
                bgColor: "bg-gradient-to-tr from-slate-600 to-gray-700",
                accentColor: "bg-slate-400",
                borderColor: "border-slate-500/50",
                path: "/admin/perfil",
                pattern: "pattern-zigzag" 
              },
            ].map((item, index) => (
              <Link key={index} href={item.path}>
                <motion.div 
                  className={`relative h-[140px] rounded-xl overflow-hidden shadow-xl border ${item.borderColor} transition-all duration-500 group cursor-pointer`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ 
                    y: -6, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Background com gradiente e padrão decorativo */}
                  <div className={`absolute inset-0 ${item.bgColor}`}></div>
                  
                  {/* Padrão decorativo */}
                  <div className={`absolute inset-0 opacity-5 ${item.pattern === "pattern-dots" ? "pattern-dots" : "pattern-zigzag"}`}
                    style={{
                      backgroundSize: item.pattern === "pattern-dots" ? "20px 20px" : "30px 30px",
                      backgroundImage: item.pattern === "pattern-dots" 
                        ? `radial-gradient(white 2px, transparent 0)`
                        : `linear-gradient(-45deg, white 0, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent 100%)`
                    }}
                  ></div>
                  
                  {/* Elementos decorativos animados */}
                  <motion.div 
                    className={`absolute top-0 right-0 w-24 h-24 rounded-full ${item.accentColor} opacity-20`}
                    initial={{ scale: 0.8, x: 10 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 3 + index / 2,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  <motion.div 
                    className={`absolute bottom-0 left-0 w-16 h-16 rounded-full ${item.accentColor} opacity-20`}
                    initial={{ scale: 1, y: 0 }}
                    animate={{ scale: 1.2, y: -5 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 2.5 + index / 2,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  {/* Overlay de sombreamento para melhor contraste do texto */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Conteúdo */}
                  <div className="absolute inset-0 flex flex-col p-5">
                    <div className="flex-1 flex items-start justify-start">
                      <motion.div 
                        className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/20 text-white"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="mt-auto"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.1 + 0.2, 
                        duration: 0.5
                      }}
                    >
                      <div className="font-bold text-lg text-white mb-1 tracking-wide">{item.title}</div>
                      <div className="text-sm text-white/90">{item.desc}</div>
                    </motion.div>
                  </div>
                  
                  {/* Efeito de hover - indicador de ação */}
                  <div className="absolute top-3 right-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className="bg-white/20 rounded-full p-1"
                      whileHover={{ scale: 1.2 }}
                    >
                      <ChevronRight className="h-4 w-4 text-white" />
                    </motion.div>
                  </div>
                  
                  {/* Shimmer effect no hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
        
        {/* Gráfico sumário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="lg:col-span-2">
            <Card className="border overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800/80 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Visão Geral do Sistema</CardTitle>
                    <CardDescription>Métricas e tendências</CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Diário
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 bg-white/50 dark:bg-gray-800/50 font-medium">
                      Semanal
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Mensal
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 flex items-end">
                  <div className="flex-1 flex items-end h-full gap-4 px-2">
                    {chartData.map((value, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="h-full w-full flex items-end justify-center">
                          <div 
                            className={`chart-bar w-full max-w-[40px] rounded-t-md bg-gradient-to-t ${
                              index % 2 === 0 
                                ? 'from-blue-500 to-indigo-600' 
                                : 'from-purple-500 to-indigo-600'
                            }`}
                            style={{ height: `${value}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-full flex flex-col justify-between py-2 pl-2">
                    <div className="text-xs text-gray-500">100%</div>
                    <div className="text-xs text-gray-500">75%</div>
                    <div className="text-xs text-gray-500">50%</div>
                    <div className="text-xs text-gray-500">25%</div>
                    <div className="text-xs text-gray-500">0%</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-900/50 border-t px-6 py-3">
                <div className="flex justify-between w-full items-center">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      <span className="text-sm">Usuários</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
                      <span className="text-sm">Assinaturas</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <LineChart className="h-4 w-4" />
                    Relatório completo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            <Card className="border h-full">
              <CardHeader className="pb-2 space-y-0 gap-1 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800/80 border-b">
                <CardTitle className="text-base">Atividades Recentes</CardTitle>
                <CardDescription>Últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent className="px-2 py-4">
                <div className="space-y-0">
                  {[
                    { icon: <UserPlus className="h-4 w-4 text-green-500" />, text: "Novo usuário cadastrado", time: "5 minutos atrás" },
                    { icon: <CreditCard className="h-4 w-4 text-blue-500" />, text: "Plano Básico atualizado", time: "30 minutos atrás" },
                    { icon: <CheckCircle2 className="h-4 w-4 text-purple-500" />, text: "Assinatura confirmada", time: "2 horas atrás" },
                    { icon: <Banknote className="h-4 w-4 text-green-500" />, text: "Pagamento processado", time: "3 horas atrás" },
                    { icon: <Activity className="h-4 w-4 text-amber-500" />, text: "Sistema atualizado", time: "5 horas atrás" },
                  ].map((item, index) => (
                    <div key={index} className="relative pl-6 pr-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md transition-colors">
                      <div className="flex gap-2 items-center">
                        <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center">
                          <div className="h-full w-px bg-gray-200 dark:bg-gray-700 absolute"></div>
                          <div className="z-10 rounded-full bg-white dark:bg-gray-900 p-1 border border-gray-200 dark:border-gray-700">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.text}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 dark:bg-gray-900/50 border-t p-3">
                <Button variant="ghost" size="sm" className="w-full text-blue-600 dark:text-blue-400">
                  Ver todas atividades
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="users" className="mt-6">
            <TabsList className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-1 rounded-lg">
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-gray-800/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm transition-all duration-200"
              >
                <Users className="h-4 w-4 mr-2" />
                Usuários
              </TabsTrigger>
              <TabsTrigger 
                value="plans" 
                className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-gray-800/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm transition-all duration-200"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Planos
              </TabsTrigger>
              <TabsTrigger 
                value="support" 
                className="data-[state=active]:bg-white/80 dark:data-[state=active]:bg-gray-800/80 data-[state=active]:backdrop-blur-sm data-[state=active]:shadow-sm transition-all duration-200"
              >
                <LifeBuoy className="h-4 w-4 mr-2" />
                Suporte
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="overflow-hidden border shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Gerenciamento de Usuários</CardTitle>
                      <CardDescription>
                        Visualize e gerencie todos os usuários da plataforma
                      </CardDescription>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input 
                          placeholder="Buscar usuários..." 
                          className="pl-8 h-9 sm:w-[180px] md:w-[240px] bg-white dark:bg-gray-900" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-0 top-0 h-full rounded-l-none"
                            onClick={() => setSearchTerm("")}
                          >
                            <Filter className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar usuário
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingUsers ? (
                    <div className="flex justify-center py-8">
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Carregando usuários...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800/80 border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                              <div className="flex items-center">
                                ID
                                <ArrowDownUp className="ml-1 h-3.5 w-3.5 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                              <div className="flex items-center">
                                Usuário
                                <ArrowDownUp className="ml-1 h-3.5 w-3.5 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300" />
                              </div>
                            </th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Nome</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Email</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Empresa</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Perfil</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers?.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                <div className="flex flex-col items-center">
                                  <Users className="h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" />
                                  <p>Nenhum usuário encontrado</p>
                                  {searchTerm && (
                                    <Button 
                                      variant="link" 
                                      onClick={() => setSearchTerm("")}
                                      className="mt-1 text-blue-600 dark:text-blue-400"
                                    >
                                      Limpar pesquisa
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredUsers?.map((user) => (
                              <TableRow
                                key={user.id}
                                isHighlighted={activeRowId === user.id}
                                onClick={() => setActiveRowId(user.id === activeRowId ? null : user.id)}
                              >
                                <td className="py-3 px-4 text-sm">{user.id}</td>
                                <td className="py-3 px-4 font-medium text-sm">{user.username}</td>
                                <td className="py-3 px-4 text-sm">{user.fullName || "-"}</td>
                                <td className="py-3 px-4 text-sm">{user.email || "-"}</td>
                                <td className="py-3 px-4 text-sm">{user.company || "-"}</td>
                                <td className="py-3 px-4 text-sm">
                                  {user.isAdmin ? (
                                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0">
                                      Admin
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      Usuário
                                    </Badge>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  <div className="flex justify-end gap-1">
                                    <Button variant="ghost" size="sm" className="h-8 px-2 text-slate-600 dark:text-slate-300">
                                      Editar
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </td>
                              </TableRow>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
                {filteredUsers && filteredUsers.length > 0 && (
                  <CardFooter className="bg-gray-50 dark:bg-gray-900/50 border-t px-4 py-3 flex justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Mostrando {filteredUsers.length} de {users?.length || 0} usuários
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Anterior
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        Próximo
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="plans">
              <Card className="overflow-hidden border shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-b">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Gerenciamento de Planos</CardTitle>
                      <CardDescription>
                        Visualize e gerencie os planos de assinatura disponíveis
                      </CardDescription>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 text-white"
                      size="sm"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Novo plano
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {isLoadingPlans ? (
                    <div className="flex justify-center py-8">
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Carregando planos...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800/80 border-b">
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">ID</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Nome</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Preço</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Ciclo</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Destaque</th>
                            <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plans?.map((plan, index) => (
                            <TableRow
                              key={plan.id}
                              isHighlighted={index === 0}
                              onClick={() => {}}
                            >
                              <td className="py-3 px-4 text-sm">{plan.id}</td>
                              <td className="py-3 px-4 font-medium text-sm">
                                <div className="flex items-center gap-2">
                                  {plan.name}
                                  {plan.isPopular && (
                                    <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-500 text-[10px]">
                                      <span className="text-yellow-500 mr-1">★</span>
                                      POPULAR
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm font-medium">
                                R$ {plan.price.toFixed(2).replace('.', ',')}
                              </td>
                              <td className="py-3 px-4 text-sm">{plan.billingCycle}</td>
                              <td className="py-3 px-4 text-sm">
                                {plan.isPopular ? (
                                  <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500 border-green-200 dark:border-green-800">
                                    Sim
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700">
                                    Não
                                  </Badge>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm"  className="h-8 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                    Editar
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-8 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                                    Excluir
                                  </Button>
                                </div>
                              </td>
                            </TableRow>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="support">
              <Card className="overflow-hidden border shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Tickets de Suporte</CardTitle>
                      <CardDescription>
                        Gerencie os tickets de suporte dos clientes
                      </CardDescription>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 border-0 text-white"
                      size="sm"
                    >
                      <LifeBuoy className="h-4 w-4 mr-2" />
                      Novo ticket
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center mb-4">
                        <LifeBuoy className="h-10 w-10 text-teal-500" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Sistema de Suporte</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
                        O sistema de tickets de suporte estará disponível em breve. Estamos trabalhando para oferecer a melhor experiência aos nossos clientes.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline">
                          <Bell className="h-4 w-4 mr-2" />
                          Receber notificação
                        </Button>
                        <Button 
                          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 border-0 text-white"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Ver estatísticas
                        </Button>
                      </div>
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