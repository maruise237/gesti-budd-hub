
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, PlayCircle, BarChart3 } from "lucide-react";

interface TimeEntriesStatsCardsProps {
  totalEntries: number;
  completedEntries: number;
  inProgressEntries: number;
  totalHours: number;
  averageHoursPerEntry: number;
}

export const TimeEntriesStatsCards = ({
  totalEntries,
  completedEntries,
  inProgressEntries,
  totalHours,
  averageHoursPerEntry,
}: TimeEntriesStatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total des entrées</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEntries}</div>
          <p className="text-xs text-muted-foreground">
            Toutes les entrées de temps
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Terminées</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedEntries}</div>
          <p className="text-xs text-muted-foreground">
            {totalEntries > 0 ? Math.round((completedEntries / totalEntries) * 100) : 0}% du total
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">En cours</CardTitle>
          <PlayCircle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressEntries}</div>
          <p className="text-xs text-muted-foreground">
            Timers actifs
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Heures totales</CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHours}h</div>
          <p className="text-xs text-muted-foreground">
            Moyenne: {averageHoursPerEntry}h par entrée
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
