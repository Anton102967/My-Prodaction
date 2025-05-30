import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Avatar from 'shared/ui/Avatar/Avatar';
import AvatarImg from './Storybook Avatar.jpg';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    size: 150,
    src:AvatarImg,
};
export const Small = Template.bind({});
Primary.args = {
    size: 50,
    src:AvatarImg,
};
