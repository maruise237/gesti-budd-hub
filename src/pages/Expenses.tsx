
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, Calendar, DollarSign, FolderOpen, Search } from "lucide-react";
import { ExpenseDialog } from "@/components/ExpenseDialog";
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const { user } = useAuth();
  const { toast } = useToast();

  const categories = [
    "Matériaux",
    "Main-d'œuvre", 
    "Transport",
    "Équipement",
    "Permis",
    "Assurance",
    "Autre"
  ];

  useEffect(() => {
    if (user) {
      fetchExpenses();
      fetchProjects();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user!.id)
        .order("date", { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des dépenses:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les dépenses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("id, name")
        .eq("user_id", user!.id)
        .order("name");

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  };

  const handleDelete = async (expenseId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette dépense ?")) return;

    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);

      if (error) throw error;

      setExpenses(expenses.filter(e => e.id !== expenseId));
      toast({
        title: "Succès",
        description: "Dépense supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la dépense",
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Matériaux": "bg-blue-100 text-blue-800",
      "Main-d'œuvre": "bg-green-100 text-green-800", 
      "Transport": "bg-yellow-100 text-yellow-800",
      "Équipement": "bg-purple-100 text-purple-800",
      "Permis": "bg-red-100 text-red-800",
      "Assurance": "bg-indigo-100 text-indigo-800",
      "Autre": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getProjectName = (projectId: string | null) => {
    if (!projectId) return "Aucun projet";
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : "Projet inconnu";
  };

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || expense.category === filterCategory;
    const matchesProject = filterProject === "all" || 
                          (filterProject === "no_project" && !expense.project_id) ||
                          expense.project_id === filterProject;
    
    return matchesSearch && matchesCategory && matchesProject;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dépenses</h1>
              <p className="text-gray-600">
                Gérez les dépenses de vos projets
              </p>
            </div>
            <Button 
              onClick={() => {
                setEditingExpense(null);
                setDialogOpen(true);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle dépense
            </Button>
          </div>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-orange-600" />
                Total des dépenses filtrées
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {totalExpenses.toLocaleString()} €
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Sur {filteredExpenses.length} dépense(s)
              </p>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterProject} onValueChange={setFilterProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les projets</SelectItem>
                    <SelectItem value="no_project">Aucun projet</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                    setFilterProject("all");
                  }}
                >
                  Réinitialiser
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Expenses List */}
          {filteredExpenses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {expenses.length === 0 ? "Aucune dépense" : "Aucun résultat"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {expenses.length === 0 
                      ? "Commencez par enregistrer votre première dépense" 
                      : "Aucune dépense ne correspond à vos critères de recherche"
                    }
                  </p>
                  {expenses.length === 0 && (
                    <Button 
                      onClick={() => {
                        setEditingExpense(null);
                        setDialogOpen(true);
                      }}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Enregistrer une dépense
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpenses.map((expense) => (
                <Card key={expense.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{expense.description}</CardTitle>
                        <CardDescription className="mt-1">
                          {getProjectName(expense.project_id)}
                        </CardDescription>
                      </div>
                      <Badge className={getCategoryColor(expense.category)}>
                        {expense.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-lg font-semibold text-orange-600">
                        <DollarSign className="h-5 w-5 mr-1" />
                        <span>{expense.amount.toLocaleString()} €</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>

                      {expense.project_id && (
                        <div className="flex items-center text-sm text-gray-600">
                          <FolderOpen className="h-4 w-4 mr-2" />
                          <span className="truncate">{getProjectName(expense.project_id)}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingExpense(expense);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <ExpenseDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          expense={editingExpense}
          projects={projects}
          onExpenseSaved={() => {
            fetchExpenses();
            setDialogOpen(false);
            setEditingExpense(null);
          }}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Expenses;
