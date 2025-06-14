
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface TimeEntryTimeFieldsProps {
  form: UseFormReturn<any>;
}

export const TimeEntryTimeFields = ({ form }: TimeEntryTimeFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="start_time"
          rules={{ required: "L'heure de début est requise" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heure de début *</FormLabel>
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
              <FormLabel>Heure de fin</FormLabel>
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
            <FormLabel>Heures travaillées</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                step="0.25"
                min="0"
                placeholder="Ex: 8.5"
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
