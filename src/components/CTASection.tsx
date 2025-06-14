
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre gestion BTP ?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Rejoignez les 500+ entreprises qui ont déjà optimisé leur productivité avec GestiBuld.
            Commencez votre essai gratuit dès aujourd'hui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-50 text-lg px-8 py-6 rounded-xl font-semibold"
              onClick={() => navigate("/auth")}
            >
              Démarrer l'essai gratuit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-6 rounded-xl"
              onClick={() => navigate("/auth")}
            >
              Planifier une démo
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Configuration en 5 minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Migration de données incluse</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Formation et support français</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
