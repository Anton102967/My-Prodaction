import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { ArticleInfiniteList } from '../../ui/ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../../ui/ArticlesPageFilters/ArticlesPageFilters';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { ArticlePagesGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    right={<FiltersContainer />}
                    left={<ViewSelectorContainer />}
                    content={
                        <Page
                            data-testid="ArticlePage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames(
                                cls.ArticlePageRedesigned,
                                {},
                                [className],
                            )}
                        >
                            <ArticleInfiniteList className={cls.list} />
                            <ArticlePagesGreeting />
                        </Page>
                    }
                />
            }
            off={
                <Page
                    data-testid="ArticlePage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArticlesPage, {}, [className])}
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList className={cls.list} />
                    <ArticlePagesGreeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
