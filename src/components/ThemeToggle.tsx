
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";

export const ThemeToggle = () => {
  const { preferences, changeTheme } = useGlobalPreferences();

  const handleThemeChange = async () => {
    const themes: ('light' | 'dark' | 'modern')[] = ['light', 'dark', 'modern'];
    const currentIndex = themes.indexOf(preferences.theme as 'light' | 'dark' | 'modern');
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    try {
      await changeTheme(nextTheme);
      applyTheme(nextTheme);
    } catch (error) {
      console.error('Failed to change theme:', error);
    }
  };

  const applyTheme = (newTheme: string) => {
    document.documentElement.classList.remove('light', 'dark', 'theme-modern');
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'modern') {
      document.documentElement.classList.add('dark', 'theme-modern');
    }
  };

  const getIcon = () => {
    switch (preferences.theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'modern':
        return <Palette className="h-4 w-4" />;
      default:
        return <Moon className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeChange}
      className="rounded-full"
      title={`Thème actuel: ${preferences.theme}`}
    >
      {getIcon()}
    </Button>
  );
};
