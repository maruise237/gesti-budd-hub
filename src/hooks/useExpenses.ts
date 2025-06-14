
import { useState, useEffect } from "react";
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
  created_at: string;
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", user!.id)
        .order("date", { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des dépenses:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les dépenses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette dépense ?")) return;

    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", expenseId);

      if (error) throw error;

      setExpenses(expenses.filter(e => e.id !== expenseId));
      toast({
        title: "Succès",
        description: "Dépense supprimée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la dépense",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  return {
    expenses,
    loading,
    fetchExpenses,
    handleDelete,
  };
};
