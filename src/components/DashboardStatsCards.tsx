
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
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      change: "+12%",
      changeColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Équipe",
      value: `${stats.employees}`,
      subtitle: "Membres actifs",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      change: "+8%",
      changeColor: "text-green-600 dark:text-green-400"
    },
    {
      title: "Matériaux",
      value: `${stats.materials}`,
      subtitle: "En stock",
      icon: Package,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      change: "-2%",
      changeColor: "text-red-500 dark:text-red-400"
    },
    {
      title: "Dépenses",
      value: formatCurrency(stats.totalExpenses),
      subtitle: "Ce mois",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      change: `+${stats.monthlyGrowth}%`,
      changeColor: "text-green-600 dark:text-green-400"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={index} 
            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-300`}>
                  <Icon className={`h-6 w-6 ${stat.iconColor} transition-colors duration-300`} />
                </div>
                <div className={`text-sm font-medium ${stat.changeColor} flex items-center transition-colors duration-300`}>
                  {stat.change}
                </div>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">{stat.title}</h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:scale-105 transition-all duration-200">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{stat.subtitle}</p>
              </div>
              
              {/* Progress bar animation */}
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 transition-colors duration-300">
                <div 
                  className={`bg-gradient-to-r ${stat.color} dark:from-${stat.color.split('-')[1]}-400 dark:to-${stat.color.split('-')[3]}-500 h-1.5 rounded-full transition-all duration-1000 ease-out`}
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
