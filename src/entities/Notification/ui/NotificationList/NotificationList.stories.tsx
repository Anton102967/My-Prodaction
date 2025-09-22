import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationList } from './NotificationList';

export default {
    title: 'shared/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
