import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    comment: [
        {
            id: '1',
            text: 'hello world',
            user: { id: '1', username: 'Vasya' },
        },
        {
            id: '2',
            text: 'Comment 2',
            user: { id: '1', username: 'Dima' },
        },
    ],
};
export const Loading = Template.bind({});
Loading.args = {
    comment: [],
    isLoading: true,
};
