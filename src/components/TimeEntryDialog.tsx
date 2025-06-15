
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { TimeEntryFormFields } from "./TimeEntryFormFields";
import { TimeEntryTimeFields } from "./TimeEntryTimeFields";
import { TimeEntryDescriptionField } from "./TimeEntryDescriptionField";
import { TimeEntryDialogActions } from "./TimeEntryDialogActions";
import { useTimeEntryForm } from "@/hooks/useTimeEntryForm";
import { useTimeEntryMutations } from "@/hooks/useTimeEntryMutations";
import { useTimeEntryData } from "@/hooks/useTimeEntryData";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

interface TimeEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  timeEntry?: {
    id: string;
    start_time: string;
    end_time: string | null;
    hours_worked: number | null;
    description: string | null;
    project_id: string;
    employee_id: string;
  } | null;
}

export const TimeEntryDialog = ({ open, onOpenChange, timeEntry }: TimeEntryDialogProps) => {
  const { t } = useGlobalPreferences();
  const { form } = useTimeEntryForm({ timeEntry, open });
  const { projects, employees } = useTimeEntryData(open);
  
  const handleSuccess = () => {
    onOpenChange(false);
    form.reset();
  };

  const { handleSubmit, isSubmitting } = useTimeEntryMutations({
    timeEntry,
    onSuccess: handleSuccess,
  });

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {timeEntry ? t('edit_time_entry') : t('new_time_entry')}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <TimeEntryFormFields 
              form={form} 
              projects={projects} 
              employees={employees} 
            />
            
            <TimeEntryTimeFields form={form} />
            
            <TimeEntryDescriptionField form={form} />

            <TimeEntryDialogActions 
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
              isEditing={!!timeEntry}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
