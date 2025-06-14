
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
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
  const { formatCurrency } = useCurrency();
  const { t } = useTranslation();

  // Données par catégorie
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.category === expense.category);
    if (existing) {
      existing.amount += expense.amount;
      existing.count += 1;
    } else {
      acc.push({
        category: expense.category,
        amount: expense.amount,
        count: 1
      });
    }
    return acc;
  }, [] as { category: string; amount: number; count: number }[]);

  // Données par projet
  const projectData = expenses.reduce((acc, expense) => {
    const projectName = expense.project_id 
      ? projects.find(p => p.id === expense.project_id)?.name || t('unknown_project')
      : t('no_project');
    
    const existing = acc.find(item => item.project === projectName);
    if (existing) {
      existing.amount += expense.amount;
      existing.count += 1;
    } else {
      acc.push({
        project: projectName,
        amount: expense.amount,
        count: 1
      });
    }
    return acc;
  }, [] as { project: string; amount: number; count: number }[]);

  // Données par mois
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleDateString(
      t('currentLanguage') === 'fr' ? 'fr-FR' : 'en-US', 
      { year: 'numeric', month: 'short' }
    );
    
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.amount += expense.amount;
      existing.count += 1;
    } else {
      acc.push({
        month,
        amount: expense.amount,
        count: 1
      });
    }
    return acc;
  }, [] as { month: string; amount: number; count: number }[])
  .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  const chartConfig = {
    amount: {
      label: t('amount'),
    },
    count: {
      label: t('count_label'),
    },
  };

  const getCategoryTranslation = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      "Matériaux": "materials_category",
      "Main-d'œuvre": "labor_category",
      "Transport": "transport_category",
      "Équipement": "equipment_category",
      "Permis": "permits_category",
      "Assurance": "insurance_category",
      "Autre": "other_category"
    };
    return t(categoryMap[category]) || category;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique par catégorie (Camembert) */}
      <Card>
        <CardHeader>
          <CardTitle>{t('expenses_by_category')}</CardTitle>
          <CardDescription>
            {t('expenses_distribution_by_category')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${getCategoryTranslation(category)} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [formatCurrency(value), t('amount')]}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Graphique par projet (Barres) */}
      <Card>
        <CardHeader>
          <CardTitle>{t('expenses_by_project')}</CardTitle>
          <CardDescription>
            {t('total_expenses_by_project')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={projectData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="project" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [formatCurrency(value), t('amount')]}
              />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Évolution mensuelle (Ligne) */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{t('monthly_expenses_evolution')}</CardTitle>
          <CardDescription>
            {t('expenses_trend_over_time')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [formatCurrency(value), t('amount')]}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
