
import { TimeEntryCard } from "./TimeEntryCard";

interface TimeEntry {
  id: string;
  start_time: string;
  end_time: string | null;
  hours_worked: number | null;
  description: string | null;
  project_id: string;
  employee_id: string;
  created_at: string;
  projects: {
    name: string;
  } | null;
  employees: {
    first_name: string;
    last_name: string;
  } | null;
}

interface TimeEntriesListProps {
  timeEntries: TimeEntry[];
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (entryId: string) => void;
  onStopTimer: (entryId: string) => void;
  isStoppingTimer: boolean;
}

export const TimeEntriesList = ({ 
  timeEntries, 
  onEditEntry, 
  onDeleteEntry, 
  onStopTimer, 
  isStoppingTimer 
}: TimeEntriesListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {timeEntries.map((entry) => (
        <TimeEntryCard
          key={entry.id}
          entry={entry}
          onEdit={onEditEntry}
          onDelete={onDeleteEntry}
          onStopTimer={onStopTimer}
          isStoppingTimer={isStoppingTimer}
        />
      ))}
    </div>
  );
};
