// Theme Management Utilities
// Funktionen für Light/Dark Theme Umschaltung

export type Theme = 'light' | 'dark';

export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'dark';

  constructor() {
    if (typeof window !== 'undefined') {
      this.initTheme();
    }
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  private initTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      // Default to dark theme
      this.currentTheme = 'dark';
    }

    this.applyTheme();
  }

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.applyTheme();
    localStorage.setItem('theme', theme);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(): void {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
  }

  // Listen to system theme changes
  listenToSystemTheme(): void {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.setTheme(newTheme);
        }
      });
    }
  }
}

// Globaler Theme Manager
export const themeManager = ThemeManager.getInstance();