
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface TimeEntriesFiltersProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedProject: string;
  onProjectChange: (value: string) => void;
  selectedEmployee: string;
  onEmployeeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  projects: Project[];
  employees: Employee[];
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export const TimeEntriesFilters = ({
  searchTerm,
  onSearchTermChange,
  selectedProject,
  onProjectChange,
  selectedEmployee,
  onEmployeeChange,
  selectedStatus,
  onStatusChange,
  projects,
  employees,
  onClearFilters,
  activeFiltersCount,
}: TimeEntriesFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filtres</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
              >
                <X className="h-4 w-4 mr-1" />
                Effacer
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Masquer" : "Afficher"}
            </Button>
          </div>
        </div>

        {/* Barre de recherche - toujours visible */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher par description, projet ou employé..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtres avancés - affichés quand expanded */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Projet
              </label>
              <Select value={selectedProject} onValueChange={onProjectChange}>
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
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Employé
              </label>
              <Select value={selectedEmployee} onValueChange={onEmployeeChange}>
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

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Statut
              </label>
              <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les statuts</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
