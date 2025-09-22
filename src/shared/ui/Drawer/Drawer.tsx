import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Overlay } from '../../ui/Overlay/Overlay';
import { Portal } from '../../ui/Portal/Portal';
import cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: React.ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
    } = props;

    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    return (
        <Portal>
            <div
                className={classNames(cls.Drawer, mods, [
                    className,
                    theme,
                    'app_drawer',
                ])}
            >
                <Overlay onClick={onClose} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
