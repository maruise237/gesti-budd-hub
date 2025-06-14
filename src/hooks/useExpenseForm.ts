
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export interface ExpenseFormData {
  description: string;
  amount: string;
  category: string;
  date: string;
  project_id: string;
  receipt_url: string;
}

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

interface UseExpenseFormProps {
  expense?: Expense | null;
  onSubmit: (data: ExpenseFormData) => void;
}

export const useExpenseForm = ({ expense, onSubmit }: UseExpenseFormProps) => {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);

  const form = useForm<ExpenseFormData>({
    defaultValues: {
      description: "",
      amount: "",
      category: "Matériaux",
      date: new Date().toISOString().split('T')[0],
      project_id: "",
      receipt_url: "",
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        description: expense.description,
        amount: expense.amount.toString(),
        category: expense.category,
        date: expense.date,
        project_id: expense.project_id || "",
        receipt_url: expense.receipt_url || "",
      });
      setReceiptUrl(expense.receipt_url);
    } else {
      form.reset({
        description: "",
        amount: "",
        category: "Matériaux",
        date: new Date().toISOString().split('T')[0],
        project_id: "",
        receipt_url: "",
      });
      setReceiptUrl(null);
    }
  }, [expense, form]);

  const handleSubmit = (data: ExpenseFormData) => {
    onSubmit({
      ...data,
      receipt_url: receiptUrl || "",
    });
  };

  const handleReceiptChange = (url: string | null) => {
    setReceiptUrl(url);
    form.setValue("receipt_url", url || "");
  };

  return {
    form,
    receiptUrl,
    handleSubmit,
    handleReceiptChange,
  };
};
