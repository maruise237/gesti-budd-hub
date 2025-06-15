
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardPreview } from "./DashboardPreview";

export const HeroSection = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden modern-gradient">
      {/* Fond avec effet de grille */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzNfMjkpIj4KPHBhdGggZD0iTTAgMUg0MFYwSDBWMVoiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8zXzI5KSIvPgo8cGF0aCBkPSJNMSAwVjQwSDBWMEgxWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzNfMjkpIi8+CjwvZz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhcl8zXzI5IiB4MT0iMCIgeTE9IjAuNSIgeDI9IjQwIiB5Mj0iMC41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRkZGRkYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIgc3RvcC1vcGFjaXR5PSIwLjAyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8zXzI5IiB4MT0iMC41IiB5MT0iMCIgeDI9IjAuNSIgeTI9IjQwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRkZGRkYiIHN0b3Atb3BhY2l0eT0iMC4xIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGRkZGRiIgc3RvcC1vcGFjaXR5PSIwLjAyIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfM18yOSI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K')] opacity-20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Contenu textuel */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
              Un tableau de bord 
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"> CRM </span>
              pour les équipes d'ingénierie
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Gravida convallis orci vehicula non. Ultrices tempor sit ut cursus mi. Aliquam sed amet vitae leo ac porttitor consectetur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link to={user ? "/dashboard" : "/auth"} className="w-full sm:w-auto">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto px-8 py-4 text-lg rounded-full">
                  Get a demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-4 text-lg rounded-full border-border/50 hover:border-primary/50">
                <Play className="mr-2 h-5 w-5" />
                View pricing
              </Button>
            </div>
          </div>

          {/* Aperçu du dashboard */}
          <div className="relative lg:ml-8">
            <div className="float-animation">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
