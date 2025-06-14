
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";

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
    <Card>
      <CardHeader>
        <CardTitle>{t('expenses_by_project')}</CardTitle>
        <CardDescription>
          {t('total_expenses_by_project')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
  );
};
