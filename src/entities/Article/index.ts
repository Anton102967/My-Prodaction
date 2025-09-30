export {
    ArticleDetails,
} from './ui/ArticleDetails/ArticleDetails';

export type { Article } from './model/types/article';
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema';

export { ArticleList } from './ui/ArticleList/ArticleList';
export { getArticleDetailsData } from './model/selectors/articleDetails';

export {
    ArticleView, ArticleType, ArticleSortField, ArticleBlockType,
}
    from './model/const/constArticle';
export { PAGE_ID } from '@/entities/Article/model/const/constPage';
