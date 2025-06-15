
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/hooks/useTranslation";

interface TimeEntryDescriptionFieldProps {
  form: UseFormReturn<any>;
}

export const TimeEntryDescriptionField = ({ form }: TimeEntryDescriptionFieldProps) => {
  const { t } = useTranslation();

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
