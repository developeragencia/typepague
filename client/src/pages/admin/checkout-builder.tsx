import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import AdminLayout from "@/components/layout/admin-layout";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Palette, 
  Code, 
  Settings, 
  Check, 
  Copy, 
  ExternalLink,
  Plus,
  Eye
} from "lucide-react";

export default function CheckoutBuilder() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Componente para visualização prévia do checkout
  const CheckoutPreview = () => (
    <div className="rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-900 w-full max-w-md mx-auto">
      <div className="mb-4 space-y-2">
        <div className="h-8 w-32 rounded-md bg-blue-100"></div>
        <div className="h-4 w-24 rounded-md bg-gray-200"></div>
      </div>
      
      <div className="space-y-4 mb-4">
        <div className="space-y-2">
          <div className="h-4 w-20 rounded-md bg-gray-200"></div>
          <div className="h-10 w-full rounded-md bg-gray-100"></div>
        </div>
        
        <div className="space-y-2">
          <div className="h-4 w-20 rounded-md bg-gray-200"></div>
          <div className="h-10 w-full rounded-md bg-gray-100"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 w-16 rounded-md bg-gray-200"></div>
            <div className="h-10 w-full rounded-md bg-gray-100"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 w-16 rounded-md bg-gray-200"></div>
            <div className="h-10 w-full rounded-md bg-gray-100"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="h-12 w-full rounded-md bg-blue-500"></div>
        <div className="flex justify-center">
          <div className="h-4 w-32 rounded-md bg-gray-200"></div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center space-x-4">
        <div className="h-8 w-12 rounded-md bg-gray-200"></div>
        <div className="h-8 w-12 rounded-md bg-gray-200"></div>
        <div className="h-8 w-12 rounded-md bg-gray-200"></div>
        <div className="h-8 w-12 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Checkout Builder</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Personalize e configure os seus checkouts
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button size="sm">
              <Check className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <Tabs defaultValue="aparencia" className="w-full">
              <TabsList className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-1 w-full justify-start">
                <TabsTrigger value="aparencia" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <Palette className="h-4 w-4 mr-2" />
                  Aparência
                </TabsTrigger>
                <TabsTrigger value="campos" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Campos
                </TabsTrigger>
                <TabsTrigger value="config" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </TabsTrigger>
                <TabsTrigger value="codigo" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800">
                  <Code className="h-4 w-4 mr-2" />
                  Código
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="aparencia">
                <Card>
                  <CardHeader>
                    <CardTitle>Aparência do Checkout</CardTitle>
                    <CardDescription>
                      Personalize as cores e estilos do seu checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Cor principal</Label>
                          <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-md bg-blue-500 border"></div>
                            <Input id="primary-color" defaultValue="#3B82F6" className="flex-1" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="background-color">Cor de fundo</Label>
                          <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-md bg-white border"></div>
                            <Input id="background-color" defaultValue="#FFFFFF" className="flex-1" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="text-color">Cor do texto</Label>
                          <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-md bg-gray-900 border"></div>
                            <Input id="text-color" defaultValue="#111827" className="flex-1" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="corner-radius">Raio dos cantos</Label>
                          <Input id="corner-radius" type="number" defaultValue="8" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="font-family">Tipografia</Label>
                          <Select defaultValue="inter">
                            <SelectTrigger id="font-family">
                              <SelectValue placeholder="Selecione uma fonte" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inter">Inter</SelectItem>
                              <SelectItem value="roboto">Roboto</SelectItem>
                              <SelectItem value="opensans">Open Sans</SelectItem>
                              <SelectItem value="montserrat">Montserrat</SelectItem>
                              <SelectItem value="poppins">Poppins</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="button-style">Estilo dos botões</Label>
                          <Select defaultValue="filled">
                            <SelectTrigger id="button-style">
                              <SelectValue placeholder="Selecione um estilo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="filled">Preenchido</SelectItem>
                              <SelectItem value="outline">Contorno</SelectItem>
                              <SelectItem value="soft">Suave</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="show-logo" defaultChecked />
                      <Label htmlFor="show-logo">Exibir logo da empresa</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="dark-mode" />
                      <Label htmlFor="dark-mode">Habilitar tema escuro</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="campos">
                <Card>
                  <CardHeader>
                    <CardTitle>Campos do Formulário</CardTitle>
                    <CardDescription>
                      Configure os campos que serão exibidos no checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: "name", label: "Nome completo", required: true },
                        { id: "email", label: "Email", required: true },
                        { id: "phone", label: "Telefone", required: false },
                        { id: "address", label: "Endereço", required: false },
                        { id: "document", label: "Documento (CPF/CNPJ)", required: true },
                      ].map((field) => (
                        <div key={field.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50 dark:bg-gray-900">
                          <div className="flex items-center space-x-2">
                            <Switch id={`field-${field.id}`} defaultChecked />
                            <Label htmlFor={`field-${field.id}`} className="font-medium">
                              {field.label}
                              {field.required && (
                                <span className="ml-2 text-xs text-red-500">Obrigatório</span>
                              )}
                            </Label>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <Button variant="outline" size="sm" className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar campo personalizado
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="config">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações</CardTitle>
                    <CardDescription>
                      Configurações gerais do checkout
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="checkout-name">Nome do checkout</Label>
                        <Input id="checkout-name" defaultValue="Checkout Padrão" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency">Moeda</Label>
                        <Select defaultValue="brl">
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Selecione uma moeda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                            <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                            <SelectItem value="eur">Euro (€)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="success-url">URL de sucesso</Label>
                      <Input id="success-url" defaultValue="https://seusite.com.br/obrigado" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cancel-url">URL de cancelamento</Label>
                      <Input id="cancel-url" defaultValue="https://seusite.com.br/cancelado" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-email" defaultChecked />
                      <Label htmlFor="auto-email">Enviar email de confirmação automaticamente</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="save-customer" defaultChecked />
                      <Label htmlFor="save-customer">Salvar informações do cliente</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="terms" />
                      <Label htmlFor="terms">Exigir aceitação dos termos e condições</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="codigo">
                <Card>
                  <CardHeader>
                    <CardTitle>Código de Integração</CardTitle>
                    <CardDescription>
                      Copie o código para integrar este checkout em seu site
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>{`<script src="https://payhub.com.br/checkout.js"></script>
<div id="payhub-checkout" data-id="checkout_12345"></div>
<script>
  const checkout = new PayHub.Checkout({
    key: "pk_live_51Abc123...",
    container: "#payhub-checkout",
    productId: "prod_ABC123",
    theme: "light"
  });
</script>`}</pre>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Documentação completa de integração
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Pré-visualização</CardTitle>
                <CardDescription>
                  Veja como seu checkout irá aparecer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <CheckoutPreview />
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  Esta é uma visualização simplificada do checkout
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AdminLayout>
  );
}