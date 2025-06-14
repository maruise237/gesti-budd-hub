
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Plus } from "lucide-react";
import { ExpenseDialog } from "@/components/ExpenseDialog";
import { ExpenseStats } from "@/components/ExpenseStats";
import { ExpenseFilters } from "@/components/ExpenseFilters";
import { ExpensesList } from "@/components/ExpensesList";
import { EmptyExpensesState } from "@/components/EmptyExpensesState";
import { useExpenses } from "@/hooks/useExpenses";
import { useProjects } from "@/hooks/useProjects";
import { useExpenseFilters } from "@/hooks/useExpenseFilters";

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

const Expenses = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  
  const { expenses, loading, fetchExpenses, handleDelete } = useExpenses();
  const { projects } = useProjects();
  const {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterProject,
    setFilterProject,
    filteredExpenses,
    totalExpenses,
  } = useExpenseFilters(expenses);

  const handleCreateExpense = () => {
    setEditingExpense(null);
    setDialogOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };

  const handleExpenseSaved = () => {
    fetchExpenses();
    setDialogOpen(false);
    setEditingExpense(null);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <DashboardLayout>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </DashboardLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dépenses</h1>
              <p className="text-gray-600">
                Gérez les dépenses de vos projets
              </p>
            </div>
            <Button 
              onClick={handleCreateExpense}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle dépense
            </Button>
          </div>

          <ExpenseStats 
            totalExpenses={totalExpenses}
            expenseCount={filteredExpenses.length}
          />

          <ExpenseFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterProject={filterProject}
            setFilterProject={setFilterProject}
            projects={projects}
          />

          {filteredExpenses.length === 0 ? (
            <EmptyExpensesState 
              hasExpenses={expenses.length > 0}
              onCreateExpense={handleCreateExpense}
            />
          ) : (
            <ExpensesList
              expenses={filteredExpenses}
              projects={projects}
              onEdit={handleEditExpense}
              onDelete={handleDelete}
            />
          )}
        </div>

        <ExpenseDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          expense={editingExpense}
          projects={projects}
          onExpenseSaved={handleExpenseSaved}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Expenses;
