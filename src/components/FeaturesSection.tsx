
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Calendar,
      title: t('projects'),
      description: "Planifiez et suivez vos projets de construction du début à la fin"
    },
    {
      icon: Users,
      title: t('employees'),
      description: "Gérez votre équipe et suivez les heures de travail"
    },
    {
      icon: FileText,
      title: t('expenses'),
      description: "Contrôlez les coûts et optimisez votre budget"
    },
    {
      icon: Clock,
      title: t('time_entries'),
      description: "Suivez le temps passé sur chaque tâche et projet"
    }
  ];

  return (
    <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {t('features')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvrez tous les outils dont vous avez besoin pour gérer efficacement vos projets de construction
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card border-border/20 hover:border-primary/30 transition-all duration-300 h-full group hover:shadow-xl hover:shadow-primary/10">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
