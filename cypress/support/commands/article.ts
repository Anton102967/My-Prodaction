import { Article } from '../../../src/entities/Article';

// Тип для частичного объекта (заменяет отсутствующий DeepPartial)
type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

const defaultArticle: DeepPartial<Article> = {
    title: 'Testing Article!',
    subtitle: 'Экономика',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJ9OQRwwIevgdIgaUOidN8spC7_RaSg1Vew&s',
    views: 1022,
    createdAt: '26.02.2022',
    userId: '1',
    // @ts-ignore
    type: ['ECONOMICS'],
    blocks: [],
};

const createdArticleIds: string[] = [];

// Клонирование, чтобы объект был «чистым» и без ссылок
const cloneArticlePayload = (article?: DeepPartial<Article>) => {
    return JSON.parse(JSON.stringify(article ?? defaultArticle));
};

const deleteArticleRequest = (articleId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { authorization: 'hi' },
        failOnStatusCode: false,
    });
};

export const createArticle = (article?: DeepPartial<Article>) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/articles',
            headers: { authorization: 'hi' },
            body: cloneArticlePayload(article),
        })
        .then((response) => {
            const createdArticle: Article = response.body;

            if (createdArticle?.id) {
                createdArticleIds.push(createdArticle.id);
            }

            return createdArticle;
        });
};

export const removeArticle = (articleId: string) => {
    if (!articleId) {
        return cy.wrap(null);
    }

    // Убираем id из массива созданных статей
    const idIndex = createdArticleIds.findIndex((id) => id === articleId);
    if (idIndex !== -1) {
        createdArticleIds.splice(idIndex, 1);
    }

    return deleteArticleRequest(articleId);
};

// Удаляет все созданные статьи
export const removeTestArticles = () => {
    if (!createdArticleIds.length) {
        return cy.wrap(null);
    }

    const ids = [...createdArticleIds];
    createdArticleIds.length = 0;

    // 🔧 заменяем .each (JQuery<HTMLElement>) на forEach
    ids.forEach((id) => {
        deleteArticleRequest(id);
    });

    return cy.wrap(null);
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: DeepPartial<Article>): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
            removeTestArticles(): Chainable<void>;
        }
    }
}
