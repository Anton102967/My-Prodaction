import { StateSchema } from 'app/providers/StoreProvider';

// eslint-disable-next-line max-len
export const getArticleDetailsRecommendaionsIsLoading = (state: StateSchema) => state.articleDetailsPage?.recommendations?.isLoading;
export const getArticleDetailsRecommendaionsError = (state: StateSchema) => state?.articleDetailsPage?.recommendations?.error;
