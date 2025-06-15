
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";
import { PieChart as PieChartIcon } from "lucide-react";

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
    <Card className="group bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-purple-50 group-hover:scale-110 transition-transform duration-300">
                <PieChartIcon className="h-5 w-5 text-purple-600" />
              </div>
              <span>{t('expenses_by_category')}</span>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {t('expenses_distribution_by_category')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
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
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]}
                  className="hover:brightness-110 transition-all duration-200"
                />
              ))}
            </Pie>
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value: number) => [formatCurrency(value), t('amount')]}
            />
          </PieChart>
        </ChartContainer>
        
        {/* Progress indicator */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '75%' }}></div>
        </div>
      </CardContent>
    </Card>
  );
};
