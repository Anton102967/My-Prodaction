export const addComment = (text: string) => {
    cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click();
};

export const createArticleComments = (commentsId?: string, text = 'test comment') => {
    return cy.request({
        method: 'POST',
        url: `http://localhost:8000/comments?articleId=${commentsId}`,
        headers: { authorization: 'hi' },
        body: {
            commentsId,
            userId: '1',
            text,
        },
    }).then((response) => response.body);
};

export const removeArticleComments = (articleId: string) => {
    return cy.request({
        method: 'GET',
        url: `http://localhost:8000/comments?articleId=${articleId}`,
        headers: { authorization: 'hi' },
    }).then((response) => {
        const comments = response.body as Array<{ id: string }>;
        comments.forEach((c) => {
            cy.request({
                method: 'DELETE',
                url: `http://localhost:8000/comments/${c.id}`,
                headers: { authorization: 'hi' },
                failOnStatusCode: false,
            });
        });
    });
};

declare global {
  namespace Cypress {
    interface Chainable {
      addComment(text: string): Chainable<void>;
      createArticleComments(commentsId: string): Chainable<string>;
      removeArticleComments(ArticleId: string): Chainable<void>
    }
  }
}
