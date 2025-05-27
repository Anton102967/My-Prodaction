import { TestAsyncThunk } from 'shared/config/tests/testAsyncThunk/testAsyncThunk';
import { UpdateProfileData, ValidateProfileError } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

describe('updateProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(UpdateProfileData, {
            profile: {
                form: data,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    // test('error', async () => {
    //     const thunk = new TestAsyncThunk(UpdateProfileData, {
    //         profile: {
    //             form: data,
    //         },
    //     });
    //     // Возвращаем объект без data
    //     thunk.api.put.mockReturnValue(Promise.resolve({}));
    //
    //     const result = await thunk.callThunk();
    //
    //     expect(result.meta.requestStatus).toBe('rejected');
    //     expect(result.payload).toEqual([
    //         ValidateProfileError.SERVER_ERROR,
    //     ]);
    // });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(UpdateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
});
