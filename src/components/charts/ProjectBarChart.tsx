
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";
import { BarChart3 } from "lucide-react";

interface ProjectData {
  project: string;
  amount: number;
  count: number;
}

interface ProjectBarChartProps {
  data: ProjectData[];
  chartConfig: any;
}

export const ProjectBarChart = ({ data, chartConfig }: ProjectBarChartProps) => {
  const { formatCurrency } = useCurrency();
  const { t } = useTranslation();

  return (
    <Card className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
              <div className="p-1.5 sm:p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm sm:text-base">{t('expenses_by_project')}</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
              {t('total_expenses_by_project')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
          <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#1E40AF" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="barGradientDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="project" 
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fontSize: 10, fill: 'currentColor' }}
              axisLine={false}
              tickLine={false}
              className="text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              tick={{ fontSize: 10, fill: 'currentColor' }}
              axisLine={false}
              tickLine={false}
              width={40}
              className="text-gray-600 dark:text-gray-400"
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value: number) => [formatCurrency(value), t('amount')]}
            />
            <Bar 
              dataKey="amount" 
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
              className="hover:brightness-110 transition-all duration-200 dark:fill-[url(#barGradientDark)]"
            />
          </BarChart>
        </ChartContainer>
        
        {/* Progress indicator */}
        <div className="mt-3 sm:mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '65%' }}></div>
        </div>
      </CardContent>
    </Card>
  );
};
