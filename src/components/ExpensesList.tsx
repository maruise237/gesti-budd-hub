
import { ExpenseCard } from "./ExpenseCard";

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

interface ExpensesListProps {
  expenses: Expense[];
  projects: Project[];
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => void;
}

export const ExpensesList = ({ expenses, projects, onEdit, onDelete }: ExpensesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          projects={projects}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
