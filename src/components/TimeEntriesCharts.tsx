
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, Users, Calendar } from "lucide-react";

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

const COLORS = ['#8B5CF6', '#F97316', '#10B981', '#3B82F6', '#EF4444', '#84CC16'];

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
      <Card className="group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-50 group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <span>Heures par projet</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProjects}>
                <defs>
                  <linearGradient id="projectGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="totalHours" 
                  fill="url(#projectGradient)"
                  radius={[4, 4, 0, 0]}
                  className="hover:brightness-110 transition-all duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Progress indicator */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '70%' }}></div>
          </div>
        </CardContent>
      </Card>

      <Card className="group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-orange-50 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <span>Répartition par employé</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex items-center justify-between">
            <ChartContainer config={chartConfig} className="h-[300px] w-[60%]">
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
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:brightness-110 transition-all duration-200"
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            
            <div className="space-y-3 flex-1">
              {topEmployees.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {item.totalHours}h
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '60%' }}></div>
          </div>
        </CardContent>
      </Card>

      <Card className="group md:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-50 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <span>Activité des 7 derniers jours</span>
            </CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Dernière semaine</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer config={chartConfig} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recentDailyStats}>
                <defs>
                  <linearGradient id="dailyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={false}
                  tickLine={false}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => new Date(value).toLocaleDateString('fr-FR')}
                />
                <Bar 
                  dataKey="hours" 
                  fill="url(#dailyGradient)" 
                  name="Heures"
                  radius={[4, 4, 0, 0]}
                  className="hover:brightness-110 transition-all duration-200"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Progress indicator */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '80%' }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
