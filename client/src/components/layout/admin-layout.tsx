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
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path?: string;
  children?: { title: string; path: string }[];
  divider?: boolean;
};

const menuItems: MenuItem[] = [
  {
    title: "Dashboards",
    icon: <LayoutDashboard className="h-5 w-5" />,
    children: [
      { title: "Dashboard Admin", path: "/admin" },
      { title: "Dashboard Padrão", path: "/admin/dashboard-padrao" },
    ],
  },
  {
    title: "Produtos",
    icon: <ShoppingCart className="h-5 w-5" />,
    children: [
      { title: "Checkout Builder", path: "/admin/checkout-builder" },
      { title: "Checkout Link", path: "/admin/checkout-link" },
      { title: "Lista de Layout", path: "/admin/lista-layout" },
    ],
  },
  {
    title: "Transações",
    icon: <CreditCard className="h-5 w-5" />,
    path: "/admin/transacoes",
  },
  {
    title: "Meu Perfil",
    icon: <UserCircle className="h-5 w-5" />,
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

  useEffect(() => {
    // Em telas mobile, inicia com o menu fechado
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

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

  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      const isItemActive = isMenuActive(item);
      
      return (
        <div key={index} className={cn("mb-1", item.divider && "border-b border-gray-200 dark:border-gray-700 pb-2 mb-2")}>
          {item.children ? (
            <div>
              <button
                onClick={() => toggleMenu(item.title)}
                className={cn(
                  "flex items-center w-full p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors dark:text-gray-300 dark:hover:bg-gray-800",
                  isItemActive && "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
                )}
              >
                <div className={cn(
                  "mr-2 p-1 rounded-md text-gray-500 bg-gray-100 dark:bg-gray-800",
                  isItemActive && "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20"
                )}>
                  {item.icon}
                </div>
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  openMenus[item.title] && "transform rotate-180"
                )} />
              </button>
              
              <AnimatePresence>
                {openMenus[item.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-10 mt-1 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link 
                          key={childIndex} 
                          href={child.path}
                          className={cn(
                            "block py-2 px-3 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                            isActive(child.path) && "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium"
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href={item.path || "#"}
              className={cn(
                "flex items-center p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors",
                isActive(item.path || "") && "bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
              )}
            >
              <div className={cn(
                "mr-2 p-1 rounded-md text-gray-500 bg-gray-100 dark:bg-gray-800",
                isActive(item.path || "") && "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20"
              )}>
                {item.icon}
              </div>
              <span>{item.title}</span>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar com animação */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={isMobile ? { x: -300 } : { width: 0 }}
            animate={isMobile ? { x: 0 } : { width: 280 }}
            exit={isMobile ? { x: -300 } : { width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "fixed top-0 left-0 z-40 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-md",
              isMobile ? "w-[280px]" : "w-[280px]"
            )}
          >
            <div className="flex flex-col h-full">
              {/* Logo e botão collapse */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <Link href="/admin" className="flex items-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    PayHub Admin
                  </div>
                </Link>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="focus:outline-none"
                >
                  {isMobile ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Perfil do usuário */}
              <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    {user?.username?.substring(0, 2).toUpperCase() || "AD"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{user?.fullName || user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
                </div>
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto p-3">
                {renderMenuItems()}
              </div>

              {/* Logout button */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

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
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="mr-2 focus:outline-none"
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
            
            <div className="flex items-center">
              {/* Avatar (mobile only when sidebar is closed) */}
              {!sidebarOpen && (
                <Avatar 
                  className="h-8 w-8" 
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-6 overflow-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}