import { classNames } from 'shared/lib/classNames/classNames';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    FetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidateProfileError,
} from 'entities/Profile';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/userAppDispatch/userAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import Text, { TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';


const reducers: ReducerList = {
    profile: profileReducer,
}

    interface  ProfilePageProps {
        className?: string,

    }

const ProfilePage = ({className}: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const dispatch =useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors) ;

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректное имя пользователя'),
    }

    useEffect(() => {
        if(__PROJECT__ !== 'storybook') {
            dispatch(FetchProfileData())
        }
    }, [dispatch]);

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))

    }, [dispatch])

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [dispatch])

    const onChangeAge = useCallback((value?: string) => {
        const numeric = value?.replace(/\D/g, '') || '';
        dispatch(profileActions.updateProfile({ age: Number(numeric) }))
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}))
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}))
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency?: Currency) => {
        dispatch(profileActions.updateProfile({ currency }))

    }, [dispatch]);

    const onChangeCountry = useCallback((country?: Country) => {
        dispatch(profileActions.updateProfile({ country }))
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmout>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {Array.isArray(validateErrors) && validateErrors.length > 0 && (
                    validateErrors.filter(err => !!err)
                        .map((err) => (
                            <Text key={err} theme={TextTheme.ERROR} text={typeof err === 'string'
                                ? validateErrorTranslates[err]
                                : String(validateErrorTranslates[err])}/>
                        )
                        )
                )
                }
                <ProfileCard
                    data={formData}
                    isLoading = {isLoading}
                    error = {error}
                    readonly={readonly}
                    onChangeFirstname = {onChangeFirstname}
                    onChangeLastname = {onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </div>
        </DynamicModuleLoader>

    );
};

export default ProfilePage;
