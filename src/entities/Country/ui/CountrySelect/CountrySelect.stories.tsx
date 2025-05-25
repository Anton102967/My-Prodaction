import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CountrySelect from 'entities/Country/ui/CountrySelect/CountrySelect';

export default {
    title: 'entities/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
