
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/hooks/useTranslation";

interface TimeEntryFormFieldsProps {
  form: UseFormReturn<any>;
  projects?: Array<{ id: string; name: string }>;
  employees?: Array<{ id: string; first_name: string; last_name: string }>;
}

export const TimeEntryFormFields = ({ form, projects, employees }: TimeEntryFormFieldsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="project_id"
        rules={{ required: t('project_required') }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('project')} *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_project')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="employee_id"
        rules={{ required: t('employee_required') }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('employee')} *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_employee')} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {employees?.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
