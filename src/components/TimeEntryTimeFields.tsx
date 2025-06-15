
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

interface TimeEntryTimeFieldsProps {
  form: UseFormReturn<any>;
}

export const TimeEntryTimeFields = ({ form }: TimeEntryTimeFieldsProps) => {
  const { t } = useGlobalPreferences();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="start_time"
          rules={{ required: t('start_time_required') }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('start_time')} *</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('end_time')}</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="hours_worked"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('hours_worked')}</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.25"
                min="0"
                placeholder={t('hours_example')}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
