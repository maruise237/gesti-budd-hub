
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="project_id"
                rules={{ required: "Le projet est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Projet *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un projet" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects?.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="employee_id"
                rules={{ required: "L'employé est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employé *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un employé" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees?.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.first_name} {employee.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_time"
                rules={{ required: "L'heure de début est requise" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de début *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heure de fin</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hours_worked"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heures travaillées</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.25"
                      min="0"
                      placeholder="Ex: 8.5"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Description du travail effectué" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annuler
              </Button>
              <Button 
                type="submit"
                disabled={createTimeEntryMutation.isPending || updateTimeEntryMutation.isPending}
              >
                {createTimeEntryMutation.isPending || updateTimeEntryMutation.isPending
                  ? "Sauvegarde..."
                  : timeEntry
                  ? "Modifier"
                  : "Créer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
