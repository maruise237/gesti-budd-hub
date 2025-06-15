
import { useTranslation } from "@/hooks/useTranslation";
import { useCurrency } from "@/hooks/useCurrency";

export const StatsSection = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();

  const stats = [
    { label: t('projects_managed'), value: '500+' },
    { label: t('hours_tracked'), value: '10,000+' },
    { label: t('satisfied_clients'), value: '98%' },
    { label: t('cost_savings'), value: formatCurrency(250000) },
  ];

  return (
    <section className="py-12 sm:py-16 bg-card/30 backdrop-blur-sm border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2 break-words">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
