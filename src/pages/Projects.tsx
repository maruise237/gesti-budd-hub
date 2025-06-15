
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Edit, Trash2, Calendar, DollarSign, MapPin } from "lucide-react";
import { ProjectDialog } from "@/components/ProjectDialog";
import { useToast } from "@/hooks/use-toast";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string | null;
  budget: number | null;
  start_date: string | null;
  end_date: string | null;
  client_name: string | null;
  client_email: string | null;
  client_phone: string | null;
  address: string | null;
  created_at: string | null;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const { t, formatCurrency } = useGlobalPreferences();

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
      toast({
        title: t('error'),
        description: t('unable_to_load_profile'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm(t('currentLanguage') === 'fr' ? "Êtes-vous sûr de vouloir supprimer ce projet ?" : "Are you sure you want to delete this project?")) return;

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: t('success'),
        description: t('currentLanguage') === 'fr' ? "Projet supprimé avec succès" : "Project deleted successfully",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: t('error'),
        description: t('currentLanguage') === 'fr' ? "Impossible de supprimer le projet" : "Unable to delete project",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      case "on_hold":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string | null) => {
    switch (status) {
      case "completed":
        return t('currentLanguage') === 'fr' ? "Terminé" : "Completed";
      case "in_progress":
        return t('currentLanguage') === 'fr' ? "En cours" : "In Progress";
      case "planning":
        return t('currentLanguage') === 'fr' ? "Planification" : "Planning";
      case "on_hold":
        return t('currentLanguage') === 'fr' ? "En pause" : "On Hold";
      default:
        return t('currentLanguage') === 'fr' ? "Non défini" : "Not defined";
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">{t('projects')}</h1>
              <p className="text-gray-600">
                {t('currentLanguage') === 'fr' ? 'Gérez vos projets de construction' : 'Manage your construction projects'}
              </p>
            </div>
            <Button 
              onClick={() => {
                setEditingProject(null);
                setDialogOpen(true);
              }}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('currentLanguage') === 'fr' ? 'Nouveau projet' : 'New Project'}
            </Button>
          </div>

          {projects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t('currentLanguage') === 'fr' ? 'Aucun projet' : 'No projects'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t('currentLanguage') === 'fr' ? 'Commencez par créer votre premier projet' : 'Start by creating your first project'}
                  </p>
                  <Button 
                    onClick={() => {
                      setEditingProject(null);
                      setDialogOpen(true);
                    }}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {t('currentLanguage') === 'fr' ? 'Créer un projet' : 'Create Project'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {project.client_name || (t('currentLanguage') === 'fr' ? "Client non défini" : "No client defined")}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      
                      {project.address && (
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span className="truncate">{project.address}</span>
                        </div>
                      )}
                      
                      {project.budget && (
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          <span>{formatCurrency(project.budget)}</span>
                        </div>
                      )}
                      
                      {project.start_date && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {t('currentLanguage') === 'fr' ? 'Début:' : 'Start:'} {new Date(project.start_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingProject(project);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {t('modify')}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {t('delete')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <ProjectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          project={editingProject}
          onProjectSaved={() => {
            fetchProjects();
            setDialogOpen(false);
            setEditingProject(null);
          }}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Projects;
