
import { TimeEntryDialog } from "@/components/TimeEntryDialog";
import { TimeEntriesHeader } from "@/components/TimeEntriesHeader";
import { TimeEntriesStats } from "@/components/TimeEntriesStats";
import { TimeEntriesTabContent } from "@/components/TimeEntriesTabContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface Project {
  id: string;
  name: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface TimeEntriesContentProps {
  timeEntries: TimeEntry[] | undefined;
  projects: Project[] | undefined;
  employees: Employee[] | undefined;
  isDialogOpen: boolean;
  editingEntry: TimeEntry | null;
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (entryId: string) => void;
  onStopTimer: (entryId: string) => void;
  onCreateEntry: () => void;
  onCloseDialog: () => void;
  isStoppingTimer: boolean;
}

export const TimeEntriesContent = ({
  timeEntries,
  projects,
  employees,
  isDialogOpen,
  editingEntry,
  onEditEntry,
  onDeleteEntry,
  onStopTimer,
  onCreateEntry,
  onCloseDialog,
  isStoppingTimer,
}: TimeEntriesContentProps) => {
  return (
    <div className="space-y-6">
      <TimeEntriesHeader onCreateEntry={onCreateEntry} />

      <Tabs defaultValue="entries" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entries">Entrées de temps</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries" className="space-y-6">
          <TimeEntriesTabContent
            timeEntries={timeEntries}
            projects={projects}
            employees={employees}
            onEditEntry={onEditEntry}
            onDeleteEntry={onDeleteEntry}
            onStopTimer={onStopTimer}
            onCreateEntry={onCreateEntry}
            isStoppingTimer={isStoppingTimer}
          />
        </TabsContent>
        
        <TabsContent value="stats" className="space-y-6">
          <TimeEntriesStats timeEntries={timeEntries || []} />
        </TabsContent>
      </Tabs>

      <TimeEntryDialog
        open={isDialogOpen}
        onOpenChange={onCloseDialog}
        timeEntry={editingEntry}
      />
    </div>
  );
};
