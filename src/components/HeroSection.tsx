
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Users className="w-4 h-4" />
          <span>Déjà 500+ entreprises BTP nous font confiance</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          La plateforme SaaS qui
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> révolutionne </span>
          la gestion BTP
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Gérez vos chantiers, employés, matériel et finances depuis une seule plateforme. 
          Économisez 30% de temps administratif et augmentez votre rentabilité.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-8 py-6 rounded-xl"
          >
            Commencer l'essai gratuit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-gray-50"
          >
            Voir la démo
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>30 jours d'essai gratuit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sans engagement</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Support français inclus</span>
          </div>
        </div>
      </div>
      
      {/* Hero Image Placeholder */}
      <div className="mt-16 max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl blur-3xl"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">GB</span>
                </div>
                <p className="text-gray-600 font-medium">Interface GestiBuld</p>
                <p className="text-gray-400 text-sm">Capture d'écran de la plateforme</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
