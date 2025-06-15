
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, BarChart3, Clock, Users } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";

interface DashboardStats {
  projects: number;
  employees: number;
  materials: number;
  activeProjects: number;
  completedProjects: number;
  totalExpenses: number;
  monthlyGrowth: number;
}

interface DashboardMetricsProps {
  stats: DashboardStats;
}

export const DashboardMetrics = ({ stats }: DashboardMetricsProps) => {
  const { formatCurrency } = useCurrency();

  const metrics = [
    {
      icon: Users,
      label: "Équipe",
      value: stats.employees.toLocaleString(),
      change: "+25%",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: BarChart3,
      label: "Projets",
      value: stats.projects.toLocaleString(),
      change: "+47%",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Clock,
      label: "Taux de rebond",
      value: "26.3%",
      change: "-20%",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Eye,
      label: "Durée session",
      value: "2m 18s",
      change: "+13%",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const dailyOverview = [
    { label: "Aujourd'hui", value: "5,461", color: "text-blue-600", progress: 75 },
    { label: "Attendu", value: "8,085", color: "text-gray-600", progress: 60 },
    { label: "Aujourd'hui", value: "140", color: "text-orange-600", progress: 40 },
    { label: "Attendu", value: "120", color: "text-gray-600", progress: 85 },
  ];

  const trafficData = [
    { channel: "Direct", traffic: "23.28%", color: "bg-blue-500" },
    { channel: "Direct", traffic: "23.28%", color: "bg-orange-500" },
    { channel: "Direct", traffic: "23.28%", color: "bg-green-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card 
              key={index}
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <span className="text-xs text-gray-600">{metric.label}</span>
                </div>
                <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-xs text-green-600 font-medium">{metric.change}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Daily Overview */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">Aperçu quotidien</CardTitle>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {dailyOverview.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className={`text-2xl font-bold ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                      item.color.includes('blue') ? 'bg-blue-500' :
                      item.color.includes('orange') ? 'bg-orange-500' : 'bg-gray-400'
                    }`}
                    style={{ 
                      width: `${item.progress}%`,
                      animationDelay: `${index * 200}ms`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic by Channel */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">Trafic par Canal</CardTitle>
          <CardDescription className="text-gray-600">Top régions & sessions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {trafficData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-600">{item.channel}</span>
                <div className="flex-1 max-w-[100px]">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: item.traffic,
                        animationDelay: `${index * 150}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-800">{item.traffic}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
