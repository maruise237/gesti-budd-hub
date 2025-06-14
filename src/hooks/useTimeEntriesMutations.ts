
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

export const useTimeEntriesMutations = (timeEntries: TimeEntry[] | undefined) => {
  const queryClient = useQueryClient();

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

  return {
    deleteEntryMutation,
    stopTimerMutation,
  };
};
