import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Skeleton } from './Skeleton';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    width: '100%',
    height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
    border: '50%',
    height: 100,
    width: 100,
};
export const NormalDark = Template.bind({});
Normal.args = {
    width: '100%',
    height: 200,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)]
export const CircleDark = Template.bind({});
CircleDark.args = {
    border: '50%',
    height: 100,
    width: 100,
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)]
export const NormalOrange = Template.bind({});
Normal.args = {
    width: '100%',
    height: 200,
};
NormalOrange.decorators = [ThemeDecorator(Theme.ORANGE)]
export const CircleOrange = Template.bind({});
CircleOrange.args = {
    border: '50%',
    height: 100,
    width: 100,
};
CircleOrange.decorators = [ThemeDecorator(Theme.ORANGE)]
export const NormalGreen = Template.bind({});
NormalGreen.args = {
    width: '100%',
    height: 200,
};
NormalGreen.decorators = [ThemeDecorator(Theme.GREEN)]
export const CircleGreen = Template.bind({});
CircleGreen.args = {
    border: '50%',
    height: 100,
    width: 100,
};
CircleGreen.decorators = [ThemeDecorator(Theme.GREEN)]
