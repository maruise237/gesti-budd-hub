
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  position: string | null;
  hourly_rate: number | null;
  hire_date: string | null;
  is_active: boolean | null;
  created_at: string | null;
}

interface EmployeesExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employees: Employee[];
  onExport: (employees: Employee[], options: { format: 'csv' | 'pdf' }) => void;
}

export const EmployeesExportDialog = ({ 
  open, 
  onOpenChange, 
  employees, 
  onExport 
}: EmployeesExportDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exporter les employés</DialogTitle>
          <DialogDescription>
            Choisissez le format d'export pour vos {employees.length} employé(s).
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => {
            onExport(employees, { format: 'csv' });
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
            onExport(employees, { format: 'pdf' });
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
