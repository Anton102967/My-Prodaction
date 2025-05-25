import { profileActions, profileReducer, ProfileSchema, UpdateProfileData } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
}
describe('profileSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<ProfileSchema> = {readonly: false}
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true)
        )).toEqual({ readonly: true})
    });

    test('test cancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {data, form: {username: ''}}
        expect(profileReducer(
        state as ProfileSchema,
        profileActions.cancelEdit()
        )).toEqual({
            readonly: true,
            validateErrors: undefined,
            data,
            form: data,
        })
    });
    test('test update Profile', () => {
        const state: DeepPartial<ProfileSchema> = { isLoading: true,};

        expect(profileReducer(
            state as ProfileSchema,
            UpdateProfileData.fulfilled(data, '', )
        )).toEqual({
            isLoading: false,
            validateErrors: undefined,
            readonly: true,
            validateError: undefined,
            form: data,
            data,

        });
    });

});
