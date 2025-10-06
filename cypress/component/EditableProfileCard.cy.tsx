import { EditableProfileCard } from '../../src/features/editableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/componentRender/componentRender';
import { User } from '../../src/entities/User';

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        const profileId = '1';
        const user: User = {
            id: profileId,
            username: 'testuser',
        };

        cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' }).as('getProfile');

        cy.mount(
            <TestProvider
                options={{
                    initialState: {
                        user: { authData: user },
                    },
                }}
            >
                <EditableProfileCard id={profileId} />
            </TestProvider>,
        );
        cy.wait('@getProfile');
        cy.getByTestId('EditableProfileCard.Error').should('not.exist');
        cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
        cy.getByTestId('EditableProfileCardHeader.EditButton').should('exist');
    });
});
