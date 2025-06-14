
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeEntriesStatsCards } from "./TimeEntriesStatsCards";
import { TimeEntriesCharts } from "./TimeEntriesCharts";
import { useTimeEntriesStats } from "@/hooks/useTimeEntriesStats";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp } from "lucide-react";

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

interface TimeEntriesStatsProps {
  timeEntries: TimeEntry[];
}

export const TimeEntriesStats = ({ timeEntries }: TimeEntriesStatsProps) => {
  const { t } = useTranslation();
  const stats = useTimeEntriesStats(timeEntries);

  if (timeEntries.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Aucune donnée disponible pour les statistiques
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <TrendingUp className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Statistiques</h2>
      </div>

      <TimeEntriesStatsCards
        totalEntries={stats.totalEntries}
        completedEntries={stats.completedEntries}
        inProgressEntries={stats.inProgressEntries}
        totalHours={stats.totalHours}
        averageHoursPerEntry={stats.averageHoursPerEntry}
      />

      {stats.projectStats.length > 0 && (
        <TimeEntriesCharts
          projectStats={stats.projectStats}
          employeeStats={stats.employeeStats}
          dailyStats={stats.dailyStats}
        />
      )}
    </div>
  );
};
