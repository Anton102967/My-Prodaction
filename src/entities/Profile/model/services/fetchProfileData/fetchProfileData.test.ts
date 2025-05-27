import { FetchProfileData } from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StateSchema } from 'app/providers/StoreProvider';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class TestAsyncThunk<T> {
    dispatch: jest.Mock;

    getState: jest.Mock;

    api: { get: jest.Mock; post: jest.Mock; };

    navigate: jest.Mock;

    actionCreator: any;

    constructor(actionCreator: any, state: DeepPartial<StateSchema> = {}) {
        this.dispatch = jest.fn();
        this.getState = jest.fn(() => state);
        this.api = {
            get: jest.fn(),
            post: jest.fn(),
        };
        this.navigate = jest.fn();
        this.actionCreator = actionCreator;
    }

    async callThunk(arg?: any) {
        let result: any;
        // eslint-disable-next-line prefer-const
        result = await this.actionCreator(arg)(
            this.dispatch,
            this.getState,
            { api: this.api, navigate: this.navigate },
        );
        return result;
    }
}
const data = {
    username: 'admin',
    age: 22,
    country: Country.Ukraine,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: Currency.USD,
};

describe('fetchProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(FetchProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error login', async () => {
        const thunk = new TestAsyncThunk(FetchProfileData);
        // eslint-disable-next-line prefer-promise-reject-errors
        thunk.api.get.mockReturnValue(Promise.reject({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
    });

});
