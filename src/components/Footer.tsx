
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Gestibud</h3>
            <p className="text-gray-400">
              La solution complète pour gérer vos projets de construction avec efficacité.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/#features" className="hover:text-white">{t('features')}</Link></li>
              <li><Link to="/#pricing" className="hover:text-white">{t('pricing')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">{t('dashboard')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Fonctionnalités</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/dashboard/projects" className="hover:text-white">{t('projects')}</Link></li>
              <li><Link to="/dashboard/employees" className="hover:text-white">{t('employees')}</Link></li>
              <li><Link to="/dashboard/expenses" className="hover:text-white">{t('expenses')}</Link></li>
              <li><Link to="/dashboard/time-entries" className="hover:text-white">{t('time_entries')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Gestibud. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
