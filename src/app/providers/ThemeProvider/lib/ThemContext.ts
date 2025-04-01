import {createContext} from "react";

export enum Theme {
    LIGHT = "light",
    DARK = "dark",
}

export interface ThemContextProps {
    theme?: Theme;
    setTheme?: (them: Theme) => void;
}

export const ThemContext = createContext<ThemContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = "theme";