
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExpenseFormFields } from "./ExpenseFormFields";
import { useExpenseForm } from "@/hooks/useExpenseForm";
import { useExpenseSubmit } from "@/hooks/useExpenseSubmit";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
}

interface Project {
  id: string;
  name: string;
}

interface ExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: Expense | null;
  projects: Project[];
  onExpenseSaved: () => void;
}

export const ExpenseDialog = ({ open, onOpenChange, expense, projects, onExpenseSaved }: ExpenseDialogProps) => {
  const { formData, updateFormData } = useExpenseForm({ expense, open });
  const { loading, handleSubmit } = useExpenseSubmit({ expense, onExpenseSaved });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {expense ? "Modifier la dépense" : "Nouvelle dépense"}
          </DialogTitle>
          <DialogDescription>
            {expense 
              ? "Modifiez les informations de la dépense." 
              : "Enregistrez une nouvelle dépense pour vos projets."
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <ExpenseFormFields 
            formData={formData}
            updateFormData={updateFormData}
            projects={projects}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
              {loading ? "Sauvegarde..." : expense ? "Modifier" : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
