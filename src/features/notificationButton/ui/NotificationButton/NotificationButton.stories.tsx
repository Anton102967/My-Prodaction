import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NotificationButton } from './NotificationButton';

export default {
    title: 'features/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationButton>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
