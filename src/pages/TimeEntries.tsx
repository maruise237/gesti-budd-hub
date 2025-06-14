
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { TimeEntryDialog } from "@/components/TimeEntryDialog";
import { toast } from "@/hooks/use-toast";
import { TimeEntriesHeader } from "@/components/TimeEntriesHeader";
import { TimeEntriesList } from "@/components/TimeEntriesList";
import { EmptyTimeEntriesState } from "@/components/EmptyTimeEntriesState";

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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEntry(null);
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
          <TimeEntriesHeader onCreateEntry={handleOpenDialog} />

          {timeEntries && timeEntries.length > 0 ? (
            <TimeEntriesList
              timeEntries={timeEntries}
              onEditEntry={handleEditEntry}
              onDeleteEntry={handleDeleteEntry}
              onStopTimer={handleStopTimer}
              isStoppingTimer={stopTimerMutation.isPending}
            />
          ) : (
            <EmptyTimeEntriesState onCreateEntry={handleOpenDialog} />
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
