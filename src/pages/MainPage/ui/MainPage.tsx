import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { RatingCard } from '@/entities/Rating';
import { Page } from '@/widgets/Page/Page';

const MainPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard
                title={t('Как вам статья?')}
                feedbackTitle={t('Оставьте отзыв о статье')}
                hasFeedback
            />
        </Page>
    );
};

export default MainPage;
