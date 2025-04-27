import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  ShoppingCart,
  Link as LinkIcon,
  LayoutList,
  CreditCard,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  Briefcase,
  PanelRight,
  LineChart,
  CircleDollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/lib/theme-provider";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: { title: string; path: string }[];
  divider?: boolean;
  badge?: string;
  color?: string;
};

// Cores para os menus principais
const menuColors = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-indigo-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-green-600",
];

const menuItems: MenuItem[] = [
  {
    title: "Dashboards",
    icon: <LayoutDashboard className="h-5 w-5" />,
    color: "from-blue-600 to-indigo-700",
    children: [
      { title: "Dashboard Admin", path: "/admin" },
      { title: "Dashboard Padrão", path: "/admin/dashboard-padrao" },
    ],
  },
  {
    title: "Produtos",
    icon: <ShoppingCart className="h-5 w-5" />,
    color: "from-purple-600 to-pink-700",
    badge: "Novo",
    children: [
      { title: "Checkout Builder", path: "/admin/checkout-builder" },
      { title: "Checkout Link", path: "/admin/checkout-link" },
      { title: "Lista de Layout", path: "/admin/lista-layout" },
    ],
  },
  {
    title: "Transações",
    icon: <CreditCard className="h-5 w-5" />,
    color: "from-rose-600 to-red-700",
    path: "/admin/transacoes",
  },
  {
    title: "Meu Perfil",
    icon: <UserCircle className="h-5 w-5" />,
    color: "from-amber-600 to-orange-700",
    path: "/admin/perfil",
    divider: true,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const { user, logoutMutation } = useAuth();
  const isMobile = useIsMobile();
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  // Efeito para animar notificações
  useEffect(() => {
    const bell = document.querySelector('.notification-bell');
    if (bell) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 20 });
      tl.to(bell, { 
        rotate: -20, 
        duration: 0.1, 
        ease: "power1.inOut" 
      });
      tl.to(bell, { 
        rotate: 20, 
        duration: 0.2, 
        ease: "power1.inOut" 
      });
      tl.to(bell, { 
        rotate: -10, 
        duration: 0.1, 
        ease: "power1.inOut" 
      });
      tl.to(bell, { 
        rotate: 10, 
        duration: 0.1, 
        ease: "power1.inOut" 
      });
      tl.to(bell, { 
        rotate: 0, 
        duration: 0.1, 
        ease: "power1.inOut" 
      });

      return () => {
        tl.kill();
      };
    }
  }, [sidebarOpen]);

  useEffect(() => {
    // Em telas mobile, inicia com o menu fechado
    if (isMobile) {
      setSidebarOpen(false);
    }

    // Abrir automaticamente o menu atual
    menuItems.forEach(item => {
      if (item.children && item.children.some(child => isActive(child.path))) {
        setOpenMenus(prev => ({...prev, [item.title]: true}));
      }
    });
  }, [isMobile, location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMenu = (title: string) => {
    setOpenMenus((prevOpenMenus) => ({
      ...prevOpenMenus,
      [title]: !prevOpenMenus[title],
    }));
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const isMenuActive = (menuItem: MenuItem) => {
    if (menuItem.path && isActive(menuItem.path)) return true;
    if (menuItem.children) {
      return menuItem.children.some((child) => isActive(child.path));
    }
    return false;
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      const isItemActive = isMenuActive(item);
      const bgGradient = item.color || "from-gray-500 to-gray-600";
      const [iconColor, accentColor] = bgGradient.split(' ');
      
      // Extrair a cor base para usar em estilos
      const baseColorClass = iconColor.split('-')[1];
      const colorIntensity = isItemActive ? '600' : '500';
      const colorClass = `${baseColorClass}-${colorIntensity}`;
      
      return (
        <motion.div 
          key={index} 
          className={cn("mb-3", item.divider && "border-b border-gray-200 dark:border-gray-700 pb-4 mb-4")}
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          {item.children ? (
            <div>
              <motion.button
                onClick={() => toggleMenu(item.title)}
                className={cn(
                  "flex items-center w-full p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:bg-gray-800/50 relative overflow-hidden group",
                  isItemActive && cn(
                    "bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/60 dark:to-gray-900/40 font-medium border border-gray-100 dark:border-gray-700/50"
                  )
                )}
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Indicador lateral de item ativo */}
                {isItemActive && (
                  <motion.div 
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${bgGradient}`}
                    layoutId={`sidebar-active-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                {/* Elemento decorativo de fundo no hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${bgGradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Ícone com fundo */}
                <div className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-lg mr-3 transition-colors duration-300",
                  isItemActive 
                    ? `text-${colorClass} bg-${baseColorClass}-100 dark:bg-${baseColorClass}-900/20` 
                    : "text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/50 group-hover:bg-gray-200/80 dark:group-hover:bg-gray-700/50"
                )}>
                  {item.icon}
                </div>
                
                <span className={cn(
                  "flex-1 text-left transition-colors duration-300",
                  isItemActive && `text-${colorClass}`
                )}>
                  {item.title}
                </span>
                
                {item.badge && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "mr-2 px-2 py-0 text-xs text-white border-0",
                      `bg-gradient-to-r ${bgGradient}`
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-500",
                  openMenus[item.title] ? "rotate-180" : "rotate-0",
                  isItemActive ? `text-${colorClass}` : "text-gray-400 dark:text-gray-500"
                )} />
              </motion.button>
              
              <AnimatePresence initial={false}>
                {openMenus[item.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.33, 1, 0.68, 1],
                      opacity: { duration: 0.3 }
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="pl-12 py-1 space-y-1 relative"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.05
                          }
                        }
                      }}
                    >
                      {/* Linha de conexão decorativa */}
                      <div className={cn(
                        "absolute top-0 bottom-0 left-4.5 w-0.5",
                        `bg-gradient-to-b from-transparent via-${baseColorClass}-200 dark:via-${baseColorClass}-800/30 to-transparent`
                      )} />
                      
                      {item.children.map((child, childIndex) => {
                        const isChildActive = isActive(child.path);
                        
                        return (
                          <motion.div
                            key={childIndex}
                            variants={{
                              hidden: { opacity: 0, x: -10 },
                              visible: { opacity: 1, x: 0 }
                            }}
                            className="my-1"
                          >
                            <Link 
                              href={child.path}
                              className={cn(
                                "flex items-center py-2 px-3 rounded-md transition-all relative group/item",
                                isChildActive 
                                  ? cn(
                                    `text-${colorClass} font-medium`,
                                    `bg-${baseColorClass}-50/50 dark:bg-${baseColorClass}-900/10`,
                                  )
                                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                              )}
                            >
                              {/* Ponto indicador animado */}
                              <motion.div 
                                className={cn(
                                  "absolute left-[-17px] w-3 h-3 rounded-full z-10 flex items-center justify-center",
                                  isChildActive 
                                    ? `bg-${baseColorClass}-100 dark:bg-${baseColorClass}-900/20 border border-${baseColorClass}-400`
                                    : "bg-gray-200 dark:bg-gray-700"
                                )}
                                initial={false}
                                animate={isChildActive ? {
                                  scale: [1, 1.2, 1],
                                  transition: { 
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2
                                  }
                                } : {}}
                              >
                                {isChildActive && (
                                  <motion.div 
                                    className={`w-1.5 h-1.5 rounded-full bg-${colorClass}`}
                                    layoutId={`dot-${child.path}`}
                                  />
                                )}
                              </motion.div>
                              
                              {/* Efeito de hover */}
                              <motion.div 
                                className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                                style={{
                                  background: `radial-gradient(circle at left center, rgb(var(--${baseColorClass}-50)) 0%, transparent 70%)`
                                }}
                              />
                              
                              <span className="relative z-10">{child.title}</span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.path || "#"}
                className={cn(
                  "flex items-center p-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all dark:text-gray-300 dark:hover:bg-gray-800/50 relative overflow-hidden group",
                  isItemActive && cn(
                    "bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/60 dark:to-gray-900/40 font-medium border border-gray-100 dark:border-gray-700/50"
                  )
                )}
              >
                {/* Indicador lateral de item ativo */}
                {isItemActive && (
                  <motion.div 
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${bgGradient}`}
                    layoutId={`sidebar-active-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                
                {/* Elemento decorativo de fundo no hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-r ${bgGradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Ícone com fundo */}
                <div className={cn(
                  "flex items-center justify-center w-9 h-9 rounded-lg mr-3 transition-colors duration-300",
                  isItemActive 
                    ? `text-${colorClass} bg-${baseColorClass}-100 dark:bg-${baseColorClass}-900/20` 
                    : "text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-gray-800/50 group-hover:bg-gray-200/80 dark:group-hover:bg-gray-700/50"
                )}>
                  {item.icon}
                </div>
                
                <span className={cn(
                  "flex-1 transition-colors duration-300",
                  isItemActive && `text-${colorClass}`
                )}>
                  {item.title}
                </span>
                
                {item.badge && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "ml-auto px-2 py-0 text-xs text-white border-0",
                      `bg-gradient-to-r ${bgGradient}`
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                
                {/* Efeito de shimmer no hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"
                />
              </Link>
            </motion.div>
          )}
        </motion.div>
      );
    });
  };

  // Variante para animações de entrada
  const sidebarVariants = {
    initial: isMobile 
      ? { x: -300, opacity: 0 } 
      : { width: 0, opacity: 0 },
    animate: isMobile 
      ? { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } } 
      : { width: 280, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: isMobile 
      ? { x: -300, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } } 
      : { width: 0, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar com animação */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "fixed top-0 left-0 z-40 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-xl",
              isMobile ? "w-[280px]" : "w-[280px]"
            )}
          >
            <div className="flex flex-col h-full relative overflow-hidden">
              {/* Elementos decorativos de fundo */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 opacity-5">
                  <svg width="200" height="200" viewBox="0 0 200 200" className="text-current">
                    <defs>
                      <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                  </svg>
                </div>
                <motion.div 
                  className="absolute -left-10 bottom-20 w-48 h-48 rounded-full bg-blue-100 dark:bg-blue-900 opacity-10"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    x: [0, 5, 0],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 15,
                    ease: "easeInOut" 
                  }}
                />
              </div>
              
              {/* Logo e botão collapse */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 z-10 bg-white dark:bg-gray-900">
                <Link href="/admin" className="flex items-center">
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 mr-2">
                      <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      PayHub
                    </div>
                  </motion.div>
                </Link>
                
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSidebar}
                    className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {isMobile ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <ChevronLeft className="h-5 w-5" />
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Perfil do usuário */}
              <motion.div 
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700 ring-2 ring-blue-200 dark:ring-blue-800">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
                      {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <div className="ml-3 flex-1">
                  <motion.p 
                    className="text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {user?.fullName || user?.username}
                  </motion.p>
                  <motion.div 
                    className="text-xs text-gray-500 dark:text-gray-400 flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-[10px] px-1 py-0 h-4 mr-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0"
                    >
                      ADMIN
                    </Badge>
                    <span className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span>
                      Online
                    </span>
                  </motion.div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.9 }}
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-white dark:hover:bg-gray-700 relative notification-bell"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto py-4 px-3 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  {renderMenuItems()}
                </motion.div>
                
                {/* Seção de ações extras */}
                <motion.div 
                  className="mt-6 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="px-3 flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
                    <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      Ações rápidas
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 via-gray-200 dark:via-gray-700 to-transparent"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 px-2">
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="sm" className="justify-start w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <HelpCircle className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                        Ajuda
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="sm" className="justify-start w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <Settings className="h-4 w-4 mr-1 text-purple-600 dark:text-purple-400" />
                        Configur.
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="sm" className="justify-start w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <LineChart className="h-4 w-4 mr-1 text-emerald-600 dark:text-emerald-400" />
                        Relatórios
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" size="sm" className="justify-start w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CircleDollarSign className="h-4 w-4 mr-1 text-amber-600 dark:text-amber-400" />
                        Finanças
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Logout button and theme toggle */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" />
                        Modo Claro
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" />
                        Modo Escuro
                      </>
                    )}
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  className="w-full justify-start bg-gradient-to-r from-red-500 to-rose-600 border-0 hover:from-red-600 hover:to-rose-700"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? (
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Sair da Conta
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          sidebarOpen && !isMobile ? "ml-[280px]" : "ml-0"
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="mr-3 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              
              <h1 className={cn(
                "text-xl font-semibold text-gray-800 dark:text-white",
                !sidebarOpen ? "block" : "hidden md:block"
              )}>
                Painel Administrativo
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Theme toggle when sidebar is closed */}
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              )}
              
              {/* Notification bell when sidebar is closed */}
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-800 relative notification-bell"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
              )}
              
              {/* Avatar (when sidebar is closed) */}
              {!sidebarOpen && (
                <Avatar 
                  className="h-9 w-9 ml-2 border-2 border-gray-200 dark:border-gray-700" 
                  onClick={isMobile ? toggleSidebar : undefined}
                >
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        </header>

        {/* Main content area with animation */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-6 overflow-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}