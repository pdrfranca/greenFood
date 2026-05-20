import { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import {
  Building,
  Users,
  Bell,
  Settings as SettingsIcon,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Plus,
  Trash2,
  Edit,
  Shield,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Textarea } from "../ui/textarea";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@greenfood.com",
    role: "Administrador",
    status: "active",
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao@greenfood.com",
    role: "Gerente de Estoque",
    status: "active",
  },
  {
    id: "3",
    name: "Ana Costa",
    email: "ana@greenfood.com",
    role: "Nutricionista",
    status: "active",
  },
  {
    id: "4",
    name: "Carlos Oliveira",
    email: "carlos@greenfood.com",
    role: "Cozinheiro",
    status: "inactive",
  },
];

export function Settings() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    expiryAlerts: true,
    stockAlerts: true,
    weeklyReports: true,
    monthlyReports: false,
  });

  const organizationType = localStorage.getItem('organizationType') || 'school';

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Configurações
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas preferências e configurações
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="organization" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="organization">
              <Building className="h-4 w-4 mr-2" />
              Organização
            </TabsTrigger>
            <TabsTrigger value="team">
              <Users className="h-4 w-4 mr-2" />
              Equipe
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Preferências
            </TabsTrigger>
          </TabsList>

          {/* Organization Tab */}
          <TabsContent value="organization" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Organização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orgName">Nome da Organização</Label>
                    <Input
                      id="orgName"
                      defaultValue="Escola Municipal Verde"
                      placeholder="Nome da organização"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orgType">Tipo de Organização</Label>
                    <Select defaultValue={organizationType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="school">Escola</SelectItem>
                        <SelectItem value="restaurant">Restaurante</SelectItem>
                        <SelectItem value="corporate">
                          Refeitório Corporativo
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      placeholder="00.000.000/0000-00"
                      defaultValue="12.345.678/0001-90"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        placeholder="(00) 0000-0000"
                        className="pl-10"
                        defaultValue="(11) 3456-7890"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="contato@organizacao.com"
                        className="pl-10"
                        defaultValue="contato@escolaverde.edu.br"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="address"
                        placeholder="Endereço completo"
                        className="pl-10"
                        defaultValue="Rua das Flores, 123 - Centro - São Paulo/SP - 01234-567"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacidade e Metas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacidade Diária (porções)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      defaultValue="450"
                      placeholder="450"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wasteGoal">Meta de Redução (%)</Label>
                    <Input
                      id="wasteGoal"
                      type="number"
                      defaultValue="75"
                      placeholder="75"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Orçamento Mensal (R$)</Label>
                    <Input
                      id="budget"
                      type="number"
                      defaultValue="25000"
                      placeholder="25000"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Metas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Gerenciar Equipe</CardTitle>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Membro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>E-mail</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-emerald-600" />
                            </div>
                            {member.name}
                          </div>
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          {member.status === "active" ? (
                            <Badge className="bg-emerald-500">Ativo</Badge>
                          ) : (
                            <Badge variant="secondary">Inativo</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funções e Permissões</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Administrador</p>
                      <p className="text-sm text-gray-600">
                        Acesso completo a todas as funcionalidades
                      </p>
                    </div>
                    <Badge className="bg-purple-500">Completo</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">
                        Gerente de Estoque
                      </p>
                      <p className="text-sm text-gray-600">
                        Gerenciar estoque e fornecedores
                      </p>
                    </div>
                    <Badge variant="outline">Limitado</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Nutricionista</p>
                      <p className="text-sm text-gray-600">
                        Planejar cardápios e visualizar relatórios
                      </p>
                    </div>
                    <Badge variant="outline">Limitado</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cozinheiro</p>
                      <p className="text-sm text-gray-600">
                        Visualizar cardápios e estoque
                      </p>
                    </div>
                    <Badge variant="outline">Somente Leitura</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailAlerts" className="text-base">
                        Alertas por E-mail
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receba notificações importantes por e-mail
                      </p>
                    </div>
                    <Switch
                      id="emailAlerts"
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailAlerts: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications" className="text-base">
                        Notificações Push
                      </Label>
                      <p className="text-sm text-gray-500">
                        Alertas em tempo real no navegador
                      </p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          pushNotifications: checked,
                        })
                      }
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Tipos de Alertas
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="expiryAlerts" className="text-base">
                            Alertas de Vencimento
                          </Label>
                          <p className="text-sm text-gray-500">
                            Itens próximos da data de validade
                          </p>
                        </div>
                        <Switch
                          id="expiryAlerts"
                          checked={notifications.expiryAlerts}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              expiryAlerts: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="stockAlerts" className="text-base">
                            Alertas de Estoque
                          </Label>
                          <p className="text-sm text-gray-500">
                            Níveis baixos de estoque
                          </p>
                        </div>
                        <Switch
                          id="stockAlerts"
                          checked={notifications.stockAlerts}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              stockAlerts: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Relatórios Periódicos
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weeklyReports" className="text-base">
                            Relatórios Semanais
                          </Label>
                          <p className="text-sm text-gray-500">
                            Resumo semanal de desempenho
                          </p>
                        </div>
                        <Switch
                          id="weeklyReports"
                          checked={notifications.weeklyReports}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              weeklyReports: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="monthlyReports" className="text-base">
                            Relatórios Mensais
                          </Label>
                          <p className="text-sm text-gray-500">
                            Análise completa mensal
                          </p>
                        </div>
                        <Switch
                          id="monthlyReports"
                          checked={notifications.monthlyReports}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              monthlyReports: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select defaultValue="pt-br">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-br">Português (BR)</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select defaultValue="america-saopaulo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america-saopaulo">
                          (GMT-3) Brasília
                        </SelectItem>
                        <SelectItem value="america-newyork">
                          (GMT-5) New York
                        </SelectItem>
                        <SelectItem value="europe-london">
                          (GMT+0) London
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de Data</Label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moeda</Label>
                    <Select defaultValue="brl">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brl">Real (R$)</SelectItem>
                        <SelectItem value="usd">Dólar (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas de Validade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="criticalDays">
                      Crítico (dias antes)
                    </Label>
                    <Input
                      id="criticalDays"
                      type="number"
                      defaultValue="3"
                      placeholder="3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="warningDays">
                      Atenção (dias antes)
                    </Label>
                    <Input
                      id="warningDays"
                      type="number"
                      defaultValue="7"
                      placeholder="7"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="normalDays">
                      Normal (dias antes)
                    </Label>
                    <Input
                      id="normalDays"
                      type="number"
                      defaultValue="15"
                      placeholder="15"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
