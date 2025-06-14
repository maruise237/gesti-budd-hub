import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, User, Calendar, Play, stop } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { TimeEntryDialog } from "@/components/TimeEntryDialog";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface TimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  hours_worked: number | null;
  description: string | null;
  project_id: string;
  employee_id: string;
  created_at: string;
  projects: {
    name: string;
  } | null;
  employees: {
    first_name: string;
    last_name: string;
  } | null;
}

const TimeEntries = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const queryClient = useQueryClient();

  const { data: timeEntries, isLoading } = useQuery({
    queryKey: ["time-entries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_entries")
        .select(`
          *,
          projects (name),
          employees (first_name, last_name)
        `)
        .order("start_time", { ascending: false });

      if (error) throw error;
      return data as TimeEntry[];
    },
    enabled: !!user,
  });

  const deleteEntryMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const { error } = await supabase
        .from("time_entries")
        .delete()
        .eq("id", entryId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-entries"] });
      toast({
        title: "Entrée supprimée",
        description: "L'entrée de temps a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'entrée de temps.",
        variant: "destructive",
      });
      console.error("Error deleting time entry:", error);
    },
  });

  const stopTimerMutation = useMutation({
    mutationFn: async (entryId: string) => {
      const endTime = new Date().toISOString();
      const entry = timeEntries?.find(e => e.id === entryId);
      
      if (!entry) throw new Error("Entry not found");
      
      const startTime = new Date(entry.start_time);
      const endTimeDate = new Date(endTime);
      const hoursWorked = (endTimeDate.getTime() - startTime.getTime()) / (1000 * 60 * 60);

      const { error } = await supabase
        .from("time_entries")
        .update({
          end_time: endTime,
          hours_worked: Math.round(hoursWorked * 100) / 100
        })
        .eq("id", entryId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-entries"] });
      toast({
        title: "Timer arrêté",
        description: "Le temps de travail a été enregistré.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'arrêter le timer.",
        variant: "destructive",
      });
      console.error("Error stopping timer:", error);
    },
  });

  const handleEditEntry = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
      deleteEntryMutation.mutate(entryId);
    }
  };

  const handleStopTimer = (entryId: string) => {
    stopTimerMutation.mutate(entryId);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  const getStatusBadge = (entry: TimeEntry) => {
    if (entry.end_time) {
      return (
        <Badge variant="default">
          <Clock className="h-3 w-3 mr-1" />
          Terminé
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <Play className="h-3 w-3 mr-1" />
          En cours
        </Badge>
      );
    }
  };

  const formatDuration = (startTime: string, endTime: string | null) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const duration = end.getTime() - start.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
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
              <h1 className="text-2xl font-bold text-gray-900">Temps de Travail</h1>
              <p className="text-gray-600">
                Enregistrez et suivez le temps passé sur vos projets
              </p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Entrée
            </Button>
          </div>

          {timeEntries && timeEntries.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {timeEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {entry.projects?.name || "Projet inconnu"}
                      </CardTitle>
                      {getStatusBadge(entry)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {entry.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {entry.description}
                      </p>
                    )}
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      {entry.employees && (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          <span>
                            {entry.employees.first_name} {entry.employees.last_name}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(entry.start_time), "dd/MM/yyyy HH:mm")}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          Durée: {formatDuration(entry.start_time, entry.end_time)}
                        </span>
                      </div>
                      
                      {entry.hours_worked && (
                        <div className="flex items-center font-medium">
                          <span>Total: {entry.hours_worked}h</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      {!entry.end_time && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleStopTimer(entry.id)}
                          disabled={stopTimerMutation.isPending}
                        >
                          <stop className="h-3 w-3 mr-1" />
                          Arrêter
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditEntry(entry)}
                      >
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        Supprimer
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
                    Aucune entrée de temps trouvée
                  </h3>
                  <p className="text-gray-600">
                    Commencez par enregistrer votre premier temps de travail.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer une Entrée
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <TimeEntryDialog
          open={isDialogOpen}
          onOpenChange={handleCloseDialog}
          timeEntry={editingEntry}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default TimeEntries;
