
import { useMemo } from "react";

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

export const useTimeEntriesStats = (timeEntries: TimeEntry[]) => {
  const stats = useMemo(() => {
    const completedEntries = timeEntries.filter(entry => entry.end_time !== null);
    const inProgressEntries = timeEntries.filter(entry => entry.end_time === null);
    
    const totalHours = completedEntries.reduce((sum, entry) => {
      return sum + (entry.hours_worked || 0);
    }, 0);

    const averageHoursPerEntry = completedEntries.length > 0 
      ? totalHours / completedEntries.length 
      : 0;

    // Group by project
    const projectStats = timeEntries.reduce((acc, entry) => {
      const projectName = entry.projects?.name || "Projet inconnu";
      if (!acc[projectName]) {
        acc[projectName] = {
          name: projectName,
          totalEntries: 0,
          totalHours: 0,
          completedEntries: 0,
        };
      }
      acc[projectName].totalEntries++;
      acc[projectName].totalHours += entry.hours_worked || 0;
      if (entry.end_time) {
        acc[projectName].completedEntries++;
      }
      return acc;
    }, {} as Record<string, { name: string; totalEntries: number; totalHours: number; completedEntries: number }>);

    // Group by employee
    const employeeStats = timeEntries.reduce((acc, entry) => {
      const employeeName = entry.employees 
        ? `${entry.employees.first_name} ${entry.employees.last_name}`
        : "Employé inconnu";
      if (!acc[employeeName]) {
        acc[employeeName] = {
          name: employeeName,
          totalEntries: 0,
          totalHours: 0,
        };
      }
      acc[employeeName].totalEntries++;
      acc[employeeName].totalHours += entry.hours_worked || 0;
      return acc;
    }, {} as Record<string, { name: string; totalEntries: number; totalHours: number }>);

    // Group by date for daily stats
    const dailyStats = completedEntries.reduce((acc, entry) => {
      const date = new Date(entry.start_time).toDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          entries: 0,
          hours: 0,
        };
      }
      acc[date].entries++;
      acc[date].hours += entry.hours_worked || 0;
      return acc;
    }, {} as Record<string, { date: string; entries: number; hours: number }>);

    return {
      totalEntries: timeEntries.length,
      completedEntries: completedEntries.length,
      inProgressEntries: inProgressEntries.length,
      totalHours: Math.round(totalHours * 100) / 100,
      averageHoursPerEntry: Math.round(averageHoursPerEntry * 100) / 100,
      projectStats: Object.values(projectStats),
      employeeStats: Object.values(employeeStats),
      dailyStats: Object.values(dailyStats).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    };
  }, [timeEntries]);

  return stats;
};
