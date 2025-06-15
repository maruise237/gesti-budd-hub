
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, Area, AreaChart } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";
import { TrendingUp, Calendar } from "lucide-react";

interface MonthlyData {
  month: string;
  amount: number;
  count: number;
}

interface MonthlyExpenseLineChartProps {
  data: MonthlyData[];
  chartConfig: any;
}

export const MonthlyExpenseLineChart = ({ data, chartConfig }: MonthlyExpenseLineChartProps) => {
  const { formatCurrency } = useCurrency();
  const { t } = useTranslation();

  return (
    <Card className="group lg:col-span-2 bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-green-50 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span>{t('monthly_expenses_evolution')}</span>
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {t('expenses_trend_over_time')}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Mensuel</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ChartContainer config={chartConfig} className="h-[300px]">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="monthlyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value: number) => [formatCurrency(value), t('amount')]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#monthlyGradient)"
              dot={{ r: 4, strokeWidth: 2, fill: '#10B981' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#10B981' }}
            />
          </AreaChart>
        </ChartContainer>
        
        {/* Progress indicator */}
        <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
          <div className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-1000 ease-out animate-progress" style={{ width: '85%' }}></div>
        </div>
      </CardContent>
    </Card>
  );
};
