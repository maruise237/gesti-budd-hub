
import { TimeEntriesFilters } from "./TimeEntriesFilters";
import { TimeEntriesList } from "./TimeEntriesList";
import { EmptyTimeEntriesState } from "./EmptyTimeEntriesState";
import { useTimeEntriesFilters } from "@/hooks/useTimeEntriesFilters";

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

interface TimeEntriesTabContentProps {
  timeEntries: TimeEntry[] | undefined;
  projects: Project[] | undefined;
  employees: Employee[] | undefined;
  onEditEntry: (entry: TimeEntry) => void;
  onDeleteEntry: (entryId: string) => void;
  onStopTimer: (entryId: string) => void;
  onCreateEntry: () => void;
  isStoppingTimer: boolean;
}

export const TimeEntriesTabContent = ({
  timeEntries,
  projects,
  employees,
  onEditEntry,
  onDeleteEntry,
  onStopTimer,
  onCreateEntry,
  isStoppingTimer,
}: TimeEntriesTabContentProps) => {
  const {
    searchTerm,
    setSearchTerm,
    selectedProject,
    setSelectedProject,
    selectedEmployee,
    setSelectedEmployee,
    selectedStatus,
    setSelectedStatus,
    filteredTimeEntries,
    activeFiltersCount,
    clearAllFilters,
  } = useTimeEntriesFilters(timeEntries || []);

  return (
    <div className="space-y-6">
      <TimeEntriesFilters
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        selectedProject={selectedProject}
        onProjectChange={setSelectedProject}
        selectedEmployee={selectedEmployee}
        onEmployeeChange={setSelectedEmployee}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        projects={projects || []}
        employees={employees || []}
        onClearFilters={clearAllFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {filteredTimeEntries && filteredTimeEntries.length > 0 ? (
        <TimeEntriesList
          timeEntries={filteredTimeEntries}
          onEditEntry={onEditEntry}
          onDeleteEntry={onDeleteEntry}
          onStopTimer={onStopTimer}
          isStoppingTimer={isStoppingTimer}
        />
      ) : timeEntries && timeEntries.length > 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Aucune entrée ne correspond à vos critères de recherche.
          </p>
        </div>
      ) : (
        <EmptyTimeEntriesState onCreateEntry={onCreateEntry} />
      )}
    </div>
  );
};
