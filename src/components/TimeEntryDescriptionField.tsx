
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

interface TimeEntryDescriptionFieldProps {
  form: UseFormReturn<any>;
}

export const TimeEntryDescriptionField = ({ form }: TimeEntryDescriptionFieldProps) => {
  const { t } = useGlobalPreferences();

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('description')}</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={t('work_description_placeholder')} 
              rows={3}
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
