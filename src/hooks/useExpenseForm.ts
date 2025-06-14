
import { useState, useEffect } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
}

interface UseExpenseFormProps {
  expense: Expense | null;
  open: boolean;
}

export const useExpenseForm = ({ expense, open }: UseExpenseFormProps) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Matériaux",
    date: new Date().toISOString().split('T')[0],
    project_id: "no_project",
    receipt_url: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description || "",
        amount: expense.amount.toString(),
        category: expense.category || "Matériaux",
        date: expense.date || new Date().toISOString().split('T')[0],
        project_id: expense.project_id || "no_project",
        receipt_url: expense.receipt_url || "",
      });
    } else {
      setFormData({
        description: "",
        amount: "",
        category: "Matériaux",
        date: new Date().toISOString().split('T')[0],
        project_id: "no_project",
        receipt_url: "",
      });
    }
  }, [expense, open]);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateFormData,
  };
};
