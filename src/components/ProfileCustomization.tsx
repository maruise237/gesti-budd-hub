
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Palette, Globe } from "lucide-react";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  timezone: string | null;
  language: string | null;
  company_name: string | null;
  theme: string | null;
  currency: string | null;
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
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    bio: "",
    avatar_url: "",
    timezone: "Europe/Paris",
    language: "fr",
    company_name: "",
    theme: "light",
    currency: "EUR"
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
        .select('*')
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
        title: "Erreur",
        description: "Impossible de charger le profil",
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
        title: "Succès",
        description: "Avatar mis à jour avec succès",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger l'avatar",
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
        title: "Succès",
        description: "Profil mis à jour avec succès",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Gérez vos informations de base et votre avatar
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
                    <span>{uploading ? "Téléchargement..." : "Changer l'avatar"}</span>
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
                <Label htmlFor="first_name">Prénom</Label>
                <Input
                  id="first_name"
                  value={profile.first_name || ""}
                  onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Nom</Label>
                <Input
                  id="last_name"
                  value={profile.last_name || ""}
                  onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_name">Nom de l'entreprise</Label>
              <Input
                id="company_name"
                value={profile.company_name || ""}
                onChange={(e) => setProfile(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biographie</Label>
              <Textarea
                id="bio"
                value={profile.bio || ""}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Parlez-nous de vous..."
                rows={3}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Mise à jour..." : "Sauvegarder les modifications"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Appearance Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Préférences d'apparence
          </CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Thème</Label>
              <Select
                value={profile.theme || "light"}
                onValueChange={(value) => {
                  console.log('Theme changed to:', value);
                  setProfile(prev => ({ ...prev, theme: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un thème" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="system">Système</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Select
                value={profile.currency || "EUR"}
                onValueChange={(value) => {
                  console.log('Currency changed to:', value);
                  setProfile(prev => ({ ...prev, currency: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une devise" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                    Devises internationales
                  </div>
                  {OTHER_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                  <div className="px-2 py-1 text-sm font-semibold text-muted-foreground border-t mt-2 pt-2">
                    Devises africaines
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

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Mise à jour..." : "Sauvegarder les préférences"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Regional Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Préférences régionales
          </CardTitle>
          <CardDescription>
            Configurez votre langue et fuseau horaire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuseau horaire</Label>
                <Select
                  value={profile.timezone || "Europe/Paris"}
                  onValueChange={(value) => {
                    console.log('Timezone changed to:', value);
                    setProfile(prev => ({ ...prev, timezone: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un fuseau horaire" />
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
                <Label htmlFor="language">Langue</Label>
                <Select
                  value={profile.language || "fr"}
                  onValueChange={(value) => {
                    console.log('Language changed to:', value);
                    setProfile(prev => ({ ...prev, language: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une langue" />
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

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Mise à jour..." : "Sauvegarder les préférences"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
