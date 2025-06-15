
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
    <Card className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
              <div className="p-1.5 sm:p-2 rounded-xl bg-purple-50 dark:bg-purple-900/30 group-hover:scale-110 transition-transform duration-300">
                <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm sm:text-base">{t('expenses_by_category')}</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
              {t('expenses_distribution_by_category')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percent }) => {
                const isMobile = window.innerWidth < 640;
                return isMobile ? `${(percent * 100).toFixed(0)}%` : `${getCategoryTranslation(category)} ${(percent * 100).toFixed(0)}%`;
              }}
              outerRadius="70%"
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
        <div className="mt-3 sm:mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '75%' }}></div>
        </div>
      </CardContent>
    </Card>
  );
};
