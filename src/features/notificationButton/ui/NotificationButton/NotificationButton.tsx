import React, { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecatted/Button';
import { NotificationList } from '@/entities/Notification';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecatted/Popups';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import cls from './NotificationButton.module.scss';
import { Icon as IconDeprecated } from '@/shared/ui/deprecatted/Icon';
import { Drawer } from '@/shared/ui/deprecatted/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups/ui/Popover/Popover';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div>
                    <Icon
                        Svg={NotificationIcon}
                        clickable
                        onClick={onOpenDrawer}
                    />
                </div>
            }
            off={
                <div>
                    <ButtonDeprecated
                        onClick={onOpenDrawer}
                        theme={ButtonTheme.CLEAR}
                    >
                        <IconDeprecated
                            Svg={NotificationIconDeprecated}
                            inverted
                        />
                    </ButtonDeprecated>
                </div>
            }
        />
    );

    return (
        <div>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.NotificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                />
            </BrowserView>

            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
