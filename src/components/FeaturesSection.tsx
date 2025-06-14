
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, FileText, Clock } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Gestion d'équipe intelligente",
      description: "Pointage géolocalisé, calcul automatique des paies, planning optimisé et suivi des compétences en temps réel."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Planification de chantiers",
      description: "Diagrammes de Gantt interactifs, gestion des dépendances et optimisation automatique des ressources."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Suivi matériel et stocks",
      description: "Inventaire centralisé, affectation dynamique, maintenance préventive et alertes de stock automatiques."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Comptabilité temps réel",
      description: "Suivi budgétaire instantané, facturation automatique et rapports financiers personnalisables."
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont vous avez besoin pour gérer vos chantiers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une solution complète qui s'adapte à votre métier et grandit avec votre entreprise
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
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
