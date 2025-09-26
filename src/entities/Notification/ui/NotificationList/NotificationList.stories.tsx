import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Уведомление',
                    description: 'Наймите меня',
                },
                {
                    id: '2',
                    title: 'Уведомление 2',
                    description: 'Наймите меня 2',
                },
                {
                    id: '3',
                    title: 'Уведомление 3',
                    description: 'Наймите меня 3',
                },
            ],
        },
    ],
};
