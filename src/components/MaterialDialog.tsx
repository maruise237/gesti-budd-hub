
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Material {
  id: string;
  name: string;
  category: string | null;
  unit: string | null;
  unit_price: number | null;
  stock_quantity: number | null;
  min_stock_threshold: number | null;
  supplier: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface MaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material?: Material | null;
  onMaterialSaved: () => void;
}

export const MaterialDialog = ({ 
  open, 
  onOpenChange, 
  material, 
  onMaterialSaved 
}: MaterialDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    unit: "",
    unit_price: "",
    stock_quantity: "",
    min_stock_threshold: "",
    supplier: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (material) {
      setFormData({
        name: material.name || "",
        category: material.category || "",
        unit: material.unit || "",
        unit_price: material.unit_price?.toString() || "",
        stock_quantity: material.stock_quantity?.toString() || "",
        min_stock_threshold: material.min_stock_threshold?.toString() || "",
        supplier: material.supplier || "",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        unit: "",
        unit_price: "",
        stock_quantity: "",
        min_stock_threshold: "",
        supplier: "",
      });
    }
  }, [material, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const materialData = {
        name: formData.name,
        category: formData.category || null,
        unit: formData.unit || null,
        unit_price: formData.unit_price ? parseFloat(formData.unit_price) : null,
        stock_quantity: formData.stock_quantity ? parseInt(formData.stock_quantity) : null,
        min_stock_threshold: formData.min_stock_threshold ? parseInt(formData.min_stock_threshold) : null,
        supplier: formData.supplier || null,
        user_id: user.id,
      };

      if (material) {
        const { error } = await supabase
          .from("materials")
          .update(materialData)
          .eq("id", material.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Matériau modifié avec succès",
        });
      } else {
        const { error } = await supabase
          .from("materials")
          .insert([materialData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Matériau créé avec succès",
        });
      }

      onMaterialSaved();
      onOpenChange(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le matériau",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {material ? "Modifier le matériau" : "Nouveau matériau"}
          </DialogTitle>
          <DialogDescription>
            {material 
              ? "Modifiez les informations du matériau" 
              : "Ajoutez un nouveau matériau à votre inventaire"
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="ex: Ciment, Brique, Isolation..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="ex: Maçonnerie, Électricité..."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unité</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="ex: kg, m², unité..."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="unit_price">Prix unitaire (€)</Label>
                <Input
                  id="unit_price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.unit_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit_price: e.target.value }))}
                  placeholder="25.50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock_quantity">Quantité en stock</Label>
                <Input
                  id="stock_quantity"
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                  placeholder="100"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="min_stock_threshold">Seuil d'alerte</Label>
                <Input
                  id="min_stock_threshold"
                  type="number"
                  min="0"
                  value={formData.min_stock_threshold}
                  onChange={(e) => setFormData(prev => ({ ...prev, min_stock_threshold: e.target.value }))}
                  placeholder="10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="supplier">Fournisseur</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData(prev => ({ ...prev, supplier: e.target.value }))}
                  placeholder="Nom du fournisseur"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? "Sauvegarde..." : (material ? "Modifier" : "Créer")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
