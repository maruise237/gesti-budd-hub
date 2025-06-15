
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { preferences, changeTheme } = useGlobalPreferences();

  useEffect(() => {
    // Appliquer le thème au document
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme]);

  const toggleTheme = () => {
    const newTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    changeTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 transition-colors"
      aria-label={preferences.theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
    >
      {preferences.theme === 'dark' ? (
        <Sun className="h-4 w-4 text-yellow-500" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </Button>
  );
};
