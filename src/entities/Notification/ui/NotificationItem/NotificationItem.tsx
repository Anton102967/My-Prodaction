import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Card as CardDeprecarted,
    CardTheme,
} from '@/shared/ui/deprecatted/Card';
import { Text as TextDeprecarted } from '@/shared/ui/deprecatted/Text';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <Text title={item.title} text={item.description} />
                </Card>
            }
            off={
                <CardDeprecarted
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [
                        className,
                    ])}
                >
                    <TextDeprecarted
                        title={item.title}
                        text={item.description}
                    />
                </CardDeprecarted>
            }
        />
    );

    if (item.href) {
        return (
            <a
                className={cls.link}
                target="_blank"
                href={item.href}
                rel="noreferrer"
            >
                {content}
            </a>
        );
    }
    return content;
});
