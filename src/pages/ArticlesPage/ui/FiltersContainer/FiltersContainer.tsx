import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../model/lib/hooks/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        onChangeType,
        onChangeSearch,
        search,
        type,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
    } = useArticleFilters();

    return (
        <div className={className}>
            <ArticlesFilters
                sort={sort}
                order={order}
                type={type}
                search={search}
                onChangeSearch={onChangeSearch}
                onChangeOrder={onChangeOrder}
                onChangeSort={onChangeSort}
                onChangeType={onChangeType}
            />
        </div>
    );
});
