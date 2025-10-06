import { EditableProfileCard } from '../../src/features/editableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.intercept('GET', 'http://localhost:8000/profile/*', { fixture: 'profile.json' }).as('getProfile');

        cy.mount(
            <TestProvider>
                <EditableProfileCard id="1" />
            </TestProvider>,
        );
    });
});
