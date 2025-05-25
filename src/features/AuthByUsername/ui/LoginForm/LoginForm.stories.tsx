import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginForm from 'features/AuthByUsername/ui/LoginForm/LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'shared/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [
    StoreDecorator(
        { loginForm: { username: '123', password: 'asd' } },
        {},
    ),
];

export const withError = Template.bind({});
withError.args = {};
withError.decorators = [
    StoreDecorator(
        { loginForm: { username: '123', password: 'asd', error: 'Пролизошла ошибка' } },
        {},
    ),
];

export const isLoading = Template.bind({});
isLoading.args = {};
isLoading.decorators = [
    StoreDecorator(
        { loginForm: { isLoading: true } },
        {},
    ),
];
