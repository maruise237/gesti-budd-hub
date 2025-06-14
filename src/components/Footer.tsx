
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-400 mb-3 sm:mb-4">Gestibud</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              La solution complète pour gérer vos projets de construction avec efficacité.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Produit</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/#features" className="hover:text-white transition-colors">{t('features')}</Link></li>
              <li><Link to="/#pricing" className="hover:text-white transition-colors">{t('pricing')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">{t('dashboard')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Fonctionnalités</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><Link to="/dashboard/projects" className="hover:text-white transition-colors">{t('projects')}</Link></li>
              <li><Link to="/dashboard/employees" className="hover:text-white transition-colors">{t('employees')}</Link></li>
              <li><Link to="/dashboard/expenses" className="hover:text-white transition-colors">{t('expenses')}</Link></li>
              <li><Link to="/dashboard/time-entries" className="hover:text-white transition-colors">{t('time_entries')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">&copy; 2024 Gestibud. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
