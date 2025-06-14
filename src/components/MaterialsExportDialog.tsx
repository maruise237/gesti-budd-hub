
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

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

interface MaterialsExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materials: Material[];
  onExport: (materials: Material[], options: { format: 'csv' | 'pdf' }) => void;
}

export const MaterialsExportDialog = ({ 
  open, 
  onOpenChange, 
  materials, 
  onExport 
}: MaterialsExportDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exporter les matériaux</DialogTitle>
          <DialogDescription>
            Choisissez le format d'export pour vos {materials.length} matériau(x).
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
            onExport(materials, { format: 'csv' });
            onOpenChange(false);
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Format CSV
              </CardTitle>
              <CardDescription>
                Exportez vers un fichier CSV compatible avec Excel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Télécharger CSV
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
            onExport(materials, { format: 'pdf' });
            onOpenChange(false);
          }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-red-600" />
                Format PDF
              </CardTitle>
              <CardDescription>
                Générez un rapport PDF formaté pour impression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Imprimer PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
