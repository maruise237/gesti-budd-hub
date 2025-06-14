
import { TimeEntryCard } from "./TimeEntryCard";
import { PaginationControls } from "./PaginationControls";
import { useTimeEntriesPagination } from "@/hooks/useTimeEntriesPagination";

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
  const {
    currentPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    totalItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    canGoPrevious,
    canGoNext,
  } = useTimeEntriesPagination(timeEntries, 9); // 9 items per page for a 3x3 grid

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {paginatedData.map((entry) => (
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
      
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={goToPage}
          onPreviousPage={goToPreviousPage}
          onNextPage={goToNextPage}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </div>
  );
};
