
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
    <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('pricing')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choisissez le plan qui correspond le mieux à vos besoins
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative h-full ${plan.popular ? 'border-orange-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-xs sm:text-sm">
                  Populaire
                </Badge>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 break-words">
                  {formatCurrency(plan.price)}
                  <span className="text-xs sm:text-sm text-gray-500 font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 sm:space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button 
                  className={`w-full text-sm sm:text-base ${plan.popular ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
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
