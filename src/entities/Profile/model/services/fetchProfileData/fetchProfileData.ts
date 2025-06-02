import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const FetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    'profile/FetchProfileData',
    async (profileId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const token = localStorage.getItem('token'); // Если храните иначе — поменяйте!


        try {
            const response = await extra.api.get<Profile>(
                `/profile/${  profileId}`,
                {
                    headers: {
                        Authorization: token || 'Bearer test', // Важно чтобы НЕ была пустая строка!
                    },
                },
            );

            if (!response) {
                throw new Error();
            }


            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue('error');
        }
    },
);

