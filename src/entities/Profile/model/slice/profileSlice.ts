import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchProfileData, UpdateProfileData } from 'entities/Profile';
import { Profile, ProfileSchema } from '../types/profile';


const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    validateErrors: [],
};
export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;

        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
        },
    },
    extraReducers: (builder) => {
        builder

        // FetchProfileData

            .addCase(FetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(FetchProfileData.fulfilled,
                (state,
                    action: PayloadAction<Profile>
                ) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                })
            .addCase(FetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        // UpdateProfileData

            .addCase(UpdateProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(UpdateProfileData.fulfilled,
                (state,
                    action: PayloadAction<Profile>
                ) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.readonly = true;
                    state.validateErrors = undefined;
                })
            .addCase(UpdateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            })
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
