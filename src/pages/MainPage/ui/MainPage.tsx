import React from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';

const MainPage = () => {
    const { t, i18n } = useTranslation('main');
    return (
        <div style={{ padding: '15px' }}>
            <BugButton />
            <div />
            {t('Главная страница')}
        </div>
    );
};

export default MainPage;
