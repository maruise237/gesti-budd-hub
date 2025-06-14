
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, FolderOpen, Edit, Trash2 } from "lucide-react";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { useTranslation } from "@/hooks/useTranslation";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
}

interface ExpenseCardProps {
  expense: Expense;
  projects: Project[];
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

export const ExpenseCard = ({ expense, projects, onEdit, onDelete }: ExpenseCardProps) => {
  const { formatCurrency } = useUserPreferences();
  const { t } = useTranslation();

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Matériaux": "bg-blue-100 text-blue-800",
      "Main-d'œuvre": "bg-green-100 text-green-800", 
      "Transport": "bg-yellow-100 text-yellow-800",
      "Équipement": "bg-purple-100 text-purple-800",
      "Permis": "bg-red-100 text-red-800",
      "Assurance": "bg-indigo-100 text-indigo-800",
      "Autre": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getProjectName = (projectId: string | null) => {
    if (!projectId) return t('no_project') || "Aucun projet";
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : t('unknown_project') || "Projet inconnu";
  };

  const getCategoryTranslation = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "Matériaux": "materials_category",
      "Main-d'œuvre": "labor_category",
      "Transport": "transport_category",
      "Équipement": "equipment_category",
      "Permis": "permits_category",
      "Assurance": "insurance_category",
      "Autre": "other_category"
    };
    return t(categoryMap[category]) || category;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{expense.description}</CardTitle>
            <CardDescription className="mt-1">
              {getProjectName(expense.project_id)}
            </CardDescription>
          </div>
          <Badge className={getCategoryColor(expense.category)}>
            {getCategoryTranslation(expense.category)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-lg font-semibold text-orange-600">
            <DollarSign className="h-5 w-5 mr-1" />
            <span>{formatCurrency(expense.amount)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {new Date(expense.date).toLocaleDateString()}
            </span>
          </div>

          {expense.project_id && (
            <div className="flex items-center text-sm text-gray-600">
              <FolderOpen className="h-4 w-4 mr-2" />
              <span className="truncate">{getProjectName(expense.project_id)}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(expense)}
          >
            <Edit className="h-4 w-4 mr-1" />
            {t('edit')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(expense.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {t('delete')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
