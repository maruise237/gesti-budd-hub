
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { FolderOpen, Users, Package, Clock, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardStats {
  projects: number;
  employees: number;
  materials: number;
  activeProjects: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    employees: 0,
    materials: 0,
    activeProjects: 0,
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
      const [projectsRes, employeesRes, materialsRes] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("employees").select("*", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("materials").select("*", { count: "exact" }).eq("user_id", user!.id),
      ]);

      const activeProjectsRes = await supabase
        .from("projects")
        .select("*", { count: "exact" })
        .eq("user_id", user!.id)
        .in("status", ["planning", "in_progress"]);

      setStats({
        projects: projectsRes.count || 0,
        employees: employeesRes.count || 0,
        materials: materialsRes.count || 0,
        activeProjects: activeProjectsRes.count || 0,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Projets totaux",
      value: stats.projects,
      icon: FolderOpen,
      description: `${stats.activeProjects} en cours`,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Employés",
      value: stats.employees,
      icon: Users,
      description: "Équipe active",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Matériaux",
      value: stats.materials,
      icon: Package,
      description: "En stock",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Projets actifs",
      value: stats.activeProjects,
      icon: TrendingUp,
      description: "En cours ou planifiés",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">
                Bienvenue sur votre espace de gestion GestiBuld
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/projects")}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-orange-600" />
                  <span>Nouveau projet</span>
                </CardTitle>
                <CardDescription>
                  Créer un nouveau projet et commencer à planifier
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/employees")}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Gérer l'équipe</span>
                </CardTitle>
                <CardDescription>
                  Ajouter des employés et gérer les affectations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/dashboard/materials")}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  <span>Stock matériaux</span>
                </CardTitle>
                <CardDescription>
                  Suivre l'inventaire et gérer les approvisionnements
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Recent Activity Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>
                Aperçu des dernières actions sur vos projets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucune activité récente</p>
                <p className="text-sm">Commencez par créer votre premier projet</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
