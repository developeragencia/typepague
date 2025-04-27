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
  accentColor?: string;
  iconColor?: string;
  iconBgColor?: string;
}

// Componente para exibir cards com efeitos modernos e animações
function GradientCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  change, 
  changeType = "positive",
  accentColor = "border-blue-500",
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100"
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
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className={`border-0 shadow-md relative h-full bg-white overflow-hidden border-l-4 ${accentColor}`}>
        {/* Decoração de fundo estilo grid para adicionar textura */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mini-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                <path d="M 15 0 L 0 0 0 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mini-grid)" />
          </svg>
        </div>
        
        {/* Elementos decorativos animados */}
        <motion.div 
          className="absolute top-0 right-0 w-28 h-28 rounded-full bg-gray-100"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 5, 0],
            y: [0, -5, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 10,
            ease: "easeInOut" 
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-gray-100"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 12,
            ease: "easeInOut" 
          }}
        ></motion.div>
        
        <CardHeader className="pb-2 border-b z-10 relative">
          <div className="flex justify-between items-start">
            <motion.div 
              className={`flex items-center justify-center p-2 rounded-lg ${iconBgColor} ${iconColor}`}
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
            <motion.div 
              className={cn(
                "text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full",
                changeType === "positive" ? "bg-green-100 text-green-600 border border-green-200" : 
                changeType === "negative" ? "bg-red-100 text-red-600 border border-red-200" : 
                "bg-yellow-100 text-amber-600 border border-yellow-200"
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
        
        <CardContent className="z-10 relative pt-3">
          <div className="relative">
            <motion.div 
              className={`text-3xl font-bold text-gray-800 ${iconColor}`}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {value}
            </motion.div>
            <motion.div 
              className={`absolute -bottom-1 left-0 h-[2px] ${iconBgColor}`} 
              initial={{ width: 0 }}
              animate={{ width: "40%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          
          <div className="flex flex-col mt-1">
            <motion.p 
              className="text-base font-medium text-gray-700"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {title}
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500 mt-1"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          </div>
        </CardContent>
        
        {/* Decoração com pontilhado no canto */}
        <div className="absolute top-3 right-3">
          <svg width="20" height="20" viewBox="0 0 20 20" className={`${iconColor} opacity-20`}>
            <circle cx="2" cy="2" r="2" />
            <circle cx="2" cy="10" r="2" />
            <circle cx="2" cy="18" r="2" />
            <circle cx="10" cy="2" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="10" cy="18" r="2" />
            <circle cx="18" cy="2" r="2" />
            <circle cx="18" cy="10" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
        </div>
        
        {/* Efeito de brilho no hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"
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
            accentColor="border-blue-500"
            iconColor="text-blue-600"
            iconBgColor="bg-blue-100"
          />
          
          <GradientCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Planos"
            value={isLoadingPlans ? <Loader2 className="h-6 w-6 animate-spin" /> : (plans?.length || 0)}
            subtitle="Planos disponíveis"
            change="Atualizado"
            changeType="neutral"
            accentColor="border-purple-500"
            iconColor="text-purple-600"
            iconBgColor="bg-purple-100"
          />
          
          <GradientCard
            icon={<Wallet className="h-5 w-5" />}
            title="Assinaturas"
            value={isLoadingSubscriptions ? <Loader2 className="h-6 w-6 animate-spin" /> : (subscriptions?.length || 0)}
            subtitle="Assinaturas ativas"
            change="Monitorando"
            changeType="neutral"
            accentColor="border-emerald-500"
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-100"
          />
          
          <GradientCard
            icon={<CircleDollarSign className="h-5 w-5" />}
            title="Receita"
            value="R$ 0,00"
            subtitle="Receita mensal"
            change="Sem dados"
            changeType="negative"
            accentColor="border-amber-500"
            iconColor="text-amber-600"
            iconBgColor="bg-amber-100"
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
                iconColor: "text-blue-600",
                accentColor: "border-blue-500",
                hoverColor: "group-hover:bg-blue-50",
                iconBgColor: "bg-blue-100",
                path: "/admin/dashboard-padrao"
              },
              { 
                icon: <CreditCard className="w-6 h-6" />, 
                title: "Produtos", 
                desc: "Gerenciar produtos", 
                iconColor: "text-purple-600",
                accentColor: "border-purple-500",
                hoverColor: "group-hover:bg-purple-50",
                iconBgColor: "bg-purple-100",
                path: "/admin/produtos"
              },
              { 
                icon: <ShoppingCart className="w-6 h-6" />, 
                title: "Checkout", 
                desc: "Links de pagamento", 
                iconColor: "text-emerald-600",
                accentColor: "border-emerald-500",
                hoverColor: "group-hover:bg-emerald-50",
                iconBgColor: "bg-emerald-100",
                path: "/admin/checkout-link"
              },
              { 
                icon: <PieChart className="w-6 h-6" />, 
                title: "Builder", 
                desc: "Personalizar checkout", 
                iconColor: "text-amber-600",
                accentColor: "border-amber-500",
                hoverColor: "group-hover:bg-amber-50",
                iconBgColor: "bg-amber-100",
                path: "/admin/checkout-builder"
              },
              { 
                icon: <LayoutGrid className="w-6 h-6" />, 
                title: "Layout", 
                desc: "Temas e aparência", 
                iconColor: "text-indigo-600",
                accentColor: "border-indigo-500",
                hoverColor: "group-hover:bg-indigo-50",
                iconBgColor: "bg-indigo-100",
                path: "/admin/lista-layout"
              },
              { 
                icon: <ListIcon className="w-6 h-6" />, 
                title: "Transações", 
                desc: "Histórico financeiro", 
                iconColor: "text-rose-600",
                accentColor: "border-rose-500",
                hoverColor: "group-hover:bg-rose-50",
                iconBgColor: "bg-rose-100",
                path: "/admin/transacoes"
              },
              { 
                icon: <Users className="w-6 h-6" />, 
                title: "Clientes", 
                desc: "Base de clientes", 
                iconColor: "text-cyan-600",
                accentColor: "border-cyan-500",
                hoverColor: "group-hover:bg-cyan-50",
                iconBgColor: "bg-cyan-100",
                path: "/admin/clientes"
              },
              { 
                icon: <Settings className="w-6 h-6" />, 
                title: "Ajustes", 
                desc: "Configurações", 
                iconColor: "text-slate-600",
                accentColor: "border-slate-500",
                hoverColor: "group-hover:bg-slate-50",
                iconBgColor: "bg-slate-100",
                path: "/admin/perfil"
              },
            ].map((item, index) => (
              <Link key={index} href={item.path}>
                <motion.div 
                  className={`relative h-[140px] rounded-xl overflow-hidden shadow-md bg-white border-l-4 ${item.accentColor} transition-all duration-500 group cursor-pointer`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ 
                    y: -6, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Fundo branco com efeito hover sutil */}
                  <div className={`absolute inset-0 transition-colors duration-300 ${item.hoverColor}`}></div>
                  
                  {/* Decoração de fundo */}
                  <div className="absolute inset-0 opacity-5">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`grid-pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#grid-pattern-${index})`} />
                    </svg>
                  </div>
                  
                  {/* Elementos decorativos */}
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gray-100 opacity-40"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      x: [0, 5, 0],
                      opacity: [0.4, 0.5, 0.4]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 8,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gray-100 opacity-30"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      y: [0, -5, 0],
                      opacity: [0.3, 0.4, 0.3]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 10,
                      ease: "easeInOut"
                    }}
                  ></motion.div>
                  
                  {/* Conteúdo */}
                  <div className="absolute inset-0 flex flex-col p-5 z-10">
                    <div className="flex-1 flex items-start justify-start">
                      <motion.div 
                        className={`flex items-center justify-center w-14 h-14 rounded-lg ${item.iconBgColor} ${item.iconColor}`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    
                    <div className="mt-auto">
                      <motion.div 
                        className="font-bold text-lg text-gray-800 mb-1 tracking-wide"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      >
                        {item.title}
                      </motion.div>
                      <motion.div 
                        className="text-sm text-gray-600"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        {item.desc}
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Efeito de hover - indicador de ação */}
                  <div className="absolute top-4 right-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className={`p-1.5 rounded-full ${item.iconBgColor}`}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                    >
                      <ChevronRight className={`h-4 w-4 ${item.iconColor}`} />
                    </motion.div>
                  </div>
                  
                  {/* Linha decorativa */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 h-0.5 ${item.iconBgColor}`}
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Efeito pontilhado no hover */}
                  <motion.div 
                    className="absolute top-0 right-0 w-0 h-0 border-t-[15px] border-r-[15px] border-t-transparent border-r-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.8, 1, 0.8]
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 3,
                      ease: "easeInOut"
                    }}
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