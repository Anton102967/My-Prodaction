import { classNames } from 'shared/lib/classNames/classNames';
import { useEffect, useState } from 'react';
import Button from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

// Компонент для тестирования
export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    const { t } = useTranslation();
    return (
        <Button
            onClick={onThrow}
            className={classNames('', {}, [])}
        >

            { t('throw error')}
        </Button>
    );
};

export default BugButton;
