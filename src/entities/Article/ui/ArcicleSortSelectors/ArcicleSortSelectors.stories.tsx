import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArcicleSortSelectors } from './ArcicleSortSelectors';

export default {
    title: 'entities/Article/ArcicleSortSelectors',
    component: ArcicleSortSelectors,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArcicleSortSelectors>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ArcicleSortSelectors> = (args) => <ArcicleSortSelectors {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
