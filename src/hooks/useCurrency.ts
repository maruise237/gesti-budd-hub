
import { useUserPreferences } from '@/contexts/UserPreferencesContext';

export const useCurrency = () => {
  const { preferences, formatCurrency } = useUserPreferences();

  return {
    formatCurrency,
    currency: preferences.currency,
  };
};
