import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import Text from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, UpdateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/userAppDispatch/userAppDispatch';
import cls from './ProfilePageHeader.module.scss';

interface  ProfilePageHeaderProps {
        className?: string,

    }

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const {
        className,
    } = props;

    const { t } = useTranslation('profile');

    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    },[dispatch])

    const onCanelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    },[dispatch])

    const onSave = useCallback(() => {
        dispatch(UpdateProfileData())
    },[dispatch])

    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('Профиль')}/>
            { readonly
                ? (
                    <Button
                        className={cls.editBtn}
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEdit}
                    >
                        {t("Редактировать")}
                    </Button>
                )
                : (
                    <>
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onCanelEdit}
                        >
                            {t("Отменить")}
                        </Button>
                        <Button
                            className={cls.saveBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onSave}
                        >
                            {t("Сохранить")}
                        </Button>
                    </>
                )
            }
        </div>
    );
};

export default ProfilePageHeader;
