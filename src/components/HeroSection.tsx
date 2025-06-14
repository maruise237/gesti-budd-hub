
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          {t('hero_title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {t('hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={user ? "/dashboard" : "/auth"}>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              {t('get_started')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            {t('learn_more')}
          </Button>
        </div>
      </div>
    </section>
  );
};
