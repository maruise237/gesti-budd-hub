
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";

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
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{t('monthly_expenses_evolution')}</CardTitle>
        <CardDescription>
          {t('expenses_trend_over_time')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
  );
};
