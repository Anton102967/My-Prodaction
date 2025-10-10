import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../model/types/jsonSettings';
import { setJsonSettingsMutation } from '../api/userApi';
import { getUserAuthData } from '../model/selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../model/selectors/jsonSettings';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('No saved user data');
    }

    try {
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
        ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('No settings returned');
        }

        return response.jsonSettings;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
