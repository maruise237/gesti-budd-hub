
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { LanguageCurrencySelector } from "./LanguageCurrencySelector";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-400">
              Gestibud
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 sm:space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              {t('features')}
            </a>
            <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              {t('pricing')}
            </a>
          </nav>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageCurrencySelector />
            <ThemeToggle />
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base">
                  {t('dashboard')}
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base">
                  {t('sign_in')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
