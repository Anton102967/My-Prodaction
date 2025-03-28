import React, {FC, useMemo, useState} from 'react';
import {LOCAL_STORAGE_THEME_KEY, ThemContext} from "./ThemContext";
import {Theme} from "../App";

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT
const ThemProvider: FC = ({children}) => {

    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const toggleTheme = () => {
            setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
    }

    const defualtProps = useMemo(() => ({
            theme: theme,
            setTheme: setTheme,
    }),[theme])

    return (
        <ThemContext.Provider value={defualtProps} >
            {children}
        </ThemContext.Provider>
    );
};

export default ThemProvider;