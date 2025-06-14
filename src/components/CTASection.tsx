
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const CTASection = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-orange-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Prêt à transformer votre gestion de projets ?
        </h2>
        <p className="text-lg sm:text-xl text-orange-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          Rejoignez des milliers d'entreprises qui font confiance à Gestibud pour gérer leurs projets de construction.
        </p>
        <Link to={user ? "/dashboard" : "/auth"}>
          <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-50 w-full sm:w-auto">
            {t('get_started')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
