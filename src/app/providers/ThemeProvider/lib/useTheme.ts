import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, ThemContext, Theme } from './ThemContext';

interface useThemeResult {
    toggleTheme: () => void;
    theme: Theme
}

export function useTheme(): useThemeResult {
    const { theme, setTheme } = useContext(ThemContext);
    const toggleTheme = () => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };
    return { theme, toggleTheme };
}
