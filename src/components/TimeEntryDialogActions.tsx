
import { Button } from "@/components/ui/button";

interface TimeEntryDialogActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const TimeEntryDialogActions = ({ 
  onCancel, 
  isSubmitting, 
  isEditing 
}: TimeEntryDialogActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
      >
        Annuler
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Sauvegarde..."
          : isEditing
          ? "Modifier"
          : "Créer"}
      </Button>
    </div>
  );
};
