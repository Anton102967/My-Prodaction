import { TestAsyncThunk } from 'shared/config/tests/testAsyncThunk/testAsyncThunk';
import { userActions } from 'entities/User';
import { loginByUsername } from './loginByUsername';

// window.localStorage mock, если требуется
const localStorageMock = (() => {
    let store: Record<string, any> = {};
    return {
        getItem(key: string) {
            return store[key] ?? null;
        },
        setItem(key: string, value: any) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        },
        removeItem(key: string) {
            delete store[key];
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('entities/User', () => ({
    userActions: {
        setAuthData: jest.fn((user) => ({ type: 'user/setAuthData', payload: user })),
    }
}));

test('loginByUsername успех', async () => {
    const api = { post: jest.fn() };
    api.post.mockResolvedValue({ data: { id: '1', username: 'admin' } });

    const testThunk = new TestAsyncThunk(loginByUsername);
    testThunk.api = api; // <--- подмена

    await testThunk.callThunk({ username: 'admin', password: '123' });

    expect(api.post).toHaveBeenCalledWith('/login', { username: 'admin', password: '123' });

    expect(testThunk.dispatch).toHaveBeenCalledWith(
        userActions.setAuthData({ id: '1', username: 'admin' })
    );

    // Проверка localStorage если нужно
    expect(window.localStorage.getItem('user')).toBe(JSON.stringify({ id: '1', username: 'admin' }));
});
