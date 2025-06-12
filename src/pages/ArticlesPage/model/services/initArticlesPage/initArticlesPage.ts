import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { ArticleSortField } from 'entities/Article';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
    >(
        'articlesPage/initArticlesPage',
        async (searchParams, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const inited = getArticlesPageInited(getState());

            if (!inited) {
                const orderFromURL = searchParams.get('order') as SortOrder;
                const sortFromURL = searchParams.get('sort') as ArticleSortField;
                const searchFromURL = searchParams.get('search');

                if (orderFromURL) {
                    dispatch(articlesPageActions.setOrder(orderFromURL));
                }
                if (sortFromURL) {
                    dispatch(articlesPageActions.setSort(sortFromURL));
                }
                if (searchFromURL) {
                    dispatch(articlesPageActions.setSearch(searchFromURL));
                }

                dispatch(articlesPageActions.initState());
                dispatch(fetchArticlesList({}));
            }
        },
    );
