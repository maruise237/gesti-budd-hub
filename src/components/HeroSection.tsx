
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link to={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">
              {t('get_started')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            {t('learn_more')}
          </Button>
        </div>
      </div>
    </section>
  );
};
