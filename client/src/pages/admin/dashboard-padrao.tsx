import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/layout/admin-layout";
import { motion } from "framer-motion";
import { 
  CircleDollarSign, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  CreditCard,
  Calendar,
  BarChart4 
} from "lucide-react";

export default function DashboardPadrao() {
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

  // Dados do gráfico (simulação visual)
  const chartBars = [35, 55, 22, 75, 55, 85, 62, 39, 45, 60, 70, 78];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Padrão</h1>
            <p className="text-gray-500 dark:text-gray-400">Visão geral do desempenho da plataforma</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              Último mês
            </Button>
            <Button variant="default" size="sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Cards de estatísticas com animação */}
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-blue-700 dark:text-blue-400">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-blue-500" />
                  Faturamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">R$ 15.450</div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Último mês
                  </p>
                  <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +18%
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-purple-700 dark:text-purple-400">
                  <Users className="h-4 w-4 mr-2 text-purple-500" />
                  Novos Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">254</div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Último mês
                  </p>
                  <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +24%
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-green-700 dark:text-green-400">
                  <ShoppingCart className="h-4 w-4 mr-2 text-green-500" />
                  Novos Pedidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">128</div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Último mês
                  </p>
                  <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    +12%
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="hover:shadow-md transition-shadow border-l-4 border-amber-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center text-amber-700 dark:text-amber-400">
                  <CreditCard className="h-4 w-4 mr-2 text-amber-500" />
                  Taxa de Conversão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.5%</div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-muted-foreground">
                    Último mês
                  </p>
                  <div className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    -2%
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Gráfico e estatísticas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Desempenho de Vendas</CardTitle>
                    <CardDescription>Análise mensal de vendas</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Mensal</Button>
                    <Button variant="ghost" size="sm">Anual</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Simulação visual do gráfico */}
                <div className="h-64 flex items-end space-x-2 overflow-hidden mt-4">
                  {chartBars.map((height, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <motion.div 
                        className="w-full bg-blue-500 rounded-t-md"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      />
                      <span className="text-xs mt-2 text-gray-500">{months[index]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Resumo de Atividades</CardTitle>
                <CardDescription>Últimas 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: <Users className="h-4 w-4 text-blue-500" />, title: "Novos usuários", value: "12", change: "+2", time: "Última hora" },
                    { icon: <ShoppingCart className="h-4 w-4 text-green-500" />, title: "Novos pedidos", value: "28", change: "+5", time: "Últimas 6 horas" },
                    { icon: <CircleDollarSign className="h-4 w-4 text-amber-500" />, title: "Receita", value: "R$ 1.450", change: "+R$ 350", time: "Últimas 12 horas" },
                    { icon: <BarChart4 className="h-4 w-4 text-purple-500" />, title: "Tráfego", value: "1.245", change: "+125", time: "Últimas 24 horas" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md mr-3">
                        {item.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{item.title}</p>
                          <span className="text-xs ml-2 text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                            {item.change}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <p className="text-lg font-semibold">{item.value}</p>
                          <span className="ml-2 text-xs text-gray-500">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  );
}