
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";

interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

interface CategoryPieChartProps {
  data: CategoryData[];
  colors: string[];
  chartConfig: any;
}

export const CategoryPieChart = ({ data, colors, chartConfig }: CategoryPieChartProps) => {
  const { formatCurrency } = useCurrency();
  const { t } = useTranslation();

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
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percent }) => `${getCategoryTranslation(category)} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="amount"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
  );
};
