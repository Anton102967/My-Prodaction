import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { combineReducers } from '@reduxjs/toolkit';
import {
    articleDetailsPageRecommendaionsReducer,
} from 'pages/ArticleDetailsPage/model/slices/articleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';

export const articleDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendaionsReducer,
    comments: articleDetailsCommentsReducer,
});
