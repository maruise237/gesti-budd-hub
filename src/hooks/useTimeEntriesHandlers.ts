
import { useTimeEntriesMutations } from "./useTimeEntriesMutations";
import { useTimeEntriesDialog } from "./useTimeEntriesDialog";

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

export const useTimeEntriesHandlers = (timeEntries: TimeEntry[] | undefined) => {
  const { deleteEntryMutation, stopTimerMutation } = useTimeEntriesMutations(timeEntries);
  const { 
    isDialogOpen, 
    editingEntry, 
    handleEditEntry, 
    handleOpenDialog, 
    handleCloseDialog 
  } = useTimeEntriesDialog();

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette entrée ?")) {
      deleteEntryMutation.mutate(entryId);
    }
  };

  const handleStopTimer = (entryId: string) => {
    stopTimerMutation.mutate(entryId);
  };

  return {
    // Dialog state
    isDialogOpen,
    editingEntry,
    handleEditEntry,
    handleOpenDialog,
    handleCloseDialog,
    
    // Entry actions
    handleDeleteEntry,
    handleStopTimer,
    
    // Loading states
    isStoppingTimer: stopTimerMutation.isPending,
  };
};
