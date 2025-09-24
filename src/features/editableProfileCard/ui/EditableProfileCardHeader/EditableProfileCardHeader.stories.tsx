import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';

export default {
    title: 'features/EditableProfileCardHeader',
    component: EditableProfileCardHeader,
    decorators: [
        StoreDecorator({
            user: { authData: { id: '1', username: 'admin' } },
        }),
    ],
} as ComponentMeta<typeof EditableProfileCardHeader>;

const Template: ComponentStory<typeof EditableProfileCardHeader> = (args) => (
    <EditableProfileCardHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
