import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginForm from 'features/AuthByUsername/ui/LoginForm/LoginForm';

export default {
    title: 'shared/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
