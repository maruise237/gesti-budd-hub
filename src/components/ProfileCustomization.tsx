
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useUserPreferences } from "@/contexts/UserPreferencesContext";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Palette, Globe } from "lucide-react";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  timezone: string | null;
  company_name: string | null;
}

const AFRICAN_CURRENCIES = [
  { value: 'XOF', label: 'Franc CFA BCEAO (XOF)', countries: 'Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo' },
  { value: 'XAF', label: 'Franc CFA BEAC (XAF)', countries: 'Cameroun, République centrafricaine, Tchad, République du Congo, Guinée équatoriale, Gabon' },
  { value: 'MAD', label: 'Dirham marocain (MAD)', countries: 'Maroc' },
  { value: 'DZD', label: 'Dinar algérien (DZD)', countries: 'Algérie' },
  { value: 'TND', label: 'Dinar tunisien (TND)', countries: 'Tunisie' },
  { value: 'EGP', label: 'Livre égyptienne (EGP)', countries: 'Égypte' },
  { value: 'ZAR', label: 'Rand sud-africain (ZAR)', countries: 'Afrique du Sud' },
  { value: 'NGN', label: 'Naira nigérian (NGN)', countries: 'Nigeria' },
  { value: 'GHS', label: 'Cedi ghanéen (GHS)', countries: 'Ghana' },
  { value: 'KES', label: 'Shilling kényan (KES)', countries: 'Kenya' },
  { value: 'UGX', label: 'Shilling ougandais (UGX)', countries: 'Ouganda' },
  { value: 'TZS', label: 'Shilling tanzanien (TZS)', countries: 'Tanzanie' },
  { value: 'RWF', label: 'Franc rwandais (RWF)', countries: 'Rwanda' },
  { value: 'ETB', label: 'Birr éthiopien (ETB)', countries: 'Éthiopie' },
  { value: 'MZN', label: 'Metical mozambicain (MZN)', countries: 'Mozambique' },
  { value: 'BWP', label: 'Pula botswanais (BWP)', countries: 'Botswana' },
  { value: 'SZL', label: 'Lilangeni eswatinien (SZL)', countries: 'Eswatini' },
  { value: 'LSL', label: 'Loti lesothien (LSL)', countries: 'Lesotho' },
  { value: 'NAD', label: 'Dollar namibien (NAD)', countries: 'Namibie' },
  { value: 'AOA', label: 'Kwanza angolais (AOA)', countries: 'Angola' },
  { value: 'MWK', label: 'Kwacha malawien (MWK)', countries: 'Malawi' },
  { value: 'ZMW', label: 'Kwacha zambien (ZMW)', countries: 'Zambie' },
  { value: 'ZWL', label: 'Dollar zimbabwéen (ZWL)', countries: 'Zimbabwe' },
  { value: 'MGA', label: 'Ariary malgache (MGA)', countries: 'Madagascar' },
  { value: 'MUR', label: 'Roupie mauricienne (MUR)', countries: 'Maurice' },
  { value: 'SCR', label: 'Roupie seychelloise (SCR)', countries: 'Seychelles' },
  { value: 'KMF', label: 'Franc comorien (KMF)', countries: 'Comores' },
  { value: 'DJF', label: 'Franc djiboutien (DJF)', countries: 'Djibouti' },
  { value: 'SOS', label: 'Shilling somalien (SOS)', countries: 'Somalie' },
  { value: 'ERN', label: 'Nafka érythréen (ERN)', countries: 'Érythrée' },
  { value: 'SLL', label: 'Leone sierra-léonais (SLL)', countries: 'Sierra Leone' },
  { value: 'GMD', label: 'Dalasi gambien (GMD)', countries: 'Gambie' },
  { value: 'GNF', label: 'Franc guinéen (GNF)', countries: 'Guinée' },
  { value: 'LRD', label: 'Dollar libérien (LRD)', countries: 'Liberia' },
  { value: 'CVE', label: 'Escudo cap-verdien (CVE)', countries: 'Cap-Vert' },
  { value: 'STN', label: 'Dobra santoméen (STN)', countries: 'São Tomé-et-Príncipe' },
  { value: 'SHP', label: 'Livre de Sainte-Hélène (SHP)', countries: 'Sainte-Hélène' }
];

const OTHER_CURRENCIES = [
  { value: 'EUR', label: 'Euro (€)', countries: 'Zone Euro' },
  { value: 'USD', label: 'Dollar américain ($)', countries: 'États-Unis' },
  { value: 'GBP', label: 'Livre sterling (£)', countries: 'Royaume-Uni' },
  { value: 'CAD', label: 'Dollar canadien (CAD)', countries: 'Canada' },
  { value: 'CHF', label: 'Franc suisse (CHF)', countries: 'Suisse' }
];

export const ProfileCustomization = () => {
  const { user } = useAuth();
  const { preferences, updatePreferences } = useUserPreferences();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    bio: "",
    avatar_url: "",
    timezone: "Europe/Paris",
    company_name: ""
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile for user:', user?.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('first_name, last_name, bio, avatar_url, timezone, company_name')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        console.log('Profile data fetched:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: t('error'),
        description: t('unable_to_load_profile'),
        variant: "destructive",
      });
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setProfile(prev => ({ ...prev, avatar_url: data.publicUrl }));
      
      toast({
        title: t('success'),
        description: t('avatar_updated_successfully'),
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: t('error'),
        description: t('unable_to_upload_avatar'),
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Saving profile data:', profile);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      console.log('Profile saved successfully');
      toast({
        title: t('success'),
        description: t('profile_updated_successfully'),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('error'),
        description: t('unable_to_update_profile'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (key: keyof typeof preferences, value: string) => {
    try {
      console.log(`Updating ${key} to:`, value);
      await updatePreferences({ [key]: value });
      toast({
        title: t('success'),
        description: t('preferences_updated_successfully'),
      });
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      toast({
        title: t('error'),
        description: t('unable_to_update_preferences'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t('personal_information')}
          </CardTitle>
          <CardDescription>
            {t('manage_basic_info_and_avatar')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center space-x-2 bg-secondary hover:bg-secondary/80 px-4 py-2 rounded-md transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? t('uploading') : t('change_avatar')}</span>
                  </div>
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">{t('first_name')}</Label>
                <Input
                  id="first_name"
                  value={profile.first_name || ""}
                  onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder={t('your_first_name')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">{t('last_name')}</Label>
                <Input
                  id="last_name"
                  value={profile.last_name || ""}
                  onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder={t('your_last_name')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">{t('company_name')}</Label>
              <Input
                id="company_name"
                value={profile.company_name || ""}
                onChange={(e) => setProfile(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder={t('your_company_name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t('biography')}</Label>
              <Textarea
                id="bio"
                value={profile.bio || ""}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder={t('tell_us_about_yourself')}
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? t('updating') : t('save_changes')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Appearance Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            {t('appearance_preferences')}
          </CardTitle>
          <CardDescription>
            {t('customize_app_appearance')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">{t('theme')}</Label>
            <Select
              value={preferences.theme}
              onValueChange={(value) => handlePreferenceChange('theme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('select_theme')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('light')}</SelectItem>
                <SelectItem value="dark">{t('dark')}</SelectItem>
                <SelectItem value="system">{t('system')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">{t('currency')}</Label>
            <Select
              value={preferences.currency}
              onValueChange={(value) => handlePreferenceChange('currency', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('select_currency')} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                  {t('international_currencies')}
                </div>
                {OTHER_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
                <div className="px-2 py-1 text-sm font-semibold text-muted-foreground border-t mt-2 pt-2">
                  {t('african_currencies')}
                </div>
                {AFRICAN_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    <div className="flex flex-col">
                      <span>{currency.label}</span>
                      <span className="text-xs text-muted-foreground">{currency.countries}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Regional Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t('regional_preferences')}
          </CardTitle>
          <CardDescription>
            {t('configure_language_and_timezone')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">{t('timezone')}</Label>
              <Select
                value={profile.timezone || "Europe/Paris"}
                onValueChange={(value) => setProfile(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('select_timezone')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los_Angeles (GMT-8)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">{t('language')}</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('select_language')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
