import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from '../../types/article';

export const FetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetails/FetchArticleById',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const token = localStorage.getItem('token'); // Если храните иначе — поменяйте!


        try {
            const response = await extra.api.get<Article>(
                `/articles/${articleId}`,
                {
                    headers: {
                        Authorization: token || 'Bearer test', // Важно чтобы НЕ была пустая строка!
                    },
                }
            );

            if(!response) {
                throw new Error();
            }


            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

