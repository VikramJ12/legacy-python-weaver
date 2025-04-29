
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  // Check for dark mode preference in localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update theme when toggle changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="flex items-center gap-2">
      <Sun size={18} className="text-muted-foreground" />
      <Switch 
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
        aria-label="Toggle dark mode"
      />
      <Moon size={18} className="text-muted-foreground" />
    </div>
  );
}
