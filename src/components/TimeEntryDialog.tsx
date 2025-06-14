
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { TimeEntryFormFields } from "./TimeEntryFormFields";
import { TimeEntryTimeFields } from "./TimeEntryTimeFields";
import { TimeEntryDescriptionField } from "./TimeEntryDescriptionField";
import { TimeEntryDialogActions } from "./TimeEntryDialogActions";

interface TimeEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeEntry?: {
    id: string;
    start_time: string;
    end_time: string | null;
    hours_worked: number | null;
    description: string | null;
    project_id: string;
    employee_id: string;
  } | null;
}

interface TimeEntryFormData {
  start_time: string;
  end_time: string;
  hours_worked: string;
  description: string;
  project_id: string;
  employee_id: string;
}

export const TimeEntryDialog = ({ open, onOpenChange, timeEntry }: TimeEntryDialogProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<TimeEntryFormData>({
    defaultValues: {
      start_time: "",
      end_time: "",
      hours_worked: "",
      description: "",
      project_id: "",
      employee_id: "",
    },
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, name")
        .eq("user_id", user?.id)
        .order("name");

      if (error) throw error;
      return data;
    },
    enabled: !!user && open,
  });

  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("id, first_name, last_name")
        .eq("user_id", user?.id)
        .eq("is_active", true)
        .order("first_name");

      if (error) throw error;
      return data;
    },
    enabled: !!user && open,
  });

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
      onOpenChange(false);
      form.reset();
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
      onOpenChange(false);
      form.reset();
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

  useEffect(() => {
    if (timeEntry) {
      const startTime = new Date(timeEntry.start_time);
      const endTime = timeEntry.end_time ? new Date(timeEntry.end_time) : null;
      
      form.reset({
        start_time: startTime.toISOString().slice(0, 16),
        end_time: endTime ? endTime.toISOString().slice(0, 16) : "",
        hours_worked: timeEntry.hours_worked?.toString() || "",
        description: timeEntry.description || "",
        project_id: timeEntry.project_id,
        employee_id: timeEntry.employee_id,
      });
    } else {
      const now = new Date();
      form.reset({
        start_time: now.toISOString().slice(0, 16),
        end_time: "",
        hours_worked: "",
        description: "",
        project_id: "",
        employee_id: "",
      });
    }
  }, [timeEntry, form]);

  const onSubmit = (data: TimeEntryFormData) => {
    if (timeEntry) {
      updateTimeEntryMutation.mutate(data);
    } else {
      createTimeEntryMutation.mutate(data);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const isSubmitting = createTimeEntryMutation.isPending || updateTimeEntryMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {timeEntry ? "Modifier l'Entrée de Temps" : "Nouvelle Entrée de Temps"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TimeEntryFormFields 
              form={form} 
              projects={projects} 
              employees={employees} 
            />
            
            <TimeEntryTimeFields form={form} />
            
            <TimeEntryDescriptionField form={form} />

            <TimeEntryDialogActions 
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              isEditing={!!timeEntry}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
