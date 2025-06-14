
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">
              BuildPro
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/#features" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('features')}
            </Link>
            <Link to="/#pricing" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('pricing')}
            </Link>
            <Link to="/#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">
              {t('testimonials')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  {t('dashboard')}
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-700 hover:text-orange-600">
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    {t('sign_up')}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                to="/#features" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('features')}
              </Link>
              <Link 
                to="/#pricing" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('pricing')}
              </Link>
              <Link 
                to="/#testimonials" 
                className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('testimonials')}
              </Link>
              {user ? (
                <Link 
                  to="/dashboard"
                  className="block px-3 py-2 text-orange-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('dashboard')}
                </Link>
              ) : (
                <div className="space-y-1">
                  <Link 
                    to="/auth"
                    className="block px-3 py-2 text-gray-700 hover:text-orange-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/auth"
                    className="block px-3 py-2 text-orange-600 font-medium"
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
