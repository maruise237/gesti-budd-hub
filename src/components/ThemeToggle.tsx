
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'modern'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'modern' || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark' | 'modern') => {
    document.documentElement.classList.remove('light', 'dark', 'theme-modern');
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'modern') {
      document.documentElement.classList.add('dark', 'theme-modern');
    }
  };

  const toggleTheme = () => {
    const themes: ('light' | 'dark' | 'modern')[] = ['light', 'dark', 'modern'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  const getIcon = () => {
    switch (theme) {
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
      onClick={toggleTheme}
      className="rounded-full"
      title={`Thème actuel: ${theme}`}
    >
      {getIcon()}
    </Button>
  );
};
