
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

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
}

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onProjectSaved: () => void;
}

export const ProjectDialog = ({ open, onOpenChange, project, onProjectSaved }: ProjectDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    budget: "",
    start_date: "",
    end_date: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    address: "",
  });
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "planning",
        budget: project.budget ? project.budget.toString() : "",
        start_date: project.start_date || "",
        end_date: project.end_date || "",
        client_name: project.client_name || "",
        client_email: project.client_email || "",
        client_phone: project.client_phone || "",
        address: project.address || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "planning",
        budget: "",
        start_date: "",
        end_date: "",
        client_name: "",
        client_email: "",
        client_phone: "",
        address: "",
      });
    }
  }, [project, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom du projet est obligatoire",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        name: formData.name,
        description: formData.description || null,
        status: formData.status,
        budget: formData.budget ? parseFloat(formData.budget) : null,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        client_name: formData.client_name || null,
        client_email: formData.client_email || null,
        client_phone: formData.client_phone || null,
        address: formData.address || null,
        user_id: user!.id,
      };

      if (project) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", project.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Projet modifié avec succès",
        });
      } else {
        const { error } = await supabase
          .from("projects")
          .insert([projectData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Projet créé avec succès",
        });
      }

      onProjectSaved();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le projet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? "Modifier le projet" : "Nouveau projet"}
          </DialogTitle>
          <DialogDescription>
            {project 
              ? "Modifiez les informations du projet." 
              : "Créez un nouveau projet de construction."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom du projet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nom du projet"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="status">Statut</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planification</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="on_hold">En pause</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description du projet"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget (€)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Adresse du chantier"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Date de début</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="end_date">Date de fin prévue</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations client</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client_name">Nom du client</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Nom du client"
                />
              </div>
              
              <div>
                <Label htmlFor="client_email">Email du client</Label>
                <Input
                  id="client_email"
                  type="email"
                  value={formData.client_email}
                  onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="client_phone">Téléphone du client</Label>
              <Input
                id="client_phone"
                value={formData.client_phone}
                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                placeholder="01 23 45 67 89"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
              {loading ? "Sauvegarde..." : project ? "Modifier" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
