
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User, Flag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { TaskDialog } from "@/components/TaskDialog";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  priority: string | null;
  due_date: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  project_id: string;
  assigned_to: string | null;
  created_at: string | null;
  projects: {
    name: string;
  } | null;
  employees: {
    first_name: string;
    last_name: string;
  } | null;
}

const Tasks = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();
  const { t } = useGlobalPreferences();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          *,
          projects (name),
          employees (first_name, last_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Task[];
    },
    enabled: !!user,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: t('currentLanguage') === 'fr' ? "Tâche supprimée" : "Task Deleted",
        description: t('currentLanguage') === 'fr' ? "La tâche a été supprimée avec succès." : "Task has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: t('currentLanguage') === 'fr' ? "Impossible de supprimer la tâche." : "Unable to delete task.",
        variant: "destructive",
      });
      console.error("Error deleting task:", error);
    },
  });

  const getStatusBadgeVariant = (status: string | null) => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "todo":
        return "outline";
      default:
        return "outline";
    }
  };

  const getPriorityBadgeVariant = (priority: string | null) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusLabel = (status: string | null) => {
    switch (status) {
      case "completed":
        return t('currentLanguage') === 'fr' ? "Terminé" : "Completed";
      case "in_progress":
        return t('currentLanguage') === 'fr' ? "En cours" : "In Progress";
      case "todo":
        return t('currentLanguage') === 'fr' ? "À faire" : "To Do";
      default:
        return t('currentLanguage') === 'fr' ? "Non défini" : "Not Defined";
    }
  };

  const getPriorityLabel = (priority: string | null) => {
    switch (priority) {
      case "high":
        return t('currentLanguage') === 'fr' ? "Élevée" : "High";
      case "medium":
        return t('currentLanguage') === 'fr' ? "Moyenne" : "Medium";
      case "low":
        return t('currentLanguage') === 'fr' ? "Faible" : "Low";
      default:
        return t('currentLanguage') === 'fr' ? "Non définie" : "Not Defined";
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm(t('currentLanguage') === 'fr' ? "Êtes-vous sûr de vouloir supprimer cette tâche ?" : "Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(taskId);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTask(null);
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
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
              <h1 className="text-2xl font-bold text-gray-900">{t('tasks')}</h1>
              <p className="text-gray-600">
                {t('currentLanguage') === 'fr' ? 'Gérez les tâches de vos projets et assignez-les à vos employés' : 'Manage your project tasks and assign them to your employees'}
              </p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('currentLanguage') === 'fr' ? 'Nouvelle Tâche' : 'New Task'}
            </Button>
          </div>

          {tasks && tasks.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <div className="flex space-x-1">
                        <Badge variant={getStatusBadgeVariant(task.status)}>
                          {getStatusLabel(task.status)}
                        </Badge>
                        <Badge variant={getPriorityBadgeVariant(task.priority)}>
                          <Flag className="h-3 w-3 mr-1" />
                          {getPriorityLabel(task.priority)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {task.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {task.projects && (
                        <div className="flex items-center">
                          <span className="font-medium">{t('project')}:</span>
                          <span className="ml-2">{task.projects.name}</span>
                        </div>
                      )}
                      
                      {task.employees && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>
                            {task.employees.first_name} {task.employees.last_name}
                          </span>
                        </div>
                      )}
                      
                      {task.due_date && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {t('currentLanguage') === 'fr' ? 'Échéance:' : 'Due:'} {format(new Date(task.due_date), "dd/MM/yyyy")}
                          </span>
                        </div>
                      )}
                      
                      {task.estimated_hours && (
                        <div className="flex items-center">
                          <span>{t('currentLanguage') === 'fr' ? 'Estimation:' : 'Estimate:'} {task.estimated_hours}h</span>
                          {task.actual_hours && (
                            <span className="ml-2">| {t('currentLanguage') === 'fr' ? 'Réel:' : 'Actual:'} {task.actual_hours}h</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditTask(task)}
                      >
                        {t('modify')}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        {t('delete')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {t('currentLanguage') === 'fr' ? 'Aucune tâche trouvée' : 'No tasks found'}
                  </h3>
                  <p className="text-gray-600">
                    {t('currentLanguage') === 'fr' ? 'Commencez par créer votre première tâche.' : 'Start by creating your first task.'}
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    {t('currentLanguage') === 'fr' ? 'Créer une Tâche' : 'Create Task'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <TaskDialog
          open={isDialogOpen}
          onOpenChange={handleCloseDialog}
          task={editingTask}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Tasks;
