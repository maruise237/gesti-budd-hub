
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown, FileSpreadsheet } from "lucide-react";

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

interface Project {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface TimeEntriesExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeEntries: TimeEntry[];
  projects: Project[];
  employees: Employee[];
  onExport: (entries: TimeEntry[], options: { format: 'csv' | 'pdf' }) => void;
}

export const TimeEntriesExportDialog = ({
  open,
  onOpenChange,
  timeEntries,
  projects,
  employees,
  onExport,
}: TimeEntriesExportDialogProps) => {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const getFilteredEntries = () => {
    return timeEntries.filter(entry => {
      const entryDate = new Date(entry.start_time).toISOString().split('T')[0];
      
      if (startDate && entryDate < startDate) return false;
      if (endDate && entryDate > endDate) return false;
      if (selectedProject && entry.project_id !== selectedProject) return false;
      if (selectedEmployee && entry.employee_id !== selectedEmployee) return false;
      
      return true;
    });
  };

  const handleExport = () => {
    const filteredEntries = getFilteredEntries();
    onExport(filteredEntries, { format });
    onOpenChange(false);
  };

  const filteredEntries = getFilteredEntries();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileDown className="h-5 w-5 mr-2" />
            Exporter les entrées de temps
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="format">Format d'export</Label>
            <Select value={format} onValueChange={(value: 'csv' | 'pdf') => setFormat(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">
                  <div className="flex items-center">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    CSV (Excel)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center">
                    <FileDown className="h-4 w-4 mr-2" />
                    PDF (Impression)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Date de début</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Date de fin</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="project">Projet (optionnel)</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les projets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les projets</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employee">Employé (optionnel)</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger>
                <SelectValue placeholder="Tous les employés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les employés</SelectItem>
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="pt-4">
              <div className="text-sm text-gray-600">
                <strong>Aperçu de l'export:</strong>
                <div className="mt-2">
                  {filteredEntries.length} entrée(s) sélectionnée(s)
                </div>
                <div>
                  Total: {filteredEntries.reduce((sum, entry) => sum + (entry.hours_worked || 0), 0).toFixed(2)} heures
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleExport} disabled={filteredEntries.length === 0}>
            Exporter ({filteredEntries.length} entrée{filteredEntries.length > 1 ? 's' : ''})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
