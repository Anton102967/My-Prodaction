import type { Configuration, RuleSetRule } from 'webpack';
import { DefinePlugin } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

const config = {
    stories: ['../../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
            },
        },
        '@storybook/addon-interactions',
        'storybook-addon-mock/register',
        'storybook-addon-themes',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    webpackFinal: async (storybookConfig: Configuration) => {
        const srcPath = path.resolve(__dirname, '..', '..', 'src');

        if (!storybookConfig.resolve) {
            storybookConfig.resolve = {};
        }

        storybookConfig.resolve.modules = storybookConfig.resolve.modules || [];
        storybookConfig.resolve.modules.push(srcPath);

        storybookConfig.resolve.extensions =
            storybookConfig.resolve.extensions || [];
        storybookConfig.resolve.extensions.push('.ts', '.tsx');

        storybookConfig.resolve.alias = {
            ...(storybookConfig.resolve.alias || {}),
            '@': srcPath,
        };

        if (!storybookConfig.module) {
            storybookConfig.module = { rules: [] };
        }

        storybookConfig.module.rules = (storybookConfig.module.rules || []).map(
            (rule) => {
                if (typeof rule === 'string') {
                    return rule;
                }

                const ruleWithTest = rule as RuleSetRule;
                const { test } = ruleWithTest;

                if (test && test instanceof RegExp && test.test('.svg')) {
                    return {
                        ...ruleWithTest,
                        exclude: /\.svg$/i,
                    };
                }

                if (typeof test === 'string' && /svg/.test(test)) {
                    return {
                        ...ruleWithTest,
                        exclude: /\.svg$/i,
                    };
                }

                return rule;
            },
        );

        storybookConfig.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        storybookConfig.module.rules.push(buildCssLoader(true));

        storybookConfig.plugins = storybookConfig.plugins || [];
        storybookConfig.plugins.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify('https://testapi.ru'),
                __PROJECT__: JSON.stringify('storybook'),
            }),
        );

        return storybookConfig;
    },
};

export default config;
