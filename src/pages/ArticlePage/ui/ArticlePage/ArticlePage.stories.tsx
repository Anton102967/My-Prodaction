import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArticlePage from './ArticlePage';

export default {
    title: 'pages/ArticlePage',
    component: ArticlePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlePage>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ArticlePage> = (args) => <ArticlePage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
