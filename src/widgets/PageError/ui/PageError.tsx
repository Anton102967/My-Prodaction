import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from '@storybook/react/demo';
import cls from './PageError.module.scss';

interface PageErrorProps {
  className?: string,

}
export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            {t('Произошла непредвиденная ошибка')}
            <Button>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
};

export default PageError;
