export const addComment = (text: string) => {
    cy.getByTestId('AddCommentForm.Input').type(text);
    cy.getByTestId('AddCommentForm.Button').click();
};

export const createArticleComments = (
    commentsId?: string,
    text = 'test comment',
) => {
    return cy
        .request({
            method: 'POST',
            url: `http://localhost:8000/comments?articleId=${commentsId}`,
            headers: { authorization: 'hi' },
            body: {
                commentsId,
                userId: '1',
                text,
            },
        })
        .then((response) => response.body);
};

export const removeArticleComments = (articleId: string) => {
    if (!articleId) {
        return cy.wrap(null);
    }

    return cy
        .request<Array<{ id: string }>>({
            method: 'GET',
            url: 'http://localhost:8000/comments',
            headers: { authorization: 'hi' },
            qs: { articleId },
        })
        .then(({ body }) => {
            if (!Array.isArray(body) || body.length === 0) {
                return;
            }

            body.forEach((comment) => {
                cy.request({
                    method: 'DELETE',
                    url: `http://localhost:8000/comments/${comment.id}`,
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
            removeArticleComments(ArticleId: string): Chainable<void>;
        }
    }
}
