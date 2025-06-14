
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "29",
      description: "Parfait pour débuter",
      popular: false,
      features: [
        "1 chantier actif",
        "5 utilisateurs max",
        "10 GB de stockage",
        "Support par email",
        "Fonctionnalités de base",
        "Application mobile"
      ]
    },
    {
      name: "Professional",
      price: "79",
      description: "Le plus populaire",
      popular: true,
      features: [
        "5 chantiers actifs",
        "20 utilisateurs max",
        "50 GB de stockage",
        "Support prioritaire",
        "Rapports avancés",
        "Intégrations de base",
        "Gestion des stocks",
        "Paies automatisées"
      ]
    },
    {
      name: "Enterprise",
      price: "159",
      description: "Pour les grandes équipes",
      popular: false,
      features: [
        "Chantiers illimités",
        "Utilisateurs illimités",
        "200 GB de stockage",
        "Support téléphonique",
        "Accès API complet",
        "Intégrations avancées",
        "Formation incluse",
        "SLA garanti"
      ]
    },
    {
      name: "Premium",
      price: "299",
      description: "Solution sur-mesure",
      popular: false,
      features: [
        "Toutes les fonctionnalités",
        "Stockage illimité",
        "Support dédié 24/7",
        "SLA premium",
        "Formations illimitées",
        "Développements custom",
        "Onboarding personnalisé",
        "Gestionnaire de compte"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Des tarifs transparents pour chaque besoin
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Commencez gratuitement, évoluez à votre rythme
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>30 jours d'essai gratuit sur tous les plans</span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-orange-500 shadow-xl scale-105' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600">
                  Le plus populaire
                </Badge>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}€</span>
                  <span className="text-gray-600">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Commencer l'essai
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Besoin d'une solution sur-mesure ? Contactez-nous pour un devis personnalisé.
          </p>
          <Button variant="outline" size="lg" className="border-2">
            Demander un devis
          </Button>
        </div>
      </div>
    </section>
  );
};
