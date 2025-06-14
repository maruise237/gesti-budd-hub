
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useCurrency } from "@/hooks/useCurrency";

export const PricingSection = () => {
  const { t } = useTranslation();
  const { formatCurrency } = useCurrency();

  const plans = [
    {
      name: "Starter",
      price: 29,
      description: "Parfait pour les petites équipes",
      features: [
        "Jusqu'à 5 projets",
        "Gestion de base des employés",
        "Suivi des dépenses",
        "Support par email"
      ]
    },
    {
      name: "Professional",
      price: 79,
      description: "Pour les entreprises en croissance",
      popular: true,
      features: [
        "Projets illimités",
        "Gestion avancée des employés",
        "Rapports détaillés",
        "Intégrations API",
        "Support prioritaire"
      ]
    },
    {
      name: "Enterprise",
      price: 149,
      description: "Pour les grandes organisations",
      features: [
        "Toutes les fonctionnalités Pro",
        "Sécurité avancée",
        "Support dédié",
        "Formation personnalisée",
        "SLA garanti"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('pricing')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-orange-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500">
                  Populaire
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-3xl font-bold text-orange-600">
                  {formatCurrency(plan.price)}
                  <span className="text-sm text-gray-500 font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {t('get_started')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
