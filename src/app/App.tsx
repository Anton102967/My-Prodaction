import React, { Suspense } from 'react';
import './style/index.scss';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { useTheme } from 'app/providers/ThemeProvider';
import { Sidebar } from 'widgets/Sidebar';
import { classNames } from 'shared/lib/classNames/classNames';

function App() {
    const { theme } = useTheme();

    return (
        // eslint-disable-next-line max-len
        <div className={classNames(
            'app',
            { hovered: true, selected: true },
            [theme],
        )}
        >
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
}
export default App;
