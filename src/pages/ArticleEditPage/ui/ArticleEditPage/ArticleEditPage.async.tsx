import { lazy } from 'react';
import { ArticleEditPage } from 'pages/ArticleEditPage/ui/ArticleEditPage/ArticleEditPage';

export const ArticleEditPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!! ДЕЛАЕМ ДЛЯ КУРСА!
    setTimeout(() => resolve(import('./ArticleEditPage')), 400);
}));
