import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Palette, Globe } from "lucide-react";
import { LanguageCurrencySelector } from "./LanguageCurrencySelector";

interface ProfileData {
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  timezone: string | null;
  company_name: string | null;
}

export const ProfileCustomization = () => {
  const { user } = useAuth();
  const { t, changeTheme, preferences, loading: preferencesLoading } = useGlobalPreferences();
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

  const handleThemeChange = async (value: string) => {
    try {
      console.log(`Updating theme to:`, value);
      await changeTheme(value);
      toast({
        title: t('success'),
        description: t('preferences_updated_successfully'),
      });
    } catch (error) {
      console.error(`Error updating theme:`, error);
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

      {/* Appearance Preferences - Simplifié avec le nouveau composant */}
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
            <div className="flex gap-2">
              {['light', 'dark', 'system'].map((theme) => (
                <Button
                  key={theme}
                  variant={preferences.theme === theme ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleThemeChange(theme)}
                  disabled={preferencesLoading}
                >
                  {t(theme)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Preferences - Utilise le nouveau composant global */}
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
        <CardContent>
          <LanguageCurrencySelector />
        </CardContent>
      </Card>
    </div>
  );
};
