
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Plus } from "lucide-react";

interface EmptyExpensesStateProps {
  hasExpenses: boolean;
  onCreateExpense: () => void;
}

export const EmptyExpensesState = ({ hasExpenses, onCreateExpense }: EmptyExpensesStateProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {!hasExpenses ? "Aucune dépense" : "Aucun résultat"}
          </h3>
          <p className="text-gray-600 mb-4">
            {!hasExpenses 
              ? "Commencez par enregistrer votre première dépense" 
              : "Aucune dépense ne correspond à vos critères de recherche"
            }
          </p>
          {!hasExpenses && (
            <Button 
              onClick={onCreateExpense}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Enregistrer une dépense
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
