import React, { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecatted/Card';
import { Text } from '@/shared/ui/deprecatted/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';
import { getFeatureFlag } from '@/shared/features';
import redesignedPopupCls from '@/shared/ui/redesigned/Popups/styles/popup.module.scss';
import deprecatedPopupCls from '@/shared/ui/deprecatted/Popups/styles/popup.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;
    const [isActive, setIsActive] = useState(false);

    const activate = useCallback(() => {
        setIsActive(true);
    }, []);

    const deactivate = useCallback(() => {
        setIsActive(false);
    }, []);

    const activeClass = getFeatureFlag('isAppRedesigned')
        ? redesignedPopupCls.active
        : deprecatedPopupCls.active;

    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={classNames(
                cls.NotificationItem,
                { [activeClass]: isActive },
                [className],
            )}
            tabIndex={0}
            onMouseEnter={activate}
            onMouseLeave={deactivate}
            onFocus={activate}
            onBlur={deactivate}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <a
                className={classNames(cls.link, { [activeClass]: isActive })}
                target="_blank"
                href={item.href}
                rel="noreferrer"
                onMouseEnter={activate}
                onMouseLeave={deactivate}
                onFocus={activate}
                onBlur={deactivate}
            >
                {content}
            </a>
        );
    }
    return content;
});
