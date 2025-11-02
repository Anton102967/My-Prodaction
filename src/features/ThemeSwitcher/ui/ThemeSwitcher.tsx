import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { Button, ButtonTheme } from '@/shared/ui/deprecatted/Button/Button';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon as IconDeprecated } from '@/shared/ui/deprecatted/Icon';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            console.log(`Тема сменилась на ${newTheme}`);
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [toggleTheme, dispatch]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<Icon Svg={ThemeIcon} clickable onClick={onToggleHandler} />}
            off={
                <Button
                    theme={ButtonTheme.CLEAR}
                    className={classNames('', {}, [className])}
                    onClick={onToggleHandler}
                >
                    <IconDeprecated
                        Svg={ThemeIconDeprecated}
                        width={40}
                        height={40}
                        inverted
                    />
                </Button>
            }
        />
    );
});
