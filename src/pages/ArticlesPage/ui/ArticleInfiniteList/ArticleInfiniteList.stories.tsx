import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ArticleInfiniteList } from './ArticleInfiniteList';

export default {
    title: 'pages/ArticleEditPage/ArticleInfiniteList',
    component: ArticleInfiniteList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        StoreDecorator({
            user: { authData: { id: '1', username: 'admin' } },
        }),
    ],
} as ComponentMeta<typeof ArticleInfiniteList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof ArticleInfiniteList> = (args) => <ArticleInfiniteList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
