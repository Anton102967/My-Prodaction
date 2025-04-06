/* eslint-disable object-curly-spacing */
import {addDecorator} from '@storybook/react';
import {StyleDecorator} from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import {ThemeDecorator} from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import {Theme} from '../../src/app/providers/ThemeProvider';
import {RouterDecorator} from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
/* eslint-disable object-curly-spacing */
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
