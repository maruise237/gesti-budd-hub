
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
}

interface ExpenseFormFieldsProps {
  formData: {
    description: string;
    amount: string;
    category: string;
    date: string;
    project_id: string;
    receipt_url: string;
  };
  updateFormData: (field: string, value: string) => void;
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

export const ExpenseFormFields = ({ formData, updateFormData, projects }: ExpenseFormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          placeholder="Description de la dépense"
          required
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Montant (€) *</Label>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={(e) => updateFormData("amount", e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData("date", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Catégorie</Label>
          <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner la catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="project_id">Projet</Label>
          <Select value={formData.project_id} onValueChange={(value) => updateFormData("project_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un projet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no_project">Aucun projet</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="receipt_url">URL du reçu (optionnel)</Label>
        <Input
          id="receipt_url"
          type="url"
          value={formData.receipt_url}
          onChange={(e) => updateFormData("receipt_url", e.target.value)}
          placeholder="https://example.com/receipt.pdf"
        />
      </div>
    </div>
  );
};
