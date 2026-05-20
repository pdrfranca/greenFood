import { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import {
  Plus,
  Calendar,
  ChefHat,
  Lightbulb,
  Download,
  Users,
  Utensils,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  servings: number;
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  priority?: "high" | "medium" | "low";
  usesExpiringItems?: boolean;
}

interface DayMenu {
  date: string;
  meals: Meal[];
}

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

const sampleMeals: Meal[] = [
  {
    id: "1",
    name: "Arroz com Feijão e Frango Grelhado",
    type: "lunch",
    servings: 150,
    ingredients: [
      "Arroz Integral - 20kg",
      "Feijão Preto - 10kg",
      "Frango - 15kg",
      "Temperos",
    ],
    nutritionalInfo: {
      calories: 450,
      protein: 35,
      carbs: 55,
      fat: 12,
    },
    usesExpiringItems: true,
    priority: "high",
  },
  {
    id: "2",
    name: "Salada Completa",
    type: "lunch",
    servings: 150,
    ingredients: ["Tomates - 5kg", "Alface - 3kg", "Cenoura - 4kg"],
    nutritionalInfo: {
      calories: 80,
      protein: 2,
      carbs: 15,
      fat: 1,
    },
    usesExpiringItems: true,
    priority: "high",
  },
  {
    id: "3",
    name: "Suco Natural de Laranja",
    type: "lunch",
    servings: 150,
    ingredients: ["Laranjas - 25kg"],
    nutritionalInfo: {
      calories: 110,
      protein: 1,
      carbs: 26,
      fat: 0,
    },
  },
];

const suggestions = [
  {
    title: "Utilize Tomates",
    reason: "Vence em 3 dias",
    meals: ["Molho de Tomate Caseiro", "Salada Caprese", "Sopa de Tomate"],
    priority: "high",
  },
  {
    title: "Aproveite Leite Integral",
    reason: "Vence em 2 dias",
    meals: [
      "Mingau de Aveia",
      "Pudim de Leite",
      "Bebida Láctea com Frutas",
    ],
    priority: "high",
  },
  {
    title: "Cardápio Balanceado",
    reason: "Sugestão nutricional",
    meals: ["Peixe Grelhado", "Legumes no Vapor", "Arroz Integral"],
    priority: "medium",
  },
];

export function MealPlanning() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Planejamento de Refeições
            </h1>
            <p className="text-gray-600 mt-1">
              Crie cardápios inteligentes e reduza desperdício
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="h-5 w-5 mr-2" />
              Exportar
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Criar Cardápio
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Criar Novo Cardápio</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mealName">Nome da Refeição</Label>
                      <Input
                        id="mealName"
                        placeholder="Ex: Almoço Completo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="servings">Porções</Label>
                      <Input
                        id="servings"
                        type="number"
                        placeholder="150"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ingredients">Ingredientes</Label>
                    <Textarea
                      id="ingredients"
                      placeholder="Liste os ingredientes necessários..."
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Criar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cardápios Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <ChefHat className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Porções/Dia</p>
                  <p className="text-2xl font-bold text-gray-900">450</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aproveitamento</p>
                  <p className="text-2xl font-bold text-emerald-600">92%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tempo Médio</p>
                  <p className="text-2xl font-bold text-gray-900">45min</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Cardápio Semanal</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    25/03 - 31/03/2026
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Day Selector */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {weekDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDay(index)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedDay === index
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <p className="text-xs font-medium">{day}</p>
                      <p className="text-lg font-bold mt-1">
                        {25 + index}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Meals for Selected Day */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {weekDays[selectedDay]} - {25 + selectedDay}/03
                    </h3>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>

                  {/* Meal Cards */}
                  {sampleMeals.map((meal) => (
                    <Card key={meal.id} className="border-l-4 border-l-emerald-500">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">
                                {meal.name}
                              </h4>
                              {meal.usesExpiringItems && (
                                <Badge
                                  variant="outline"
                                  className="bg-amber-50 text-amber-700 border-amber-200"
                                >
                                  <Lightbulb className="h-3 w-3 mr-1" />
                                  Aproveita estoque
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Utensils className="h-4 w-4" />
                                {meal.type === "lunch"
                                  ? "Almoço"
                                  : meal.type === "breakfast"
                                  ? "Café"
                                  : "Jantar"}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {meal.servings} porções
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-500 mb-2">
                            INGREDIENTES
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {meal.ingredients.map((ingredient, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-100"
                              >
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Nutritional Info */}
                        {meal.nutritionalInfo && (
                          <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500">Calorias</p>
                              <p className="font-semibold text-gray-900">
                                {meal.nutritionalInfo.calories} kcal
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Proteína</p>
                              <p className="font-semibold text-gray-900">
                                {meal.nutritionalInfo.protein}g
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Carboidratos</p>
                              <p className="font-semibold text-gray-900">
                                {meal.nutritionalInfo.carbs}g
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Gordura</p>
                              <p className="font-semibold text-gray-900">
                                {meal.nutritionalInfo.fat}g
                              </p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  Sugestões Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      suggestion.priority === "high"
                        ? "bg-amber-50 border-l-amber-500"
                        : "bg-blue-50 border-l-blue-500"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {suggestion.title}
                      </h4>
                      {suggestion.priority === "high" && (
                        <Badge className="bg-amber-500 text-xs">
                          Urgente
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      {suggestion.reason}
                    </p>
                    <div className="space-y-2">
                      {suggestion.meals.map((meal, mealIndex) => (
                        <button
                          key={mealIndex}
                          className="w-full text-left text-sm bg-white p-2 rounded border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
                        >
                          {meal}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Nutricional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Calorias Totais
                  </span>
                  <span className="font-semibold text-gray-900">
                    640 kcal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Proteínas</span>
                  <span className="font-semibold text-gray-900">38g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Carboidratos</span>
                  <span className="font-semibold text-gray-900">96g</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gorduras</span>
                  <span className="font-semibold text-gray-900">13g</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <Badge className="w-full justify-center bg-emerald-500">
                    ✓ Cardápio Balanceado
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
