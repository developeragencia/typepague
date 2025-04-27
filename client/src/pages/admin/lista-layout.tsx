import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layout/admin-layout";
import { Search, LayoutTemplate, Trash2, PenSquare, PlusCircle, Eye, Filter } from "lucide-react";
import { useState } from "react";

export default function ListaLayout() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lista de exemplos de layouts
  const layouts = [
    { id: 1, name: "Layout Padrão", description: "Layout padrão para páginas de checkout", category: "Checkout", lastUsed: "2 dias atrás", status: "active" },
    { id: 2, name: "Layout Minimalista", description: "Layout simplificado com poucos elementos", category: "Checkout", lastUsed: "1 semana atrás", status: "active" },
    { id: 3, name: "Layout Moderno", description: "Design contemporâneo com elementos visuais atrativos", category: "Página de Vendas", lastUsed: "2 semanas atrás", status: "active" },
    { id: 4, name: "Layout Corporativo", description: "Design sóbrio para empresas e instituições", category: "Institucional", lastUsed: "1 mês atrás", status: "inactive" },
    { id: 5, name: "Layout Premium", description: "Layout com elementos visuais premium e animações", category: "Página de Vendas", lastUsed: "3 dias atrás", status: "active" },
    { id: 6, name: "Layout Simples", description: "Checkout direto e sem distrações para alta conversão", category: "Checkout", lastUsed: "5 dias atrás", status: "active" },
  ];

  // Filtrar layouts com base no termo de pesquisa
  const filteredLayouts = layouts.filter(
    (layout) =>
      layout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      layout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      layout.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Lista de Layouts</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Gerencie os layouts disponíveis para suas páginas e checkouts
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Layout
          </Button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="Pesquisar layouts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtrar
                  </Button>
                  <Button variant="secondary" size="sm">
                    <LayoutTemplate className="mr-2 h-4 w-4" />
                    Categorias
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLayouts.map((layout) => (
                  <motion.div
                    key={layout.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <Card className="overflow-hidden h-full transition-all border hover:border-blue-200 hover:shadow-md dark:hover:border-blue-900">
                      <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 relative flex items-center justify-center p-4">
                        <LayoutTemplate className="h-16 w-16 text-blue-200 dark:text-blue-800" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button variant="secondary" size="sm" className="mr-2">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" size="sm">
                            <PenSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{layout.name}</CardTitle>
                          <Badge variant={layout.status === "active" ? "default" : "secondary"}>
                            {layout.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <CardDescription>{layout.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="py-2">
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Categoria:</span>
                          <span className="ml-2">{layout.category}</span>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <span className="font-medium text-gray-500 dark:text-gray-400">Último uso:</span>
                          <span className="ml-2">{layout.lastUsed}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 pb-4 flex justify-between">
                        <Button variant="outline" size="sm">
                          <PenSquare className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}