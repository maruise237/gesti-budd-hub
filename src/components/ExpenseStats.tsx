
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { useCurrency } from "@/hooks/useCurrency";
import { useTranslation } from "@/hooks/useTranslation";

interface ExpenseStatsProps {
  totalExpenses: number;
  expenseCount: number;
}

export const ExpenseStats = ({ totalExpenses, expenseCount }: ExpenseStatsProps) => {
  const { formatCurrency } = useCurrency();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-orange-600" />
          {t('total_expenses')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-orange-600">
          {formatCurrency(totalExpenses)}
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {t('expense_count_text', { count: expenseCount })}
        </p>
      </CardContent>
    </Card>
  );
};
