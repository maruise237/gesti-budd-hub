
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface TimeEntryFormData {
  start_time: string;
  end_time: string;
  hours_worked: string;
  description: string;
  project_id: string;
  employee_id: string;
}

interface TimeEntry {
  id: string;
}

interface UseTimeEntryMutationsProps {
  timeEntry?: TimeEntry | null;
  onSuccess: () => void;
}

export const useTimeEntryMutations = ({ timeEntry, onSuccess }: UseTimeEntryMutationsProps) => {
  const queryClient = useQueryClient();

  const createTimeEntryMutation = useMutation({
    mutationFn: async (data: TimeEntryFormData) => {
      const timeEntryData = {
        start_time: new Date(data.start_time).toISOString(),
        end_time: data.end_time ? new Date(data.end_time).toISOString() : null,
        hours_worked: data.hours_worked ? parseFloat(data.hours_worked) : null,
        description: data.description || null,
        project_id: data.project_id,
        employee_id: data.employee_id,
      };

      const { error } = await supabase
        .from("time_entries")
        .insert([timeEntryData]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-entries"] });
      onSuccess();
      toast({
        title: "Entrée créée",
        description: "L'entrée de temps a été créée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer l'entrée de temps.",
        variant: "destructive",
      });
      console.error("Error creating time entry:", error);
    },
  });

  const updateTimeEntryMutation = useMutation({
    mutationFn: async (data: TimeEntryFormData) => {
      if (!timeEntry) return;
      
      const timeEntryData = {
        start_time: new Date(data.start_time).toISOString(),
        end_time: data.end_time ? new Date(data.end_time).toISOString() : null,
        hours_worked: data.hours_worked ? parseFloat(data.hours_worked) : null,
        description: data.description || null,
        project_id: data.project_id,
        employee_id: data.employee_id,
      };

      const { error } = await supabase
        .from("time_entries")
        .update(timeEntryData)
        .eq("id", timeEntry.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["time-entries"] });
      onSuccess();
      toast({
        title: "Entrée modifiée",
        description: "L'entrée de temps a été modifiée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier l'entrée de temps.",
        variant: "destructive",
      });
      console.error("Error updating time entry:", error);
    },
  });

  const handleSubmit = (data: TimeEntryFormData) => {
    if (timeEntry) {
      updateTimeEntryMutation.mutate(data);
    } else {
      createTimeEntryMutation.mutate(data);
    }
  };

  const isSubmitting = createTimeEntryMutation.isPending || updateTimeEntryMutation.isPending;

  return {
    handleSubmit,
    isSubmitting,
  };
};
