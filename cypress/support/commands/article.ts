import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: 'Testing Article!',
    subtitle: 'Экономика',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJ9OQRwwIevgdIgaUOidN8spC7_RaSg1Vew&s',
    views: 1022,
    createdAt: '26.02.2022',
    userId: '1',
    type: [
        'ECONOMICS',
    ],
    blocks: [],
};

export const createArticle = (article?: Article) => {
    return cy.request({
        method: 'POST',
        url: 'http://localhost:8000/articles',
        headers: { authorization: 'hi' },
        body: article ?? defaultArticle,
    }).then((response) => response.body);
};

export const removeArticle = (profileId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${profileId}`,
        headers: { authorization: 'hi' },
    });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      removeArticle(profileId: string): Chainable<void>;
    }
  }
}
