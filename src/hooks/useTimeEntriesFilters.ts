
import { useState, useMemo } from "react";

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

export const useTimeEntriesFilters = (timeEntries: TimeEntry[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTimeEntries = useMemo(() => {
    return timeEntries.filter((entry) => {
      // Filtre par terme de recherche
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesDescription = entry.description?.toLowerCase().includes(searchLower);
        const matchesProject = entry.projects?.name.toLowerCase().includes(searchLower);
        const matchesEmployee = entry.employees 
          ? `${entry.employees.first_name} ${entry.employees.last_name}`.toLowerCase().includes(searchLower)
          : false;
        
        if (!matchesDescription && !matchesProject && !matchesEmployee) {
          return false;
        }
      }

      // Filtre par projet
      if (selectedProject && selectedProject !== "all" && entry.project_id !== selectedProject) {
        return false;
      }

      // Filtre par employé
      if (selectedEmployee && selectedEmployee !== "all" && entry.employee_id !== selectedEmployee) {
        return false;
      }

      // Filtre par statut
      if (selectedStatus && selectedStatus !== "all") {
        const isCompleted = entry.end_time !== null;
        if (selectedStatus === "completed" && !isCompleted) {
          return false;
        }
        if (selectedStatus === "in_progress" && isCompleted) {
          return false;
        }
      }

      return true;
    });
  }, [timeEntries, searchTerm, selectedProject, selectedEmployee, selectedStatus]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (selectedProject && selectedProject !== "all") count++;
    if (selectedEmployee && selectedEmployee !== "all") count++;
    if (selectedStatus && selectedStatus !== "all") count++;
    return count;
  }, [searchTerm, selectedProject, selectedEmployee, selectedStatus]);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedProject("all");
    setSelectedEmployee("all");
    setSelectedStatus("all");
  };

  return {
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
  };
};
