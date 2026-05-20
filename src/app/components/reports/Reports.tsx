import { MainLayout } from "../layout/MainLayout";
import {
  TrendingDown,
  DollarSign,
  Leaf,
  Package,
  Download,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUp,
  ArrowDown,
  Droplets,
  Wind,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const monthlyData = [
  { month: "Jan", desperdicio: 145, economia: 2850, evitado: 120, co2: 180 },
  { month: "Fev", desperdicio: 132, economia: 3200, evitado: 145, co2: 210 },
  { month: "Mar", desperdicio: 98, economia: 4100, evitado: 180, co2: 275 },
  { month: "Abr", desperdicio: 85, economia: 5200, evitado: 195, co2: 295 },
  { month: "Mai", desperdicio: 72, economia: 6400, evitado: 210, co2: 315 },
  { month: "Jun", desperdicio: 58, economia: 8450, evitado: 225, co2: 340 },
];

const categoryWaste = [
  { name: "Frutas e Vegetais", value: 35, color: "#10b981" },
  { name: "Laticínios", value: 25, color: "#3b82f6" },
  { name: "Carnes", value: 20, color: "#f59e0b" },
  { name: "Grãos", value: 15, color: "#8b5cf6" },
  { name: "Outros", value: 5, color: "#6b7280" },
];

const weeklyComparison = [
  { week: "Sem 1", atual: 12, anterior: 18 },
  { week: "Sem 2", atual: 10, anterior: 16 },
  { week: "Sem 3", atual: 8, anterior: 14 },
  { week: "Sem 4", atual: 6, anterior: 12 },
];

const impactMetrics = [
  {
    icon: Droplets,
    label: "Água Economizada",
    value: "12.500 L",
    comparison: "+15%",
    trend: "up",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Wind,
    label: "CO₂ Evitado",
    value: "340 kg",
    comparison: "+22%",
    trend: "up",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Leaf,
    label: "Equivalente em Árvores",
    value: "85 árvores",
    comparison: "+18%",
    trend: "up",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
];

export function Reports() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Relatórios e Métricas
            </h1>
            <p className="text-gray-600 mt-1">
              Análise completa do desempenho e impacto
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="6months">
              <SelectTrigger className="w-48">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Último mês</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="h-5 w-5 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Main KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-emerald-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Desperdício Evitado
              </CardTitle>
              <TrendingDown className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">1,275 kg</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-4 w-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-medium">
                  +87.5%
                </span>
                <span className="text-sm text-gray-500">vs período anterior</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">Meta mensal: 1,000 kg</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Economia Total
              </CardTitle>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">R$ 30.200</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-medium">
                  +196%
                </span>
                <span className="text-sm text-gray-500">vs período anterior</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Média mensal: R$ 5,033
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Impacto Ambiental
              </CardTitle>
              <Leaf className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">1,915 kg</div>
              <p className="text-sm text-gray-600 mt-1">CO₂ evitado</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  = 479 árvores plantadas
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Taxa de Aproveitamento
              </CardTitle>
              <Package className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">92%</div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-purple-600 font-medium">
                  +8%
                </span>
                <span className="text-sm text-gray-500">vs período anterior</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Badge className="bg-purple-500">Excelente</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="waste" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="waste">
              <TrendingDown className="h-4 w-4 mr-2" />
              Desperdício
            </TabsTrigger>
            <TabsTrigger value="financial">
              <DollarSign className="h-4 w-4 mr-2" />
              Financeiro
            </TabsTrigger>
            <TabsTrigger value="environmental">
              <Leaf className="h-4 w-4 mr-2" />
              Ambiental
            </TabsTrigger>
          </TabsList>

          {/* Waste Tab */}
          <TabsContent value="waste" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evolução Mensal</CardTitle>
                  <p className="text-sm text-gray-500">
                    Desperdício evitado ao longo do tempo
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorEvitado" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="evitado"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#colorEvitado)"
                        name="Desperdício Evitado (kg)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <p className="text-sm text-gray-500">
                    Onde o desperdício é evitado
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryWaste}
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
                        {categoryWaste.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Comparação Semanal</CardTitle>
                  <p className="text-sm text-gray-500">
                    Desperdício: mês atual vs anterior
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="anterior"
                        fill="#94a3b8"
                        name="Mês Anterior (kg)"
                      />
                      <Bar
                        dataKey="atual"
                        fill="#10b981"
                        name="Mês Atual (kg)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Economia Acumulada</CardTitle>
                <p className="text-sm text-gray-500">
                  Valor economizado ao reduzir desperdício
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="economia"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Economia (R$)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Economizado</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    R$ 30.200
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Últimos 6 meses
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Economia Mensal Média</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    R$ 5.033
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Por mês
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Projeção Anual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    R$ 60.400
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Estimativa 12 meses
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Environmental Tab */}
          <TabsContent value="environmental" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {impactMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 rounded-full ${metric.bgColor} flex items-center justify-center`}
                        >
                          <Icon className={`h-6 w-6 ${metric.color}`} />
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            metric.trend === "up"
                              ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                              : "text-red-600 border-red-200 bg-red-50"
                          }`}
                        >
                          {metric.trend === "up" ? (
                            <ArrowUp className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 mr-1" />
                          )}
                          {metric.comparison}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.value}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impacto de CO₂ ao Longo do Tempo</CardTitle>
                <p className="text-sm text-gray-500">
                  Emissões evitadas pela redução de desperdício
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorCO2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="co2"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorCO2)"
                      name="CO₂ Evitado (kg)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Leaf className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Parabéns pelo seu impacto!
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Seu trabalho em reduzir desperdício tem um impacto positivo
                    significativo no planeta
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-3xl font-bold text-emerald-600">
                        479
                      </p>
                      <p className="text-sm text-gray-600">
                        Árvores equivalentes
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-3xl font-bold text-blue-600">
                        12.5k L
                      </p>
                      <p className="text-sm text-gray-600">Água economizada</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-3xl font-bold text-green-600">
                        1.9t
                      </p>
                      <p className="text-sm text-gray-600">CO₂ evitado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
