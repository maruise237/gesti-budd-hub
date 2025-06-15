
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { LanguageCurrencySelector } from "./LanguageCurrencySelector";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center min-w-0">
            <Link to="/" className="text-lg sm:text-2xl font-bold text-primary truncate">
              Gestibud
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <Link to="/#features" className="text-foreground/80 hover:text-primary transition-colors text-sm lg:text-base">
              {t('features')}
            </Link>
            <Link to="/#pricing" className="text-foreground/80 hover:text-primary transition-colors text-sm lg:text-base">
              {t('pricing')}
            </Link>
            <Link to="/#testimonials" className="text-foreground/80 hover:text-primary transition-colors text-sm lg:text-base">
              {t('testimonials')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 min-w-0">
            <ThemeToggle />
            <LanguageCurrencySelector compact />
            
            {user ? (
              <Link to="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                  {t('dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary text-sm">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                    {t('sign_up')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm">
              <Link 
                to="/#features" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('features')}
              </Link>
              <Link 
                to="/#pricing" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('pricing')}
              </Link>
              <Link 
                to="/#testimonials" 
                className="block px-3 py-2 text-foreground/80 hover:text-primary text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('testimonials')}
              </Link>
              
              <div className="border-t border-border/50 pt-2 mt-2">
                <div className="px-3 py-2">
                  <LanguageCurrencySelector />
                </div>
              </div>
              
              {user ? (
                <Link 
                  to="/dashboard"
                  className="block px-3 py-2 text-primary font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('dashboard')}
                </Link>
              ) : (
                <div className="space-y-1 pt-2 border-t border-border/50">
                  <Link 
                    to="/auth"
                    className="block px-3 py-2 text-foreground/80 hover:text-primary text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/auth"
                    className="block px-3 py-2 text-primary font-medium text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('sign_up')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
