import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ArticlesPagesFilters } from './ArticlesPagesFilters';

export default {
    title: 'entities/Article/ArticlesPagesFilters',
    component: ArticlesPagesFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPagesFilters>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ArticlesPagesFilters> = (args) => <ArticlesPagesFilters {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
