import { useState } from "react";
import { MainLayout } from "../layout/MainLayout";
import {
  Plus,
  Search,
  Filter,
  Package,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Calendar,
  Building2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  supplier: string;
  batch: string;
  status: "critical" | "warning" | "good";
  daysUntilExpiry: number;
}

const inventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Leite Integral",
    category: "Laticínios",
    quantity: 50,
    unit: "L",
    expiryDate: "27/03/2026",
    supplier: "Laticínios Bom Campo",
    batch: "LT-2024-001",
    status: "critical",
    daysUntilExpiry: 2,
  },
  {
    id: "2",
    name: "Tomates",
    category: "Frutas e Vegetais",
    quantity: 15,
    unit: "kg",
    expiryDate: "28/03/2026",
    supplier: "Hortifruti Verde Vida",
    batch: "TM-2024-042",
    status: "warning",
    daysUntilExpiry: 3,
  },
  {
    id: "3",
    name: "Arroz Integral",
    category: "Grãos",
    quantity: 100,
    unit: "kg",
    expiryDate: "15/09/2026",
    supplier: "Grãos do Sul",
    batch: "AR-2024-018",
    status: "good",
    daysUntilExpiry: 174,
  },
  {
    id: "4",
    name: "Frango Congelado",
    category: "Carnes",
    quantity: 25,
    unit: "kg",
    expiryDate: "30/03/2026",
    supplier: "Frigorífico Premium",
    batch: "FR-2024-089",
    status: "warning",
    daysUntilExpiry: 5,
  },
  {
    id: "5",
    name: "Feijão Preto",
    category: "Grãos",
    quantity: 75,
    unit: "kg",
    expiryDate: "20/08/2026",
    supplier: "Grãos do Sul",
    batch: "FJ-2024-025",
    status: "good",
    daysUntilExpiry: 148,
  },
  {
    id: "6",
    name: "Queijo Mussarela",
    category: "Laticínios",
    quantity: 10,
    unit: "kg",
    expiryDate: "01/04/2026",
    supplier: "Laticínios Bom Campo",
    batch: "QJ-2024-033",
    status: "warning",
    daysUntilExpiry: 7,
  },
];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "kg",
    expiryDate: "",
    supplier: "",
    batch: "",
  });

  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Crítico
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Atenção
          </Badge>
        );
      case "good":
        return (
          <Badge className="bg-emerald-500 hover:bg-emerald-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Bom
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add the item to your data store
    console.log("Adding item:", newItem);
    setIsAddDialogOpen(false);
    setNewItem({
      name: "",
      category: "",
      quantity: "",
      unit: "kg",
      expiryDate: "",
      supplier: "",
      batch: "",
    });
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Gestão de Estoque
            </h1>
            <p className="text-gray-600 mt-1">
              Controle completo dos seus alimentos
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-5 w-5 mr-2" />
                Adicionar Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Item</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Nome do Item</Label>
                    <Input
                      id="itemName"
                      placeholder="Ex: Arroz Integral"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) =>
                        setNewItem({ ...newItem, category: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Frutas e Vegetais">
                          Frutas e Vegetais
                        </SelectItem>
                        <SelectItem value="Laticínios">Laticínios</SelectItem>
                        <SelectItem value="Carnes">Carnes</SelectItem>
                        <SelectItem value="Grãos">Grãos</SelectItem>
                        <SelectItem value="Outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="100"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidade</Label>
                    <Select
                      value={newItem.unit}
                      onValueChange={(value) =>
                        setNewItem({ ...newItem, unit: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="unidades">unidades</SelectItem>
                        <SelectItem value="pacotes">pacotes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Data de Validade</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newItem.expiryDate}
                      onChange={(e) =>
                        setNewItem({ ...newItem, expiryDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch">Lote</Label>
                    <Input
                      id="batch"
                      placeholder="LT-2024-001"
                      value={newItem.batch}
                      onChange={(e) =>
                        setNewItem({ ...newItem, batch: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="supplier">Fornecedor</Label>
                    <Input
                      id="supplier"
                      placeholder="Nome do fornecedor"
                      value={newItem.supplier}
                      onChange={(e) =>
                        setNewItem({ ...newItem, supplier: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Adicionar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Itens</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <Package className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Itens Críticos</p>
                  <p className="text-2xl font-bold text-red-600">4</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Atenção</p>
                  <p className="text-2xl font-bold text-amber-600">8</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Em Bom Estado</p>
                  <p className="text-2xl font-bold text-emerald-600">144</p>
                </div>
                <CheckCircle className="h-8 w-8 text-emerald-500" />
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
                  placeholder="Buscar por nome ou fornecedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="Frutas e Vegetais">
                    Frutas e Vegetais
                  </SelectItem>
                  <SelectItem value="Laticínios">Laticínios</SelectItem>
                  <SelectItem value="Carnes">Carnes</SelectItem>
                  <SelectItem value="Grãos">Grãos</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="critical">Crítico</SelectItem>
                  <SelectItem value="warning">Atenção</SelectItem>
                  <SelectItem value="good">Bom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Itens em Estoque ({filteredInventory.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Lote</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-sm">{item.expiryDate}</p>
                            <p className="text-xs text-gray-500">
                              {item.daysUntilExpiry} dias
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{item.supplier}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {item.batch}
                        </code>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
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
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
