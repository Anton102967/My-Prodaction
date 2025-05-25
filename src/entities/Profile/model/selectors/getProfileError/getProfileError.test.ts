import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileError } from 'entities/Profile';

describe('getProfileError.test', () => {
    test('should return error', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = {
            username: 'admin',
            age: 22,
            country: Country.Ukraine,
            lastname: 'ulbi tv',
            first: 'asd',
            city: 'asf',
            currency: Currency.USD,
        }
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: '123',
            }
        }
        expect(getProfileError(state as StateSchema)).toEqual('123');
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });

});
