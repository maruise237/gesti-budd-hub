
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
}

interface UseExpenseSubmitProps {
  expense: Expense | null;
  onExpenseSaved: () => void;
}

export const useExpenseSubmit = ({ expense, onExpenseSaved }: UseExpenseSubmitProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (formData: {
    description: string;
    amount: string;
    category: string;
    date: string;
    project_id: string;
    receipt_url: string;
  }) => {
    if (!formData.description.trim() || !formData.amount) {
      toast({
        title: "Erreur",
        description: "La description et le montant sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const expenseData = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        project_id: formData.project_id === "no_project" ? null : formData.project_id,
        receipt_url: formData.receipt_url || null,
        user_id: user!.id,
      };

      if (expense) {
        const { error } = await supabase
          .from("expenses")
          .update(expenseData)
          .eq("id", expense.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Dépense modifiée avec succès",
        });
      } else {
        const { error } = await supabase
          .from("expenses")
          .insert([expenseData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Dépense enregistrée avec succès",
        });
      }

      onExpenseSaved();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la dépense",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
