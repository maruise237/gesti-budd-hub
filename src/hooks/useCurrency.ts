
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

export const useCurrency = () => {
  const { preferences, formatCurrency } = useUserPreferences();

  // Fonction pour formater selon la locale de la devise
  const formatCurrencyWithLocale = (amount: number): string => {
    // Mapping des devises vers leurs locales
    const currencyLocales: { [key: string]: string } = {
      'EUR': 'fr-FR',
      'USD': 'en-US',
      'GBP': 'en-GB',
      'CAD': 'en-CA',
      'CHF': 'de-CH',
      'XOF': 'fr-FR', // Franc CFA
      'XAF': 'fr-FR', // Franc CFA
      'MAD': 'ar-MA', // Dirham marocain
      'DZD': 'ar-DZ', // Dinar algérien
      'TND': 'ar-TN', // Dinar tunisien
      'EGP': 'ar-EG', // Livre égyptienne
      'ZAR': 'en-ZA', // Rand sud-africain
      'NGN': 'en-NG', // Naira nigérian
      'GHS': 'en-GH', // Cedi ghanéen
      'KES': 'en-KE', // Shilling kényan
    };

    const locale = currencyLocales[preferences.currency] || 'fr-FR';
    
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: preferences.currency,
      }).format(amount);
    } catch (error) {
      // Fallback au système existant si la devise n'est pas supportée par Intl
      return formatCurrency(amount);
    }
  };

  return {
    formatCurrency: formatCurrencyWithLocale,
    currency: preferences.currency,
  };
};
