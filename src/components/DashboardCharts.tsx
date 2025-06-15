
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface DashboardStats {
  projects: number;
  employees: number;
  materials: number;
  activeProjects: number;
  completedProjects: number;
  totalExpenses: number;
  monthlyGrowth: number;
}

interface DashboardChartsProps {
  stats: DashboardStats;
}

export const DashboardCharts = ({ stats }: DashboardChartsProps) => {
  // Mock data for demonstration
  const performanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Fév', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Avr', value: 4500 },
    { name: 'Mai', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
    { name: 'Aoû', value: 6500 },
    { name: 'Sep', value: 8000 },
    { name: 'Oct', value: 7500 },
    { name: 'Nov', value: 9000 },
    { name: 'Déc', value: 8500 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#8B5CF6' },
    { name: 'Mobile', value: 35, color: '#F97316' },
    { name: 'Tablet', value: 20, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">Performance</CardTitle>
              <CardDescription className="text-gray-600">Évolution des projets mensuels</CardDescription>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Année</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6B7280' }}
              />
              <YAxis hide />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8B5CF6"
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={{ r: 4, strokeWidth: 2, fill: '#8B5CF6' }}
                activeDot={{ r: 6, strokeWidth: 0, fill: '#8B5CF6' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Device Distribution */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-gray-800">Répartition par Type</CardTitle>
          <CardDescription className="text-gray-600">Distribution des projets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="60%" height={120}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3 flex-1">
              {deviceData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
