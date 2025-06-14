
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ExpenseFormFields } from "./ExpenseFormFields";
import { ExpenseDialogHeader } from "./ExpenseDialogHeader";
import { ExpenseDialogFooter } from "./ExpenseDialogFooter";
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
        <ExpenseDialogHeader expense={expense} />
        
        <form onSubmit={onSubmit} className="space-y-4">
          <ExpenseFormFields 
            formData={formData}
            updateFormData={updateFormData}
            projects={projects}
          />

          <ExpenseDialogFooter 
            expense={expense}
            loading={loading}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
