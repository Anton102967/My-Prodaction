import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: webpack.Configuration }) => {
    // Корень репозитория — подняться из config/storybook/ к корню проекта
    const root = path.resolve(__dirname, '..', '..');

    // Все нужные поля BuildPaths — даже если они не используются, чтобы не было TSError
    const paths: BuildPaths = {
        entry: '', // Storybook не использует
        build: '', // Storybook не использует
        html: '', // Storybook не использует
        src: path.resolve(root, 'src'),
        locales: '',
        buildLocales: '',
    };

    // Добавляем алиас src в modules для абсолютных импортов
    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts', '.tsx');

    // Исправляем работу со svg — сначала исключаем из общего rule
    // @ts-ignore
    config!.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
        if (rule && rule.test && /svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    // Добавляем свой loader для svg
    config!.module!.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    // Добавляем loader для css/scss
    config!.module!.rules.push(buildCssLoader(true));

    // Глобальные константы для Storybook
    config!.plugins!.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify(''),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    );

    // Возвращаем обновлённую конфигурацию
    return config;
};
