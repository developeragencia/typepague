import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/dashboard";
import DashboardPadrao from "@/pages/admin/dashboard-padrao";
import CheckoutBuilder from "@/pages/admin/checkout-builder";
import { ThemeProvider } from "@/lib/theme-provider";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

// Importação preguiçosa (lazy) para outras páginas de administração
import { lazy, Suspense } from "react";
const CheckoutLink = lazy(() => import("@/pages/admin/checkout-link"));
const ListaLayout = lazy(() => import("@/pages/admin/lista-layout"));
const Transacoes = lazy(() => import("@/pages/admin/transacoes"));
const Perfil = lazy(() => import("@/pages/admin/perfil"));

// Componente de carregamento para importações lazy
const LazyLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      
      {/* Rotas do painel administrativo */}
      <ProtectedRoute path="/admin" component={AdminDashboard} requireAdmin={true} />
      <ProtectedRoute path="/admin/dashboard-padrao" component={DashboardPadrao} requireAdmin={true} />
      <ProtectedRoute path="/admin/checkout-builder" component={CheckoutBuilder} requireAdmin={true} />
      
      {/* Rotas lazy-loaded */}
      <ProtectedRoute 
        path="/admin/checkout-link" 
        requireAdmin={true}
        component={() => (
          <Suspense fallback={<LazyLoading />}>
            <CheckoutLink />
          </Suspense>
        )} 
      />
      
      <ProtectedRoute 
        path="/admin/lista-layout" 
        requireAdmin={true}
        component={() => (
          <Suspense fallback={<LazyLoading />}>
            <ListaLayout />
          </Suspense>
        )} 
      />
      
      <ProtectedRoute 
        path="/admin/transacoes" 
        requireAdmin={true}
        component={() => (
          <Suspense fallback={<LazyLoading />}>
            <Transacoes />
          </Suspense>
        )} 
      />
      
      <ProtectedRoute 
        path="/admin/perfil" 
        requireAdmin={true}
        component={() => (
          <Suspense fallback={<LazyLoading />}>
            <Perfil />
          </Suspense>
        )} 
      />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
