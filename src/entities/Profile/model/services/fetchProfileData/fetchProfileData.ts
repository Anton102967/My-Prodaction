import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from 'entities/Profile';

export const FetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/FetchProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;
        const token = localStorage.getItem('token'); // Если храните иначе — поменяйте!


        try {
            const response = await extra.api.get<Profile>(
                '/profile',
                {
                    headers: {
                        Authorization: token || 'Bearer test', // Важно чтобы НЕ была пустая строка!
                    },
                }
            );

            if(!response) {
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

