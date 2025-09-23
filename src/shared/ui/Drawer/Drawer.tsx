import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    memo, ReactNode, useCallback, useEffect,
} from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { useDrag } from '@use-gesture/react';
import { a, config, useSpring } from '@react-spring/web';
import { Overlay } from '../Overlay/Overlay';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight - 100;

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy,
    } = props;

    const [{ y }, api] = useSpring(() => ({ y: height }));
    const { theme } = useTheme();

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    const close = useCallback(
        (velocity = 0) => {
            api.start({
                y: height,
                immediate: false,
                config: { ...config.stiff, velocity },
                onResolve: onClose,
            });
        },
        [api, onClose],
    );

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        } else {
            close();
        }
    }, [isOpen, openDrawer, close]);

    const bind = useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (lazy && !isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    return (
        <Portal>
            <div
                className={classNames(cls.Drawer, mods, [className, theme, 'app_drawer'])}
            >
                <Overlay onClick={() => close()} />
                <a.div
                    className={cls.sheet}
                    {...bind()}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                >
                    {children}
                </a.div>
            </div>
        </Portal>
    );
});
