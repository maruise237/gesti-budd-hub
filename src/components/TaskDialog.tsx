
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

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: {
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
  } | null;
}

interface TaskFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string;
  estimated_hours: string;
  actual_hours: string;
  project_id: string;
  assigned_to: string;
}

export const TaskDialog = ({ open, onOpenChange, task }: TaskDialogProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      due_date: "",
      estimated_hours: "",
      actual_hours: "",
      project_id: "",
      assigned_to: "",
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

  const createTaskMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      const taskData = {
        title: data.title,
        description: data.description || null,
        status: data.status,
        priority: data.priority,
        due_date: data.due_date || null,
        estimated_hours: data.estimated_hours ? parseFloat(data.estimated_hours) : null,
        actual_hours: data.actual_hours ? parseFloat(data.actual_hours) : null,
        project_id: data.project_id,
        assigned_to: data.assigned_to || null,
      };

      const { error } = await supabase
        .from("tasks")
        .insert([taskData]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onOpenChange(false);
      form.reset();
      toast({
        title: "Tâche créée",
        description: "La tâche a été créée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer la tâche.",
        variant: "destructive",
      });
      console.error("Error creating task:", error);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async (data: TaskFormData) => {
      if (!task) return;
      
      const taskData = {
        title: data.title,
        description: data.description || null,
        status: data.status,
        priority: data.priority,
        due_date: data.due_date || null,
        estimated_hours: data.estimated_hours ? parseFloat(data.estimated_hours) : null,
        actual_hours: data.actual_hours ? parseFloat(data.actual_hours) : null,
        project_id: data.project_id,
        assigned_to: data.assigned_to || null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("tasks")
        .update(taskData)
        .eq("id", task.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onOpenChange(false);
      form.reset();
      toast({
        title: "Tâche modifiée",
        description: "La tâche a été modifiée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier la tâche.",
        variant: "destructive",
      });
      console.error("Error updating task:", error);
    },
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        due_date: task.due_date || "",
        estimated_hours: task.estimated_hours?.toString() || "",
        actual_hours: task.actual_hours?.toString() || "",
        project_id: task.project_id,
        assigned_to: task.assigned_to || "",
      });
    } else {
      form.reset({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        due_date: "",
        estimated_hours: "",
        actual_hours: "",
        project_id: "",
        assigned_to: "",
      });
    }
  }, [task, form]);

  const onSubmit = (data: TaskFormData) => {
    if (task) {
      updateTaskMutation.mutate(data);
    } else {
      createTaskMutation.mutate(data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {task ? "Modifier la Tâche" : "Nouvelle Tâche"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Le titre est requis" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre *</FormLabel>
                  <FormControl>
                    <Input placeholder="Titre de la tâche" {...field} />
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
                      placeholder="Description de la tâche" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                name="assigned_to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigné à</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un employé" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">Aucun</SelectItem>
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="todo">À faire</SelectItem>
                        <SelectItem value="in_progress">En cours</SelectItem>
                        <SelectItem value="completed">Terminé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Faible</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Élevée</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d'échéance</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimated_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heures estimées</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.5"
                        min="0"
                        placeholder="0"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="actual_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heures réelles</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.5"
                        min="0"
                        placeholder="0"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                disabled={createTaskMutation.isPending || updateTaskMutation.isPending}
              >
                {createTaskMutation.isPending || updateTaskMutation.isPending
                  ? "Sauvegarde..."
                  : task
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
