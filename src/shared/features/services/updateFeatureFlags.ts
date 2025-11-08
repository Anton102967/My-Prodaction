// создаём асинхронный thunk (асинхронное действие Redux Toolkit)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeature } from '../lib/setGetFeatures';

interface UpdateFeatureFlagOptions {
    userId: string;
    newFeatures: Partial<FeatureFlags>;
}
export const updateFeatureFlag = createAsyncThunk<
    void,
    UpdateFeatureFlagOptions,
    ThunkConfig<string>
>(
    'user/saveJsonSettings',

    async ({ userId, newFeatures }, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            await dispatch(
                updateFeatureFlagsMutation({
                    userId,
                    features: {
                        ...getAllFeature(),
                        ...newFeatures,
                    },
                }),
            );

            window.location.reload();

            return undefined;
        } catch (e) {
            console.log(e);

            return rejectWithValue('');
        }
    },
);
