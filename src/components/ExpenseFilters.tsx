
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface ExpenseFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  filterProject: string;
  setFilterProject: (value: string) => void;
  projects: Project[];
}

const categories = [
  "Matériaux",
  "Main-d'œuvre", 
  "Transport",
  "Équipement",
  "Permis",
  "Assurance",
  "Autre"
];

export const ExpenseFilters = ({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterProject,
  setFilterProject,
  projects
}: ExpenseFiltersProps) => {
  const resetFilters = () => {
    setSearchTerm("");
    setFilterCategory("all");
    setFilterProject("all");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterProject} onValueChange={setFilterProject}>
            <SelectTrigger>
              <SelectValue placeholder="Projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              <SelectItem value="no_project">Aucun projet</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={resetFilters}>
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
