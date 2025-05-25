import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/config/tests/testAsyncThunk/testAsyncThunk';
import { loginByUsername } from './loginByUsername';

// Мокаем userActions.setAuthData
jest.mock('entities/User', () => ({
    userActions: {
        setAuthData: jest.fn((user) => ({ type: 'user/setAuthData', payload: user })),
    }
}));

// Типы (примерные)
interface User {
  id: string;
  username: string;
}

export interface LoginByUsernameProps {
  username: string;
  password: string;
}

// Данные для теста
const userValue: User = { id: '1', username: 'admin' };

describe('loginByUsername thunk', () => {
    test('успех: вызывает setAuthData и fulfilled', async () => {
        const api = { post: jest.fn() };
        const extra = { api };
        const thunk = new TestAsyncThunk(loginByUsername, extra);

        api.post.mockResolvedValue({ data: userValue });

        const result = await thunk.callThunk({ username: 'admin', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

});
