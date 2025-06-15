
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FolderOpen, Users, Package, Clock, Plus, TrendingUp, BarChart3, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardStatsCards } from "@/components/DashboardStatsCards";
import { DashboardCharts } from "@/components/DashboardCharts";
import { DashboardMetrics } from "@/components/DashboardMetrics";

interface DashboardStats {
  projects: number;
  employees: number;
  materials: number;
  activeProjects: number;
  completedProjects: number;
  totalExpenses: number;
  monthlyGrowth: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    employees: 0,
    materials: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalExpenses: 0,
    monthlyGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const [projectsRes, employeesRes, materialsRes, expensesRes] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("employees").select("*", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("materials").select("*", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("expenses").select("amount").eq("user_id", user!.id),
      ]);

      const activeProjectsRes = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .eq("user_id", user!.id)
        .in("status", ["planning", "in_progress"]);

      const completedProjectsRes = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .eq("user_id", user!.id)
        .eq("status", "completed");

      const totalExpenses = expensesRes.data?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

      setStats({
        projects: projectsRes.count || 0,
        employees: employeesRes.count || 0,
        materials: materialsRes.count || 0,
        activeProjects: activeProjectsRes.count || 0,
        completedProjects: completedProjectsRes.count || 0,
        totalExpenses,
        monthlyGrowth: 15.2, // Mock data for demonstration
      });
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Performance
              </h1>
              <p className="text-gray-600 mt-2">
                Vue d'ensemble de vos projets et performances
              </p>
            </div>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => navigate("/dashboard/projects")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouveau projet
            </Button>
          </div>

          {/* Main Stats Cards */}
          <DashboardStatsCards stats={stats} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DashboardCharts stats={stats} />
            <DashboardMetrics stats={stats} />
          </div>

          {/* Quick Actions */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <span>Aperçu quotidien</span>
              </CardTitle>
              <CardDescription>Actions rapides et raccourcis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
                  onClick={() => navigate("/dashboard/projects")}
                >
                  <FolderOpen className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Gérer les projets</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                  onClick={() => navigate("/dashboard/employees")}
                >
                  <Users className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Équipe</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:bg-green-50 hover:border-green-200 transition-all duration-200"
                  onClick={() => navigate("/dashboard/expenses")}
                >
                  <BarChart3 className="h-6 w-6 text-green-600" />
                  <span className="text-sm">Dépenses</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
