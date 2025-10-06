import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { selectByTestId } from '../../helpers/selectByTestId';

export const updateProfile = (firstName: string, lastName: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.firstName').clear().type(firstName);
    cy.getByTestId('ProfileCard.lastName').clear().type(lastName);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { authorization: 'hi' },
        body: {
            id: '4',
            first: 'test',
            lastname: 'user',
            age: 25,
            currency: 'RUB',
            country: 'Russia',
            city: 'Moscow',
            username: 'testuser',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstName: string, lastName: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
