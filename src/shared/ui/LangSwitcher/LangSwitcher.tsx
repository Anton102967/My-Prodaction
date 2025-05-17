/* eslint-disable object-curly-spacing */
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

/* eslint-disable object-curly-spacing */

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = ({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggle}
        >
            { short
                ? t('Короткий язык') // i18next-extract-disable-line
                : t('Язык') // i18next-extract-disable-line
                // eslint-disable-next-line react/jsx-curly-newline
            }
        </Button>
    );
};
