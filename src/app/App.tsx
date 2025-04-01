import React, {Suspense} from 'react';
import "./style/index.scss"
import {classNames} from "shared/lib/classNames";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {useTheme} from "app/providers/ThemeProvider";
import {Sidebar} from "widgets/Sidebar";


export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

const App  = () => {
  const {theme} = useTheme()

  return (

      <div className={classNames("app", {hovered: true, selected: true}, [theme])}>
        <Suspense fallback={""}>
          <Navbar />
          <div className= "content-page">
            <Sidebar/>
            <AppRouter />
        </div>
      </Suspense>

    </div>
    );
};
export default App;