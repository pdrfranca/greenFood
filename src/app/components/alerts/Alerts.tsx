import { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Package,
  TrendingDown,
  X,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Alert {
  id: string;
  title: string;
  description: string;
  type: "critical" | "warning" | "info";
  category: "expiry" | "stock" | "waste" | "system";
  timestamp: string;
  read: boolean;
  actionable: boolean;
}

const alertsData: Alert[] = [
  {
    id: "1",
    title: "Leite Integral próximo do vencimento",
    description: "50L de Leite Integral vencem em 2 dias. Recomendamos priorizar o uso.",
    type: "critical",
    category: "expiry",
    timestamp: "5 min atrás",
    read: false,
    actionable: true,
  },
  {
    id: "2",
    title: "Tomates vencem em breve",
    description: "15kg de Tomates vencem em 3 dias. Sugestão: incluir no cardápio de amanhã.",
    type: "warning",
    category: "expiry",
    timestamp: "1h atrás",
    read: false,
    actionable: true,
  },
  {
    id: "3",
    title: "Estoque baixo de Arroz Integral",
    description: "Apenas 25kg restantes. Considere realizar nova compra.",
    type: "warning",
    category: "stock",
    timestamp: "2h atrás",
    read: false,
    actionable: true,
  },
  {
    id: "4",
    title: "Meta de redução de desperdício atingida",
    description: "Parabéns! Você reduziu 20% do desperdício este mês.",
    type: "info",
    category: "waste",
    timestamp: "3h atrás",
    read: true,
    actionable: false,
  },
  {
    id: "5",
    title: "Frango Congelado próximo da validade",
    description: "25kg de Frango vencem em 5 dias. Planeje refeições que utilizem este item.",
    type: "warning",
    category: "expiry",
    timestamp: "5h atrás",
    read: true,
    actionable: true,
  },
  {
    id: "6",
    title: "Desperdício potencial detectado",
    description: "Alface e Cenoura não foram utilizados nos últimos 3 dias.",
    type: "warning",
    category: "waste",
    timestamp: "1 dia atrás",
    read: true,
    actionable: true,
  },
  {
    id: "7",
    title: "Novo fornecedor cadastrado",
    description: "Fornecedor 'Hortifruti Verde Vida' foi adicionado ao sistema.",
    type: "info",
    category: "system",
    timestamp: "2 dias atrás",
    read: true,
    actionable: false,
  },
];

export function Alerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [alerts, setAlerts] = useState(alertsData);

  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.type === "critical").length;

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || alert.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleMarkAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })));
  };

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">Crítico</Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">Atenção</Badge>
        );
      case "info":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">Info</Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "expiry":
        return "Validade";
      case "stock":
        return "Estoque";
      case "waste":
        return "Desperdício";
      case "system":
        return "Sistema";
      default:
        return category;
    }
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Alertas e Notificações
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie avisos e tome ações preventivas
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Marcar todas como lidas
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Alertas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {alerts.length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Não Lidos</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {unreadCount}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Críticos</p>
                  <p className="text-2xl font-bold text-red-600">
                    {criticalCount}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ações Pendentes</p>
                  <p className="text-2xl font-bold text-amber-600">
                    {alerts.filter((a) => a.actionable && !a.read).length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar alertas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="expiry">Validade</SelectItem>
                  <SelectItem value="stock">Estoque</SelectItem>
                  <SelectItem value="waste">Desperdício</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="all">
              Todos ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Não Lidos ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="actionable">
              Ações Pendentes (
              {alerts.filter((a) => a.actionable && !a.read).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <AlertsList
              alerts={filteredAlerts}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismiss}
              getAlertIcon={getAlertIcon}
              getAlertBadge={getAlertBadge}
              getCategoryLabel={getCategoryLabel}
            />
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            <AlertsList
              alerts={filteredAlerts.filter((a) => !a.read)}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismiss}
              getAlertIcon={getAlertIcon}
              getAlertBadge={getAlertBadge}
              getCategoryLabel={getCategoryLabel}
            />
          </TabsContent>

          <TabsContent value="actionable" className="mt-6">
            <AlertsList
              alerts={filteredAlerts.filter((a) => a.actionable && !a.read)}
              onMarkAsRead={handleMarkAsRead}
              onDismiss={handleDismiss}
              getAlertIcon={getAlertIcon}
              getAlertBadge={getAlertBadge}
              getCategoryLabel={getCategoryLabel}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

interface AlertsListProps {
  alerts: Alert[];
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
  getAlertIcon: (type: string) => JSX.Element;
  getAlertBadge: (type: string) => JSX.Element | null;
  getCategoryLabel: (category: string) => string;
}

function AlertsList({
  alerts,
  onMarkAsRead,
  onDismiss,
  getAlertIcon,
  getAlertBadge,
  getCategoryLabel,
}: AlertsListProps) {
  if (alerts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum alerta encontrado</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`${
            !alert.read ? "border-l-4 border-l-emerald-500" : ""
          } hover:shadow-md transition-shadow`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3
                        className={`font-semibold text-gray-900 ${
                          !alert.read ? "font-bold" : ""
                        }`}
                      >
                        {alert.title}
                      </h3>
                      {!alert.read && (
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {getAlertBadge(alert.type)}
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(alert.category)}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {alert.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!alert.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onMarkAsRead(alert.id)}
                        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Marcar como lida
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDismiss(alert.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                {alert.actionable && !alert.read && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Ver Item
                    </Button>
                    <Button size="sm" variant="outline">
                      Adicionar ao Cardápio
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
