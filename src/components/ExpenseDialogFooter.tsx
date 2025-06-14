
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface ExpenseDialogFooterProps {
  expense: any;
  loading: boolean;
  onCancel: () => void;
}

export const ExpenseDialogFooter = ({ expense, loading, onCancel }: ExpenseDialogFooterProps) => {
  return (
    <DialogFooter>
      <Button type="button" variant="outline" onClick={onCancel}>
        Annuler
      </Button>
      <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
        {loading ? "Sauvegarde..." : expense ? "Modifier" : "Enregistrer"}
      </Button>
    </DialogFooter>
  );
};
