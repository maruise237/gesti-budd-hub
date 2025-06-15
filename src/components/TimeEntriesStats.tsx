
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeEntriesStatsCards } from "./TimeEntriesStatsCards";
import { TimeEntriesCharts } from "./TimeEntriesCharts";
import { useTimeEntriesStats } from "@/hooks/useTimeEntriesStats";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, BarChart3 } from "lucide-react";

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

export const Time EntriesStats = ({ timeEntries }: TimeEntriesStatsProps) => {
  const { t } = useTranslation();
  const stats = useTimeEntriesStats(timeEntries);

  if (timeEntries.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Aucune donnée disponible
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Aucune donnée disponible pour les statistiques
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header avec style moderne */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6 animate-fade-in">
        <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg animate-pulse-glow w-fit">
          <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Statistiques
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Analyse détaillée de l'activité et performance
          </p>
        </div>
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
