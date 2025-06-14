import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { MaterialDialog } from "@/components/MaterialDialog";
import { MaterialsExportDialog } from "@/components/MaterialsExportDialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useMaterialsExport } from "@/hooks/useMaterialsExport";
import { Package, Plus, Search, Edit, Trash2, AlertTriangle, Download } from "lucide-react";

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

const Materials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const { handleExport } = useMaterialsExport();

  useEffect(() => {
    if (user) {
      fetchMaterials();
    }
  }, [user]);

  useEffect(() => {
    filterMaterials();
  }, [materials, searchTerm]);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("materials")
        .select("*")
        .eq("user_id", user!.id)
        .order("name");

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des matériaux:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les matériaux",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterMaterials = () => {
    if (!searchTerm) {
      setFilteredMaterials(materials);
    } else {
      const filtered = materials.filter(
        (material) =>
          material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          material.supplier?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMaterials(filtered);
    }
  };

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    setDialogOpen(true);
  };

  const handleDelete = async (material: Material) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer "${material.name}" ?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("materials")
        .delete()
        .eq("id", material.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Matériau supprimé avec succès",
      });

      fetchMaterials();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le matériau",
        variant: "destructive",
      });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedMaterial(null);
  };

  const isLowStock = (material: Material) => {
    return material.min_stock_threshold && 
           material.stock_quantity !== null && 
           material.stock_quantity <= material.min_stock_threshold;
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
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
              <h1 className="text-3xl font-bold text-gray-900">Matériaux</h1>
              <p className="text-gray-600">
                Gérez votre inventaire et suivez vos stocks
              </p>
            </div>
            <div className="flex gap-2">
              {materials.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setExportDialogOpen(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              )}
              <Button
                onClick={() => setDialogOpen(true)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau matériau
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher des matériaux..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Materials Grid */}
          {filteredMaterials.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "Aucun matériau trouvé" : "Aucun matériau"}
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {searchTerm 
                    ? "Essayez de modifier votre recherche ou d'ajouter un nouveau matériau."
                    : "Commencez par ajouter vos premiers matériaux pour suivre votre inventaire."
                  }
                </p>
                {!searchTerm && (
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="mt-4 bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un matériau
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <Card key={material.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{material.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(material)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(material)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {material.category && (
                      <Badge variant="secondary" className="w-fit">
                        {material.category}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {material.stock_quantity !== null && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Stock:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {material.stock_quantity} {material.unit || "unités"}
                            </span>
                            {isLowStock(material) && (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      )}
                      {material.unit_price && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Prix unitaire:</span>
                          <span className="font-medium">{material.unit_price}€</span>
                        </div>
                      )}
                      {material.supplier && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Fournisseur:</span>
                          <span className="text-sm">{material.supplier}</span>
                        </div>
                      )}
                      {material.min_stock_threshold && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Seuil min:</span>
                          <span className="text-sm">{material.min_stock_threshold}</span>
                        </div>
                      )}
                      {isLowStock(material) && (
                        <Badge variant="destructive" className="w-full justify-center">
                          Stock faible
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <MaterialDialog
            open={dialogOpen}
            onOpenChange={handleDialogClose}
            material={selectedMaterial}
            onMaterialSaved={fetchMaterials}
          />
          
          <MaterialsExportDialog
            open={exportDialogOpen}
            onOpenChange={setExportDialogOpen}
            materials={materials}
            onExport={handleExport}
          />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Materials;
