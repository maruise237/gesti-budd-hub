
import { Button } from "@/components/ui/button";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

interface TimeEntryDialogActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export const TimeEntryDialogActions = ({ onCancel, isSubmitting, isEditing }: TimeEntryDialogActionsProps) => {
  const { t } = useGlobalPreferences();

  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {t('cancel')}
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-orange-600 hover:bg-orange-700"
      >
        {isSubmitting ? t('saving') : (isEditing ? t('update') : t('create'))}
      </Button>
    </div>
  );
};
