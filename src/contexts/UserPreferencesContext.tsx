
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserPreferences {
  currency: string;
  language: string;
  theme: string;
}

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (newPreferences: Partial<UserPreferences>) => Promise<void>;
  formatCurrency: (amount: number) => string;
  loading: boolean;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};

const CURRENCY_SYMBOLS: { [key: string]: string } = {
  'EUR': '€',
  'USD': '$',
  'GBP': '£',
  'CAD': 'CAD',
  'CHF': 'CHF',
  'XOF': 'F CFA',
  'XAF': 'F CFA',
  'MAD': 'DH',
  'DZD': 'DA',
  'TND': 'TND',
  'EGP': 'LE',
  'ZAR': 'R',
  'NGN': '₦',
  'GHS': 'GH₵',
  'KES': 'KSh',
  'UGX': 'USh',
  'TZS': 'TSh',
  'RWF': 'FRw',
  'ETB': 'Br',
  'MZN': 'MT',
  'BWP': 'P',
  'SZL': 'L',
  'LSL': 'L',
  'NAD': 'N$',
  'AOA': 'Kz',
  'MWK': 'MK',
  'ZMW': 'ZK',
  'ZWL': 'Z$',
  'MGA': 'Ar',
  'MUR': '₨',
  'SCR': '₨',
  'KMF': 'CF',
  'DJF': 'Fdj',
  'SOS': 'Sh',
  'ERN': 'Nfk',
  'SLL': 'Le',
  'GMD': 'D',
  'GNF': 'FG',
  'LRD': 'L$',
  'CVE': '$',
  'STN': 'Db',
  'SHP': '£'
};

// Clés pour localStorage
const STORAGE_KEYS = {
  CURRENCY: 'gestibud_currency',
  LANGUAGE: 'gestibud_language',  
  THEME: 'gestibud_theme'
};

// Valeurs par défaut
const DEFAULT_PREFERENCES: UserPreferences = {
  currency: 'EUR',
  language: 'fr',
  theme: 'light'
};

// Fonctions utilitaires pour localStorage
const getStoredPreference = (key: string, defaultValue: string): string => {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (error) {
    console.warn(`Failed to read ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStoredPreference = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

export const UserPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // Initialisation immédiate depuis localStorage
  const [preferences, setPreferences] = useState<UserPreferences>(() => ({
    currency: getStoredPreference(STORAGE_KEYS.CURRENCY, DEFAULT_PREFERENCES.currency),
    language: getStoredPreference(STORAGE_KEYS.LANGUAGE, DEFAULT_PREFERENCES.language),
    theme: getStoredPreference(STORAGE_KEYS.THEME, DEFAULT_PREFERENCES.theme)
  }));

  // Charger les préférences depuis la DB si utilisateur connecté
  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    } else {
      // Si pas connecté, utiliser uniquement localStorage
      setLoading(false);
    }
  }, [user]);

  // Sauvegarder en localStorage à chaque changement
  useEffect(() => {
    setStoredPreference(STORAGE_KEYS.CURRENCY, preferences.currency);
    setStoredPreference(STORAGE_KEYS.LANGUAGE, preferences.language);
    setStoredPreference(STORAGE_KEYS.THEME, preferences.theme);
  }, [preferences]);

  const fetchUserPreferences = async () => {
    try {
      console.log('Fetching user preferences for:', user?.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('currency, language, theme')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        console.log('User preferences loaded from DB:', data);
        const dbPreferences = {
          currency: data.currency || preferences.currency,
          language: data.language || preferences.language,
          theme: data.theme || preferences.theme
        };
        
        // Mettre à jour seulement si différent
        if (JSON.stringify(dbPreferences) !== JSON.stringify(preferences)) {
          setPreferences(dbPreferences);
        }
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      // En cas d'erreur, garder les préférences localStorage
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    try {
      console.log('Updating preferences:', newPreferences);
      const updatedPreferences = { ...preferences, ...newPreferences };
      
      // Mise à jour optimiste immédiate
      setPreferences(updatedPreferences);
      
      // Sauvegarder en DB si utilisateur connecté
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            currency: updatedPreferences.currency,
            language: updatedPreferences.language,
            theme: updatedPreferences.theme,
            updated_at: new Date().toISOString()
          });

        if (error) {
          // Revert en cas d'erreur DB
          console.error('Error saving to DB, reverting:', error);
          setPreferences(preferences);
          throw error;
        }
      }

      console.log('Preferences updated successfully:', updatedPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  const formatCurrency = (amount: number): string => {
    const symbol = CURRENCY_SYMBOLS[preferences.currency] || preferences.currency;
    
    // Utiliser Intl.NumberFormat si supporté
    try {
      const currencyLocales: { [key: string]: string } = {
        'EUR': 'fr-FR',
        'USD': 'en-US',
        'GBP': 'en-GB',
        'CAD': 'en-CA',
        'CHF': 'de-CH',
        'XOF': 'fr-FR',
        'XAF': 'fr-FR',
        'MAD': 'ar-MA',
        'DZD': 'ar-DZ',
        'TND': 'ar-TN',
        'EGP': 'ar-EG',
        'ZAR': 'en-ZA',
        'NGN': 'en-NG',
        'GHS': 'en-GH',
        'KES': 'en-KE',
      };

      const locale = currencyLocales[preferences.currency] || 'fr-FR';
      
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: preferences.currency,
      }).format(amount);
    } catch (error) {
      // Fallback simple
      return `${amount.toLocaleString()} ${symbol}`;
    }
  };

  const value = {
    preferences,
    updatePreferences,
    formatCurrency,
    loading
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};
