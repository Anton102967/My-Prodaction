import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Select from 'shared/ui/Select/Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: "Список",
    options: [
        {value: '123', content: 'Первый пункт'},
        {value: '1234', content: 'Второй пункт'}
    ]
};
