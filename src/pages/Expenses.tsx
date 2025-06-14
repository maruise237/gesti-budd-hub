
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Plus, FileDown } from "lucide-react";
import { ExpenseDialog } from "@/components/ExpenseDialog";
import { ExpenseStats } from "@/components/ExpenseStats";
import { ExpenseFilters } from "@/components/ExpenseFilters";
import { ExpensesList } from "@/components/ExpensesList";
import { EmptyExpensesState } from "@/components/EmptyExpensesState";
import { ExpensesExportDialog } from "@/components/ExpensesExportDialog";
import { ExpensesCharts } from "@/components/ExpensesCharts";
import { useExpenses } from "@/hooks/useExpenses";
import { useProjects } from "@/hooks/useProjects";
import { useExpenseFilters } from "@/hooks/useExpenseFilters";
import { useExpensesExport } from "@/hooks/useExpensesExport";
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

const Expenses = () => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  
  const { expenses, loading, fetchExpenses, handleDelete } = useExpenses();
  const { projects } = useProjects();
  const { handleExport } = useExpensesExport(projects);
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
              <h1 className="text-3xl font-bold text-gray-900">{t('expenses')}</h1>
              <p className="text-gray-600">
                {t('manage_project_expenses')}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setExportDialogOpen(true)}
                disabled={expenses.length === 0}
              >
                <FileDown className="h-4 w-4 mr-2" />
                {t('export')}
              </Button>
              <Button 
                onClick={handleCreateExpense}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('new_expense')}
              </Button>
            </div>
          </div>

          <ExpenseStats 
            totalExpenses={totalExpenses}
            expenseCount={filteredExpenses.length}
          />

          {/* Graphiques - affichés seulement s'il y a des dépenses */}
          {expenses.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {t('currentLanguage') === 'fr' ? 'Analyses graphiques' : 'Chart Analysis'}
              </h2>
              <ExpensesCharts expenses={expenses} projects={projects} />
            </div>
          )}

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

        <ExpensesExportDialog
          open={exportDialogOpen}
          onOpenChange={setExportDialogOpen}
          expenses={expenses}
          projects={projects}
          onExport={handleExport}
        />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Expenses;
