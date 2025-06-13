import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AricleDetailsPageHeader } from './AricleDetailsPageHeader';

export default {
    title: 'shared/AricleDetailsPageHeader',
    component: AricleDetailsPageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AricleDetailsPageHeader>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof AricleDetailsPageHeader> = (args) => <AricleDetailsPageHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
