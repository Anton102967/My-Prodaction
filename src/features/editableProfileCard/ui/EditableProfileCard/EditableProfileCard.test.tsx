import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile, profileReducer } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { userEvent } from '@storybook/testing-library';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 465,
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin213',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin ' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('Режим рид онли должен переключаться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('При отмене значение должно обнуляться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'user');

        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('admin');
    });

    test('Должна появиться ошибка', async () => {
        componentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(await screen.findByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        const mockPutReq = jest.spyOn($api, 'put');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        // Меняем firstName на валидное значение
        await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'user');

        // Жмём сохранить
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        // Проверяем, что ушёл PUT
        expect(mockPutReq).toHaveBeenCalled();
    });
});
