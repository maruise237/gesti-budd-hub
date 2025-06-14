
import { useState } from "react";

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

export const useTimeEntriesDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  const handleEditEntry = (entry: TimeEntry) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  return {
    isDialogOpen,
    editingEntry,
    handleEditEntry,
    handleOpenDialog,
    handleCloseDialog,
  };
};
