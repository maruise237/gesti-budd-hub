
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface TimeEntryFormData {
  start_time: string;
  end_time: string;
  hours_worked: string;
  description: string;
  project_id: string;
  employee_id: string;
}

interface TimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  hours_worked: number | null;
  description: string | null;
  project_id: string;
  employee_id: string;
}

interface UseTimeEntryFormProps {
  timeEntry?: TimeEntry | null;
  open: boolean;
}

export const useTimeEntryForm = ({ timeEntry, open }: UseTimeEntryFormProps) => {
  const form = useForm<TimeEntryFormData>({
    defaultValues: {
      start_time: "",
      end_time: "",
      hours_worked: "",
      description: "",
      project_id: "",
      employee_id: "",
    },
  });

  useEffect(() => {
    if (timeEntry) {
      const startTime = new Date(timeEntry.start_time);
      const endTime = timeEntry.end_time ? new Date(timeEntry.end_time) : null;
      
      form.reset({
        start_time: startTime.toISOString().slice(0, 16),
        end_time: endTime ? endTime.toISOString().slice(0, 16) : "",
        hours_worked: timeEntry.hours_worked?.toString() || "",
        description: timeEntry.description || "",
        project_id: timeEntry.project_id,
        employee_id: timeEntry.employee_id,
      });
    } else {
      const now = new Date();
      form.reset({
        start_time: now.toISOString().slice(0, 16),
        end_time: "",
        hours_worked: "",
        description: "",
        project_id: "",
        employee_id: "",
      });
    }
  }, [timeEntry, form, open]);

  return { form };
};
