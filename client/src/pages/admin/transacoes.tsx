import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layout/admin-layout";
import { 
  Search, 
  CreditCard, 
  ArrowDownUp, 
  Filter,
  Download,
  Calendar,
  CircleDollarSign,
  MoreHorizontal,
  TrendingUp,
  TrendingDown
} from "lucide-react";

export default function Transacoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("today");

  // Exemplo de dados de transações
  const transactions = [
    { id: "TX123456", date: "2023-04-27T10:30:00", customer: "Carlos Silva", amount: 149.90, status: "completed", method: "credit_card" },
    { id: "TX123457", date: "2023-04-27T11:15:00", customer: "Ana Paula Oliveira", amount: 299.00, status: "completed", method: "pix" },
    { id: "TX123458", date: "2023-04-26T15:45:00", customer: "Roberto Almeida", amount: 79.90, status: "completed", method: "credit_card" },
    { id: "TX123459", date: "2023-04-26T09:20:00", customer: "Juliana Santos", amount: 599.00, status: "failed", method: "credit_card" },
    { id: "TX123460", date: "2023-04-25T14:10:00", customer: "Fernando Costa", amount: 49.90, status: "processing", method: "boleto" },
    { id: "TX123461", date: "2023-04-25T16:30:00", customer: "Mariana Lima", amount: 129.90, status: "completed", method: "pix" },
    { id: "TX123462", date: "2023-04-24T11:05:00", customer: "Pedro Oliveira", amount: 199.90, status: "refunded", method: "credit_card" },
    { id: "TX123463", date: "2023-04-24T13:45:00", customer: "Luciana Martins", amount: 349.00, status: "completed", method: "credit_card" },
  ];

  // Filtrar transações com base no termo de pesquisa
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Componente para renderizar o status da transação
  const TransactionStatusBadge = ({ status }: { status: string }) => {
    const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      completed: { label: "Concluída", variant: "default" },
      processing: { label: "Processando", variant: "secondary" },
      failed: { label: "Falhou", variant: "destructive" },
      refunded: { label: "Reembolsada", variant: "outline" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "secondary" };

    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    );
  };

  // Componente para renderizar o método de pagamento
  const PaymentMethodCell = ({ method }: { method: string }) => {
    const methodMap: Record<string, { label: string; icon: React.ReactNode }> = {
      credit_card: { 
        label: "Cartão de Crédito", 
        icon: <CreditCard className="h-4 w-4 text-blue-500 mr-2" /> 
      },
      pix: { 
        label: "PIX", 
        icon: <div className="h-4 w-4 bg-green-500 rounded-sm text-white flex items-center justify-center text-[10px] font-bold mr-2">PIX</div> 
      },
      boleto: { 
        label: "Boleto", 
        icon: <div className="h-4 w-4 bg-gray-500 rounded-sm text-white flex items-center justify-center text-[10px] font-bold mr-2">BOL</div> 
      },
    };

    const methodInfo = methodMap[method] || { 
      label: method, 
      icon: <CircleDollarSign className="h-4 w-4 text-gray-500 mr-2" /> 
    };

    return (
      <div className="flex items-center">
        {methodInfo.icon}
        <span>{methodInfo.label}</span>
      </div>
    );
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
            <h1 className="text-2xl font-bold">Transações</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gerencie e acompanhe todas as transações
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-blue-700 dark:text-blue-400">
                <CircleDollarSign className="h-4 w-4 mr-2 text-blue-500" />
                Total Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 1.857,50</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  8 transações hoje
                </p>
                <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% hoje
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-green-700 dark:text-green-400">
                <CircleDollarSign className="h-4 w-4 mr-2 text-green-500" />
                Taxa de Conversão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5.6%</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Média semanal
                </p>
                <div className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +1.2% esta semana
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center text-red-700 dark:text-red-400">
                <CircleDollarSign className="h-4 w-4 mr-2 text-red-500" />
                Charge-backs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.2%</div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Últimos 30 dias
                </p>
                <div className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.3% este mês
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Lista de Transações</CardTitle>
                  <CardDescription>
                    Visualize e gerencie todas as transações realizadas
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="yesterday">Ontem</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mês</SelectItem>
                      <SelectItem value="custom">Período personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mt-2 mb-6">
                <TabsList>
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="completed">Concluídas</TabsTrigger>
                  <TabsTrigger value="processing">Processando</TabsTrigger>
                  <TabsTrigger value="failed">Falhas</TabsTrigger>
                  <TabsTrigger value="refunded">Reembolsadas</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="Buscar por ID ou cliente..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">
                        <div className="flex items-center">
                          ID
                          <ArrowDownUp className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">
                        <div className="flex items-center">
                          Data
                          <ArrowDownUp className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Cliente</th>
                      <th className="text-left py-3 px-4 font-medium">Método</th>
                      <th className="text-left py-3 px-4 font-medium">
                        <div className="flex items-center">
                          Valor
                          <ArrowDownUp className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4 font-medium">{transaction.id}</td>
                        <td className="py-3 px-4">
                          {new Date(transaction.date).toLocaleString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3 px-4">{transaction.customer}</td>
                        <td className="py-3 px-4">
                          <PaymentMethodCell method={transaction.method} />
                        </td>
                        <td className="py-3 px-4 font-medium">
                          R$ {transaction.amount.toFixed(2).replace(".", ",")}
                        </td>
                        <td className="py-3 px-4">
                          <TransactionStatusBadge status={transaction.status} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Mostrando {filteredTransactions.length} de {transactions.length} transações
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Anterior
                  </Button>
                  <Button variant="outline" size="sm">
                    Próximo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}