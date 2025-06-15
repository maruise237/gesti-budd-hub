
import { useUserPreferences } from '@/contexts/UserPreferencesContext';
import { useTranslation } from './useTranslation';
import { useCurrency } from './useCurrency';

/**
 * Hook centralisé pour accéder à toutes les préférences globales
 * Combine langue, devise et formatage dans une interface unifiée
 */
export const useGlobalPreferences = () => {
  const { preferences, updatePreferences, loading } = useUserPreferences();
  const { t, currentLanguage } = useTranslation();
  const { formatCurrency, currency } = useCurrency();

  // Fonction pour changer de langue avec réactivité immédiate
  const changeLanguage = async (newLanguage: string) => {
    try {
      await updatePreferences({ language: newLanguage });
      console.log(`Language changed to: ${newLanguage}`);
    } catch (error) {
      console.error('Failed to change language:', error);
      throw error;
    }
  };

  // Fonction pour changer de devise avec réactivité immédiate  
  const changeCurrency = async (newCurrency: string) => {
    try {
      await updatePreferences({ currency: newCurrency });
      console.log(`Currency changed to: ${newCurrency}`);
    } catch (error) {
      console.error('Failed to change currency:', error);
      throw error;
    }
  };

  // Fonction pour changer le thème
  const changeTheme = async (newTheme: string) => {
    try {
      await updatePreferences({ theme: newTheme });
      console.log(`Theme changed to: ${newTheme}`);
    } catch (error) {
      console.error('Failed to change theme:', error);
      throw error;
    }
  };

  return {
    // État des préférences
    preferences,
    loading,
    
    // Fonctions de traduction
    t,
    currentLanguage,
    
    // Fonctionnalités de devise
    formatCurrency,
    currency,
    
    // Actions de changement
    changeLanguage,
    changeCurrency,
    changeTheme,
    updatePreferences
  };
};
