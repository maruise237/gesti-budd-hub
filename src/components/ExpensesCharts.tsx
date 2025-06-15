
import { CategoryPieChart } from "./charts/CategoryPieChart";
import { ProjectBarChart } from "./charts/ProjectBarChart";
import { MonthlyExpenseLineChart } from "./charts/MonthlyExpenseLineChart";
import { useExpenseChartData } from "@/hooks/useExpenseChartData";
import { useTranslation } from "@/hooks/useTranslation";
import { BarChart3 } from "lucide-react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  project_id: string | null;
  receipt_url: string | null;
  created_at: string;
}

interface Project {
  id: string;
  name: string;
}

interface ExpensesChartsProps {
  expenses: Expense[];
  projects: Project[];
}

const COLORS = ['#8B5CF6', '#F97316', '#10B981', '#3B82F6', '#EF4444', '#84CC16', '#F59E0B'];

export const ExpensesCharts = ({ expenses, projects }: ExpensesChartsProps) => {
  const { t } = useTranslation();
  const { categoryData, projectData, monthlyData } = useExpenseChartData(expenses, projects);

  const chartConfig = {
    amount: {
      label: t('amount'),
    },
    count: {
      label: t('count_label'),
    },
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header avec icône */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
        <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg w-fit">
          <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Analyses Graphiques
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Visualisation des dépenses par catégorie, projet et évolution mensuelle
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <div className="col-span-1">
          <CategoryPieChart 
            data={categoryData} 
            colors={COLORS} 
            chartConfig={chartConfig} 
          />
        </div>
        <div className="col-span-1">
          <ProjectBarChart 
            data={projectData} 
            chartConfig={chartConfig} 
          />
        </div>
        <div className="col-span-1 xl:col-span-2">
          <MonthlyExpenseLineChart 
            data={monthlyData} 
            chartConfig={chartConfig} 
          />
        </div>
      </div>
    </div>
  );
};
