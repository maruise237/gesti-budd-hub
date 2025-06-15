
import { Card, CardContent } from "@/components/ui/card";
import { Users, FolderOpen, Package, TrendingUp } from "lucide-react";
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

interface DashboardStatsCardsProps {
  stats: DashboardStats;
}

export const DashboardStatsCards = ({ stats }: DashboardStatsCardsProps) => {
  const { formatCurrency } = useCurrency();

  const statCards = [
    {
      title: "Projets",
      value: `${stats.projects}`,
      subtitle: `${stats.activeProjects} actifs`,
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      change: "+12%",
      changeColor: "text-green-600"
    },
    {
      title: "Équipe",
      value: `${stats.employees}`,
      subtitle: "Membres actifs",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      change: "+8%",
      changeColor: "text-green-600"
    },
    {
      title: "Matériaux",
      value: `${stats.materials}`,
      subtitle: "En stock",
      icon: Package,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      change: "-2%",
      changeColor: "text-red-500"
    },
    {
      title: "Dépenses",
      value: formatCurrency(stats.totalExpenses),
      subtitle: "Ce mois",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      change: `+${stats.monthlyGrowth}%`,
      changeColor: "text-green-600"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <div className={`text-sm font-medium ${stat.changeColor} flex items-center`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <div className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-200">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              
              {/* Progress bar animation */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`bg-gradient-to-r ${stat.color} h-1.5 rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${Math.min(85, (index + 1) * 20)}%`,
                    animationDelay: `${(index * 200) + 500}ms`
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
