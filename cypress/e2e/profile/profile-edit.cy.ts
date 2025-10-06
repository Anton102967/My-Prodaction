import { User } from '../../../src/entities/User';

let profileId = '  q';
describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data: User) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });

    afterEach(() => {
        cy.resetProfile(profileId);
    });

    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.firstName').should('have.value', 'test');
    });

    it('И редактирует его', () => {
        const newName = 'new';
        const newLastName = 'lastName';
        cy.updateProfile(newName, newLastName);
        cy.getByTestId('ProfileCard.firstName').should('have.value', newName);
        cy.getByTestId('ProfileCard.lastName').should(
            'have.value',
            newLastName,
        );
    });
});
