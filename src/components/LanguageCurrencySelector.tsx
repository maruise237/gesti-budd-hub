
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, DollarSign } from "lucide-react";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";
import { useToast } from "@/hooks/use-toast";

interface LanguageCurrencySelectorProps {
  showLanguage?: boolean;
  showCurrency?: boolean;
  compact?: boolean;
}

const LANGUAGES = [
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'es', label: 'Español', flag: '🇪🇸' },
  { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { value: 'it', label: 'Italiano', flag: '🇮🇹' },
  { value: 'pt', label: 'Português', flag: '🇵🇹' }
];

const CURRENCIES = [
  { value: 'EUR', label: 'Euro (€)', flag: '🇪🇺' },
  { value: 'USD', label: 'Dollar US ($)', flag: '🇺🇸' },
  { value: 'GBP', label: 'Livre Sterling (£)', flag: '🇬🇧' },
  { value: 'CAD', label: 'Dollar Canadien', flag: '🇨🇦' },
  { value: 'CHF', label: 'Franc Suisse', flag: '🇨🇭' },
  { value: 'XOF', label: 'Franc CFA', flag: '🌍' },
  { value: 'MAD', label: 'Dirham Marocain', flag: '🇲🇦' },
  { value: 'DZD', label: 'Dinar Algérien', flag: '🇩🇿' },
  { value: 'TND', label: 'Dinar Tunisien', flag: '🇹🇳' }
];

export const LanguageCurrencySelector = ({ 
  showLanguage = true, 
  showCurrency = true, 
  compact = false 
}: LanguageCurrencySelectorProps) => {
  const { currentLanguage, currency, changeLanguage, changeCurrency, t } = useGlobalPreferences();
  const { toast } = useToast();

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await changeLanguage(newLanguage);
      toast({
        title: t('success'),
        description: t('preferences_updated_successfully'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('unable_to_update_preferences'),
        variant: "destructive",
      });
    }
  };

  const handleCurrencyChange = async (newCurrency: string) => {
    try {
      await changeCurrency(newCurrency);
      toast({
        title: t('success'),
        description: t('preferences_updated_successfully'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('unable_to_update_preferences'),
        variant: "destructive",
      });
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {showLanguage && (
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-12 h-8 p-1">
              <span className="text-sm">
                {LANGUAGES.find(l => l.value === currentLanguage)?.flag || '🌐'}
              </span>
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        
        {showCurrency && (
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-12 h-8 p-1">
              <span className="text-sm">
                {CURRENCIES.find(c => c.value === currency)?.flag || '💰'}
              </span>
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((curr) => (
                <SelectItem key={curr.value} value={curr.value}>
                  <div className="flex items-center gap-2">
                    <span>{curr.flag}</span>
                    <span>{curr.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showLanguage && (
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {t('language')}
          </label>
          <Select value={currentLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder={t('select_language')} />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {showCurrency && (
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            {t('currency')}
          </label>
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger>
              <SelectValue placeholder={t('select_currency')} />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((curr) => (
                <SelectItem key={curr.value} value={curr.value}>
                  <div className="flex items-center gap-2">
                    <span>{curr.flag}</span>
                    <span>{curr.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
