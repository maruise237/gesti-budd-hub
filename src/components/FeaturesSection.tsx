
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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les outils dont vous avez besoin pour gérer efficacement vos projets de construction
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
