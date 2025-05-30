import { ComponentMeta, ComponentStory } from '@storybook/react';
import Text, { TextSize, TextTheme } from 'shared/ui/Text/Text';
import React from 'react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Text lorem ipsun',
    text: 'Text Text Text Text Text',
};
export const Error = Template.bind({});
Error.args = {
    title: 'Text lorem ipsun',
    text: 'Text Text Text Text Text',
    theme: TextTheme.ERROR,
};

export const onlyTitle = Template.bind({});
onlyTitle.args = {
    title: 'Title lorem ipsum',
};

export const onlyText = Template.bind({});
onlyText.args = {
    text: 'Description Description Description',
};
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Text lorem ipsun',
    text: 'Text Text Text Text Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
    title: 'Title lorem ipsum',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
    text: 'Description Description Description',
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Text lorem ipsun',
    text: 'Text Text Text Text Text',
    size: TextSize.L,
}
export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Text lorem ipsun',
    text: 'Text Text Text Text Text',
    size: TextSize.M,
};
