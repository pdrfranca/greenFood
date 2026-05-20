import { MainLayout } from "../layout/MainLayout";
import {
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Leaf,
  ArrowUp,
  ArrowDown,
  Calendar,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const wasteData = [
  { month: "Jan", desperdicio: 45, evitado: 120 },
  { month: "Fev", desperdicio: 38, evitado: 145 },
  { month: "Mar", desperdicio: 25, evitado: 180 },
  { month: "Abr", desperdicio: 20, evitado: 195 },
  { month: "Mai", desperdicio: 15, evitado: 210 },
  { month: "Jun", desperdicio: 12, evitado: 225 },
];

const categoryData = [
  { name: "Frutas e Vegetais", value: 35, color: "#10b981" },
  { name: "Laticínios", value: 25, color: "#3b82f6" },
  { name: "Carnes", value: 20, color: "#f59e0b" },
  { name: "Grãos", value: 15, color: "#8b5cf6" },
  { name: "Outros", value: 5, color: "#6b7280" },
];

const expiringItems = [
  { name: "Leite Integral", quantity: "50L", expiry: "2 dias", status: "critical" },
  { name: "Tomates", quantity: "15kg", expiry: "3 dias", status: "warning" },
  { name: "Frango", quantity: "25kg", expiry: "5 dias", status: "warning" },
  { name: "Queijo Mussarela", quantity: "10kg", expiry: "7 dias", status: "normal" },
];

const recentActivities = [
  { action: "Novo item adicionado", item: "Arroz Integral - 100kg", time: "5 min atrás" },
  { action: "Alerta de vencimento", item: "Leite Integral vence em 2 dias", time: "1h atrás" },
  { action: "Cardápio criado", item: "Menu da próxima semana", time: "3h atrás" },
  { action: "Item utilizado", item: "Feijão Preto - 25kg", time: "5h atrás" },
];

export function Dashboard() {
  const organizationType = localStorage.getItem('organizationType') || 'school';

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Visão geral do seu desempenho de gestão de alimentos
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Desperdício Evitado */}
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Desperdício Evitado
              </CardTitle>
              <TrendingDown className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">225 kg</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-medium">
                  +12.5%
                </span>
                <span className="text-sm text-gray-500">vs mês anterior</span>
              </div>
            </CardContent>
          </Card>

          {/* Itens Próximos do Vencimento */}
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Próximos do Vencimento
              </CardTitle>
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12 itens</div>
              <div className="flex items-center gap-1 mt-1">
                <Badge variant="destructive" className="bg-red-500">
                  4 críticos
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Economia Gerada */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Economia Gerada
              </CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">R$ 8.450</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">
                  +18.2%
                </span>
                <span className="text-sm text-gray-500">este mês</span>
              </div>
            </CardContent>
          </Card>

          {/* Impacto Ambiental */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                CO₂ Evitado
              </CardTitle>
              <Leaf className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">340 kg</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm text-gray-600">
                  Equivalente a 85 árvores plantadas
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Waste Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Desperdício</CardTitle>
              <p className="text-sm text-gray-500">
                Comparação mensal: desperdício vs evitado
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={wasteData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="desperdicio"
                    stroke="#ef4444"
                    name="Desperdício (kg)"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="evitado"
                    stroke="#10b981"
                    name="Evitado (kg)"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
              <p className="text-sm text-gray-500">
                Estoque atual por tipo de alimento
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expiring Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Itens Próximos ao Vencimento
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  12 itens
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expiringItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          item.status === "critical"
                            ? "destructive"
                            : item.status === "warning"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          item.status === "critical"
                            ? "bg-red-500"
                            : item.status === "warning"
                            ? "bg-amber-500"
                            : "bg-gray-300"
                        }
                      >
                        {item.expiry}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Metas da Semana</CardTitle>
            <p className="text-sm text-gray-500">
              Acompanhe seu progresso semanal
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Redução de desperdício
                </span>
                <span className="text-sm font-medium text-emerald-600">
                  75%
                </span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Utilização de estoque
                </span>
                <span className="text-sm font-medium text-blue-600">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Cardápios planejados
                </span>
                <span className="text-sm font-medium text-purple-600">
                  90%
                </span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
