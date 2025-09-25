import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { RatingCard } from '@/entities/Rating';
import { useGetArticleRating } from '../../api/articleRatingApi/articleRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

export const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId,
    } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const userId = userData?.id;

    const { data, isLoading } = useGetArticleRating(
        {
            articleId,
            userId: userId ?? '',
        },
        {
            skip: !userId,
        },
    );

    const rating = useMemo(() => data?.[0], [data]);

    console.log(data);

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    return (
        <RatingCard
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оцените свой отзыв о статье, это поможет улучшить качество')}
            hasFeedback
            rate={rating?.rate}
        />
    );
});
