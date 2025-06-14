
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";

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
      ? projects.find(p => p.id === expense.project_id)?.name || 'Projet inconnu'
      : 'Aucun projet';
    
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
    const month = new Date(expense.date).toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short' 
    });
    
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
      label: "Montant (€)",
    },
    count: {
      label: "Nombre",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique par catégorie (Camembert) */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition par catégorie</CardTitle>
          <CardDescription>
            Distribution des dépenses par catégorie
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
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
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
                formatter={(value: number) => [`${value.toLocaleString()} €`, "Montant"]}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Graphique par projet (Barres) */}
      <Card>
        <CardHeader>
          <CardTitle>Dépenses par projet</CardTitle>
          <CardDescription>
            Montant total des dépenses par projet
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
                formatter={(value: number) => [`${value.toLocaleString()} €`, "Montant"]}
              />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Évolution mensuelle (Ligne) */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Évolution mensuelle des dépenses</CardTitle>
          <CardDescription>
            Tendance des dépenses au fil du temps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value: number) => [`${value.toLocaleString()} €`, "Montant"]}
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
