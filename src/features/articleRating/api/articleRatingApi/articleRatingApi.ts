import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';
import { Rating } from '@/entities/Rating';

const ArticleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], { userId: string, articleId: string }>({
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),

        }),
    }),
});

export const useGetArticleRating = ArticleRatingApi.useGetArticleRatingQuery;
