import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Modal from 'shared/ui/Modal/Modal';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Modal',
    component: Modal,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Modal>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, praesentium sit. Deleniti et ex labore nihil, nobis quaerat saepe tempore,',
};
export const Dark = Template.bind({});
Dark.args = {
    isOpen: true,
    children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, praesentium sit. Deleniti et ex labore nihil, nobis quaerat saepe tempore,',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
