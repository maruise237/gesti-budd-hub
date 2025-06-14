
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">GB</span>
          </div>
          <span className="text-xl font-bold text-gray-900">GestiBuld</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">
            Fonctionnalités
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-orange-600 transition-colors">
            Tarifs
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-orange-600 transition-colors">
            Témoignages
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-orange-600"
            onClick={() => navigate("/auth")}
          >
            Connexion
          </Button>
          <Button 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            onClick={() => navigate("/auth")}
          >
            Essai gratuit
          </Button>
        </div>
      </div>
    </header>
  );
};
