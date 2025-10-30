import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Flex } from './Flex';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};

export const Сolumn = Template.bind({});
Сolumn.args = {
    direction: 'column',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};

export const СolumnAlignStart = Template.bind({});
СolumnAlignStart.args = {
    direction: 'column',
    align: 'start',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};

export const СolumnAlignEnd = Template.bind({});
СolumnAlignEnd.args = {
    direction: 'column',
    align: 'end',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
    gap: '4',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};
export const RowGap8 = Template.bind({});
RowGap8.args = {
    gap: '8',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};
export const RowGap16 = Template.bind({});
RowGap16.args = {
    gap: '16',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};
export const RowGap32 = Template.bind({});
RowGap32.args = {
    gap: '32',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
    direction: 'column',
    gap: '4',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};
export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
    direction: 'column',
    gap: '8',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};
export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
    direction: 'column',
    gap: '16',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
    direction: 'column',
    gap: '32',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
};
