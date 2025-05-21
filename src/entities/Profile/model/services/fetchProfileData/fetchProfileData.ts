import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const FetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/FetchProfileData',
    async (_, thunkAPI) => {
        const {extra, rejectWithValue} = thunkAPI

        try {
            const response = await extra.api.get<Profile>('/profile');

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
