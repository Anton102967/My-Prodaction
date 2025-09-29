import { Project } from 'ts-morph';
import path from 'path';

const project = new Project({});

// Загружаем все файлы
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();
const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(uiPath);
const componentsDirs = sharedUiDirectory?.getDirectories();

function isAbsolute(value: string) {
    const layers = ['app', 'entities', 'features', 'pages', 'shared', 'widgets'];
    return layers.some((layer) => value.startsWith(layer));
}

// Создаём index.ts для каждой папки в shared/ui
componentsDirs?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`;
    const indexFile = directory.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}';\n`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });
        file.save();
    }
});

// Исправляем импорты
files.forEach((sourceFile) => {
    let changed = false;

    const importDeclarations = sourceFile.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        // 1. Убираем все лишние "@/" и "@/@/"
        const valueWithoutAlias = value.replace(/^@\/+/, '');

        // 2. Разбиваем путь
        const segments = valueWithoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUiSlice = segments?.[1] === 'ui';

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUiSlice) {
            // 3. Берём только первые три сегмента: shared/ui/Component
            const result = segments.slice(0, 3).join('/');

            // 4. Ставим правильный алиас
            const newPath = `@/${result}`;
            if (value !== newPath) {
                console.log(`Fix import in ${sourceFile.getBaseName()}: ${value} -> ${newPath}`);
                importDeclaration.setModuleSpecifier(newPath);
                changed = true;
            }
        }
    });

    // Если были изменения — сохраняем файл
    if (changed) {
        sourceFile.saveSync();
    }
});

// Сохраняем проект
project.save().then(() => {
    console.log('Импорты успешно исправлены ✅');
});
