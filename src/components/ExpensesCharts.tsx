
import { CategoryPieChart } from "./charts/CategoryPieChart";
import { ProjectBarChart } from "./charts/ProjectBarChart";
import { MonthlyExpenseLineChart } from "./charts/MonthlyExpenseLineChart";
import { useExpenseChartData } from "@/hooks/useExpenseChartData";
import { useTranslation } from "@/hooks/useTranslation";

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CategoryPieChart 
        data={categoryData} 
        colors={COLORS} 
        chartConfig={chartConfig} 
      />
      <ProjectBarChart 
        data={projectData} 
        chartConfig={chartConfig} 
      />
      <MonthlyExpenseLineChart 
        data={monthlyData} 
        chartConfig={chartConfig} 
      />
    </div>
  );
};
