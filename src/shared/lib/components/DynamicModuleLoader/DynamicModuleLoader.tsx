import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManegar } from 'app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList,
    removeAfterUnmout?: boolean,
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmout,
    } = props;
    const store = useStore() as ReduxStoreWithManegar;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name , reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: '@INIT loginForm reducer' });
        });
        return () => {
            Object.entries(reducers).forEach(([name, reducer]) => {
                if (removeAfterUnmout) {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                }
            });
        };
    }, [dispatch, reducers, removeAfterUnmout, store.reducerManager]);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};

export default DynamicModuleLoader;
