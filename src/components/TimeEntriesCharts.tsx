
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ProjectStat {
  name: string;
  totalEntries: number;
  totalHours: number;
  completedEntries: number;
}

interface EmployeeStat {
  name: string;
  totalEntries: number;
  totalHours: number;
}

interface DailyStat {
  date: string;
  entries: number;
  hours: number;
}

interface TimeEntriesChartsProps {
  projectStats: ProjectStat[];
  employeeStats: EmployeeStat[];
  dailyStats: DailyStat[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const chartConfig = {
  hours: {
    label: "Heures",
  },
  entries: {
    label: "Entrées",
  },
};

export const TimeEntriesCharts = ({
  projectStats,
  employeeStats,
  dailyStats,
}: TimeEntriesChartsProps) => {
  const topProjects = projectStats
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 5);

  const topEmployees = employeeStats
    .sort((a, b) => b.totalHours - a.totalHours)
    .slice(0, 5);

  const recentDailyStats = dailyStats.slice(-7);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Heures par projet</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProjects}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalHours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Répartition par employé</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topEmployees}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}h`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="totalHours"
                >
                  {topEmployees.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Activité des 7 derniers jours</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentDailyStats}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                />
                <Bar dataKey="hours" fill="#82ca9d" name="Heures" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
