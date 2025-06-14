
import { useState, useMemo } from "react";

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

export const useExpenseFilters = (expenses: Expense[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterProject, setFilterProject] = useState("all");

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || expense.category === filterCategory;
      const matchesProject = filterProject === "all" || 
                            (filterProject === "no_project" && !expense.project_id) ||
                            expense.project_id === filterProject;
      
      return matchesSearch && matchesCategory && matchesProject;
    });
  }, [expenses, searchTerm, filterCategory, filterProject]);

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  return {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterProject,
    setFilterProject,
    filteredExpenses,
    totalExpenses,
  };
};
