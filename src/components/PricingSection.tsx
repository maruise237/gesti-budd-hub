
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

// Taux de change par rapport à l'EUR (base)
const EXCHANGE_RATES: { [key: string]: number } = {
  'EUR': 1,
  'USD': 1.08,
  'GBP': 0.84,
  'CAD': 1.48,
  'CHF': 0.95,
  'XOF': 655.96,
  'XAF': 655.96,
  'MAD': 10.87,
  'DZD': 144.82,
  'TND': 3.17,
  'EGP': 53.65,
  'ZAR': 19.84,
  'NGN': 1680.50,
  'GHS': 15.20,
  'KES': 129.50,
  'UGX': 3865.00,
  'TZS': 2580.00,
  'RWF': 1380.00,
  'ETB': 129.80,
  'MZN': 69.15,
  'BWP': 14.25,
  'SZL': 19.84,
  'LSL': 19.84,
  'NAD': 19.84,
  'AOA': 920.00,
  'MWK': 1735.00,
  'ZMW': 27.50,
  'ZWL': 322.00,
  'MGA': 4850.00,
  'MUR': 48.20,
  'SCR': 14.85,
  'KMF': 491.97,
  'DJF': 177.72,
  'SOS': 571.30,
  'ERN': 15.00,
  'SLL': 22696.00,
  'GMD': 71.50,
  'GNF': 8625.00,
  'LRD': 193.50,
  'CVE': 110.27,
  'STN': 24.50,
  'SHP': 0.84
};

export const PricingSection = () => {
  const { t, formatCurrency, currency } = useGlobalPreferences();

  // Fonction pour convertir les prix selon la devise
  const convertPrice = (basePrice: number): number => {
    const rate = EXCHANGE_RATES[currency] || 1;
    return Math.round(basePrice * rate);
  };

  const plans = [
    {
      name: "Starter",
      basePrice: 29,
      description: t('starter_plan_description') || "Parfait pour les petites équipes",
      features: [
        t('up_to_5_projects') || "Jusqu'à 5 projets",
        t('basic_employee_management') || "Gestion de base des employés",
        t('expense_tracking') || "Suivi des dépenses",
        t('email_support') || "Support par email"
      ]
    },
    {
      name: "Professional",
      basePrice: 79,
      description: t('professional_plan_description') || "Pour les entreprises en croissance",
      popular: true,
      features: [
        t('unlimited_projects') || "Projets illimités",
        t('advanced_employee_management') || "Gestion avancée des employés",
        t('detailed_reports') || "Rapports détaillés",
        t('api_integrations') || "Intégrations API",
        t('priority_support') || "Support prioritaire"
      ]
    },
    {
      name: "Enterprise",
      basePrice: 149,
      description: t('enterprise_plan_description') || "Pour les grandes organisations",
      features: [
        t('all_pro_features') || "Toutes les fonctionnalités Pro",
        t('advanced_security') || "Sécurité avancée",
        t('dedicated_support') || "Support dédié",
        t('custom_training') || "Formation personnalisée",
        t('guaranteed_sla') || "SLA garanti"
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
            {t('pricing_subtitle') || "Choisissez le plan qui correspond le mieux à vos besoins"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative h-full ${plan.popular ? 'border-orange-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-xs sm:text-sm">
                  {t('popular') || "Populaire"}
                </Badge>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 break-words">
                  {formatCurrency(convertPrice(plan.basePrice))}
                  <span className="text-xs sm:text-sm text-gray-500 font-normal">
                    /{t('month') || 'mois'}
                  </span>
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
