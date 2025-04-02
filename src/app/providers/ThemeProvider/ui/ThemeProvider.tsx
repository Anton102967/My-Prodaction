import React, { FC, useMemo, useState } from 'react';
import { Theme } from 'app/App';
import { LOCAL_STORAGE_THEME_KEY, ThemContext } from '../lib/ThemContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;
const ThemeProvider: FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const toggleTheme = () => {
        setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    };

    const defualtProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemContext.Provider value={defualtProps}>
            {children}
        </ThemContext.Provider>
    );
};

export default ThemeProvider;
