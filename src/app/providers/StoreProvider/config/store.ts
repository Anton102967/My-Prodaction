import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    }
    return configureStore<StateSchema>({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        preloadedState: initialState
    });
}
