
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

export const UserPreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    currency: 'EUR',
    language: 'fr',
    theme: 'light'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    } else {
      setLoading(false);
    }
  }, [user]);

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
        console.log('User preferences loaded:', data);
        setPreferences({
          currency: data.currency || 'EUR',
          language: data.language || 'fr',
          theme: data.theme || 'light'
        });
      }
    } catch (error) {
      console.error('Error fetching user preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    try {
      console.log('Updating preferences:', newPreferences);
      const updatedPreferences = { ...preferences, ...newPreferences };
      
      // Optimistically update the local state first
      setPreferences(updatedPreferences);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          currency: updatedPreferences.currency,
          language: updatedPreferences.language,
          theme: updatedPreferences.theme,
          updated_at: new Date().toISOString()
        });

      if (error) {
        // Revert local state if database update fails
        setPreferences(preferences);
        throw error;
      }

      console.log('Preferences updated successfully:', updatedPreferences);
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  };

  const formatCurrency = (amount: number): string => {
    const symbol = CURRENCY_SYMBOLS[preferences.currency] || preferences.currency;
    return `${amount.toLocaleString()} ${symbol}`;
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
