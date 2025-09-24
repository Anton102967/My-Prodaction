import React, {
    memo, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';
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

export const DrawerContext = memo((props: DrawerProps) => {
    const {
        className,
        children,
        onClose,
        isOpen,
        lazy,
    } = props;

    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
    const { theme } = useTheme();

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    const close = useCallback(
        (velocity = 0) => {
            api.start({
                y: height,
                immediate: false,
                config: { ...Spring.config.stiff, velocity },
                onResolve: onClose,
            });
        },
        [Spring.config.stiff, api, onClose],
    );

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        } else {
            close();
        }
    }, [isOpen, openDrawer, close]);

    const bind = Gesture.useDrag(
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
                {isOpen && <Overlay onClick={() => close()} />}
                <Spring.a.div
                    className={cls.sheet}
                    {...bind()}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    if (!isLoaded) {
        return null;
    }

    return <DrawerContext {...props} />;
};

export const Drawer = (props: DrawerProps) => {
    return (
        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    );
};
