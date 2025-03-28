import React, {Suspense, useContext, useState} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Counter from "./components/Counter";
import "./style/index.scss"
import AboutPage from "./pages/AboutPage/AboutPage";
import MainPage from "./pages/MainPage/MainPage";
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {AboutPageAsync} from "./pages/AboutPage/AboutPage.async";
import {ThemContext} from "./theme/ThemContext";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

const App = () => {
    const {theme, toggleTheme   } = useTheme()
    return (
        <div className={classNames("app", {hovered: true, selected: true}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to = {"/"}>Главная</Link>
            <Link to = {"/about"}> О сайте</Link>

             <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path = {"/about"} element={<AboutPageAsync/>}/>
                    <Route path = {"/"} element = {<MainPageAsync/>}/>
                </Routes>
             </Suspense>

        </div>
    );
};
export default App;