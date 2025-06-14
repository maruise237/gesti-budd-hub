
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

export const useExpenseChartData = (expenses: Expense[], projects: Project[]) => {
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

  return {
    categoryData,
    projectData,
    monthlyData
  };
};
