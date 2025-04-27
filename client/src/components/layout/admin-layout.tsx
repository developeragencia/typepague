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
    color: menuColors[0],
    children: [
      { title: "Dashboard Admin", path: "/admin" },
      { title: "Dashboard Padrão", path: "/admin/dashboard-padrao" },
    ],
  },
  {
    title: "Produtos",
    icon: <ShoppingCart className="h-5 w-5" />,
    color: menuColors[1],
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
    color: menuColors[2],
    path: "/admin/transacoes",
  },
  {
    title: "Meu Perfil",
    icon: <UserCircle className="h-5 w-5" />,
    color: menuColors[3],
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
      
      return (
        <motion.div 
          key={index} 
          className={cn("mb-2", item.divider && "border-b border-gray-200 dark:border-gray-700 pb-3 mb-3")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {item.children ? (
            <div>
              <button
                onClick={() => toggleMenu(item.title)}
                className={cn(
                  "flex items-center w-full p-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-all dark:text-gray-300 dark:hover:bg-gray-800",
                  isItemActive && "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
                )}
              >
                <div className={cn(
                  "mr-3",
                  isItemActive 
                    ? `text-${bgGradient.split('-')[1]}-500 dark:text-${bgGradient.split('-')[1]}-400` 
                    : "text-gray-500 dark:text-gray-400"
                )}>
                  {item.icon}
                </div>
                <span className="flex-1 text-left">{item.title}</span>
                {item.badge && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "mr-2 px-2 py-0 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0"
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  openMenus[item.title] && "transform rotate-180"
                )} />
              </button>
              
              <AnimatePresence initial={false}>
                {openMenus[item.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="pl-12 mt-1 space-y-1 relative"
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
                      {/* Linha de conexão */}
                      <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                      
                      {item.children.map((child, childIndex) => (
                        <motion.div
                          key={childIndex}
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 }
                          }}
                        >
                          <Link 
                            href={child.path}
                            className={cn(
                              "flex items-center py-2 px-3 rounded-md transition-all hover:bg-gray-100 dark:hover:bg-gray-800 relative",
                              isActive(child.path) && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
                            )}
                          >
                            {/* Ponto indicador */}
                            <div className={cn(
                              "absolute left-[-16px] w-2 h-2 rounded-full z-10",
                              isActive(child.path) 
                                ? `bg-gradient-to-r ${bgGradient}`
                                : "bg-gray-300 dark:bg-gray-600"
                            )} />
                            
                            {child.title}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href={item.path || "#"}
              className={cn(
                "flex items-center p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all",
                isActive(item.path || "") && "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
              )}
            >
              <div className={cn(
                "mr-3",
                isActive(item.path || "") 
                  ? `text-${bgGradient.split('-')[1]}-500 dark:text-${bgGradient.split('-')[1]}-400` 
                  : "text-gray-500 dark:text-gray-400"
              )}>
                {item.icon}
              </div>
              <span>{item.title}</span>
              {item.badge && (
                <Badge 
                  variant="outline" 
                  className="ml-auto px-2 py-0 text-xs bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
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
              "fixed top-0 left-0 z-40 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg",
              isMobile ? "w-[280px]" : "w-[280px]"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Logo e botão collapse */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <Link href="/admin" className="flex items-center">
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                    <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      PayHub
                    </div>
                  </div>
                </Link>
                
                <Button
                  variant="ghost"
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
              </div>

              {/* Perfil do usuário */}
              <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-700">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4 mr-1 bg-gradient-to-r from-emerald-500 to-green-600 text-white">
                      ADMIN
                    </Badge>
                    Online
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative notification-bell"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto p-3">
                {renderMenuItems()}
                
                {/* Seção de ações extras */}
                <div className="mt-6 space-y-2">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações rápidas
                  </h3>
                  
                  <motion.div 
                    className="grid grid-cols-2 gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button variant="outline" size="sm" className="justify-start">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Ajuda
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Settings className="h-4 w-4 mr-1" />
                      Configur.
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <LineChart className="h-4 w-4 mr-1" />
                      Relatórios
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <CircleDollarSign className="h-4 w-4 mr-1" />
                      Finanças
                    </Button>
                  </motion.div>
                </div>
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