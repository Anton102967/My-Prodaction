import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm, Profile, ValidateProfileError } from 'entities/Profile';

import { validateProfileData } from '../validateProfileData/validateProfileData';

export const UpdateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/UpdateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const token = localStorage.getItem('token'); // Если храните иначе — поменяйте!
        const formData = getProfileForm(getState())
        const errors = validateProfileData(formData);

        if(errors.length) {
            return rejectWithValue(errors)
        }

        try {
            const response = await extra.api.put<Profile>(
                '/profile',
                formData,
                {
                    headers: {
                        Authorization: token || 'Bearer test', // Важно чтобы НЕ была пустая строка!
                    },
                }
            );
            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);


