import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layout/admin-layout";
import { 
  Link as LinkIcon, 
  Copy, 
  Check, 
  QrCode, 
  Share2,
  PlusCircle
} from "lucide-react";
import { useState } from "react";

export default function CheckoutLink() {
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (id: number) => {
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Exemplo de links de pagamento
  const paymentLinks = [
    { id: 1, name: "Plano Mensal Pro", price: "R$ 49,90", clicks: 142, conversions: 28, status: "active", url: "https://pay.payhub.com/l/kJd87bH3" },
    { id: 2, name: "Pacote Anual Premium", price: "R$ 499,00", clicks: 87, conversions: 15, status: "active", url: "https://pay.payhub.com/l/LmN93pQ7" },
    { id: 3, name: "Consultoria Básica", price: "R$ 129,90", clicks: 65, conversions: 8, status: "active", url: "https://pay.payhub.com/l/Rp4Kt7Wx" },
    { id: 4, name: "E-book Marketing Digital", price: "R$ 29,90", clicks: 230, conversions: 45, status: "inactive", url: "https://pay.payhub.com/l/Tz9Yb2Vn" },
  ];

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Checkout Link</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Crie e gerencie links de pagamento
            </p>
          </div>
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Link
          </Button>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Links de Pagamento</CardTitle>
              <CardDescription>
                Gerencie seus links de pagamento e acompanhe as métricas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Nome</th>
                      <th className="text-left py-3 px-4 font-medium">Valor</th>
                      <th className="text-center py-3 px-4 font-medium">Cliques</th>
                      <th className="text-center py-3 px-4 font-medium">Conversões</th>
                      <th className="text-center py-3 px-4 font-medium">Taxa</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-right py-3 px-4 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentLinks.map((link) => (
                      <tr key={link.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4 font-medium">{link.name}</td>
                        <td className="py-3 px-4">{link.price}</td>
                        <td className="py-3 px-4 text-center">{link.clicks}</td>
                        <td className="py-3 px-4 text-center">{link.conversions}</td>
                        <td className="py-3 px-4 text-center">
                          {Math.round((link.conversions / link.clicks) * 100)}%
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              link.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {link.status === "active" ? "Ativo" : "Inativo"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(link.id)}
                            >
                              {copied === link.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <CardTitle>Compartilhar Link Rápido</CardTitle>
              <CardDescription>
                Crie um link de pagamento rápido para um produto ou serviço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="link-name">Nome do produto/serviço</Label>
                    <Input id="link-name" placeholder="Ex: Consultoria Premium" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="link-price">Valor (R$)</Label>
                    <Input id="link-price" placeholder="99,90" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="link-desc">Descrição (opcional)</Label>
                    <Input id="link-desc" placeholder="Breve descrição do produto ou serviço" />
                  </div>
                  
                  <Button>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Gerar Link
                  </Button>
                </div>
                
                <div className="flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
                  <LinkIcon className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Link de Pagamento Rápido</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Gere um link de pagamento único compartilhável em qualquer canal
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <QrCode className="mr-2 h-4 w-4" />
                      Gerar QR Code
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}