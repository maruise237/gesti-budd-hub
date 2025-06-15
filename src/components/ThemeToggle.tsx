
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalPreferences } from "@/hooks/useGlobalPreferences";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const { preferences, changeTheme } = useGlobalPreferences();

  useEffect(() => {
    // Appliquer le thème au document avec transition fluide
    const root = document.documentElement;
    
    // Ajouter une classe de transition temporaire
    root.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (preferences.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Retirer la transition après application pour éviter les conflits
    const timer = setTimeout(() => {
      root.style.transition = '';
    }, 300);

    return () => clearTimeout(timer);
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
      className="h-9 w-9 transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label={preferences.theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
    >
      <div className="relative">
        {preferences.theme === 'dark' ? (
          <Sun className="h-4 w-4 text-yellow-500 dark:text-yellow-400 transition-all duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 text-slate-700 dark:text-slate-300 transition-all duration-300 rotate-0 scale-100" />
        )}
      </div>
    </Button>
  );
};
