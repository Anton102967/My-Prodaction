import { EditableProfileCard } from '../../src/features/editableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        const apiUrl = Cypress.env('apiUrl');
        cy.intercept('GET', `${apiUrl}/profile/*`, { fixture: 'profile.json' }).as('getProfile'); cy.mount(
            <TestProvider>
                <EditableProfileCard id="1" />
            </TestProvider>,
        );
    });
});
