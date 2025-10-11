// Импортируем необходимые сущности из библиотеки ts-morph
// (она позволяет работать с AST — структурой кода TypeScript как с объектами)
import { JsxAttribute, Node, Project, SyntaxKind } from 'ts-morph';

// ----------------------
// Получаем аргументы из командной строки
// Например: npm run remove-feature isArticleRatingEnabled on
// ----------------------
const removedFeatureName = process.argv[2]; // имя фича-флага, который нужно удалить
const featureState = process.argv[3]; // состояние (on / off)

// Имена функции и компонента, которые отвечают за фичи в коде
// toggleFeatures(...) — вызов функции
// <ToggleFeatures ... /> — JSX-компонент
const toggleFunctionName = 'toggleFeatures';
const toggleComponentName = 'ToggleFeatures';

// Проверка: если не передано имя фичи → ошибка
if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага');
}

// Проверка: если не передано состояние → ошибка
if (!featureState) {
    throw new Error('Укажите состояние фичи (on или off)');
}

// Проверка: если состояние не "on" и не "off" → ошибка
if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное значение состояния фичи (on или off)');
}

// ----------------------
// Создаём новый проект ts-morph и добавляем в него файлы проекта
// ----------------------
const project = new Project({});

// Можно подключить все файлы, но здесь для примера подключён конкретный
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Получаем все файлы проекта
const files = project.getSourceFiles();

// ----------------------
// Проверка: является ли данный узел вызовом функции toggleFeatures()
// ----------------------
function isToggleFunction(node: Node) {
    let isToggleFeature = false;

    node.forEachChild((child) => {
        if (
            child.isKind(SyntaxKind.Identifier) && // если это идентификатор
            child.getText() === toggleFunctionName // и имя совпадает с toggleFeatures
        ) {
            isToggleFeature = true;
        }
    });

    return isToggleFeature;
}

// ----------------------
// Проверка: является ли JSX-элемент компонентом <ToggleFeatures />
// ----------------------
function isToggleComponent(node: Node) {
    const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);
    return identifier?.getText() === toggleComponentName;
}

// ----------------------
// Замена вызова toggleFeatures({...})
// ----------------------
const replaceToggleFunction = (node: Node) => {
    // Находим объект с аргументами (например { name: 'flag', on: ..., off: ... })
    const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
    );

    if (!objectOptions) return;

    // Получаем свойства on/off/name из объекта
    const onFunctionProperty = objectOptions.getProperty('on');
    const offFunctionProperty = objectOptions.getProperty('off');
    const featureNameProperty = objectOptions.getProperty('name');

    // Находим стрелочные функции внутри свойств on/off
    const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );
    const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
    );

    // Извлекаем значение name: 'isFeatureEnabled' → "isFeatureEnabled"
    const featureName = featureNameProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

    // Если флаг не совпадает с тем, что нужно удалить → пропускаем
    if (featureName !== removedFeatureName) return;

    // Если нужно оставить ветку "on" — заменяем весь вызов на содержимое on-функции
    if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
    }

    // Если нужно оставить ветку "off" — заменяем на off-функцию
    if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
    }
};

// ----------------------
// Вспомогательная функция: находит атрибут JSX по имени
// Например <ToggleFeatures on={...} off={...} feature="flag" />
// ----------------------
const getAttributeNodeByName = (
    jsxAttributes: JsxAttribute[],
    name: string,
) => {
    return jsxAttributes.find((node) => node.getName() === name);
};

// ----------------------
// Получение текста выражения из атрибута JSX
// Например on={<Component />} → "<Component />"
// ----------------------
const getReplacedComponent = (attribute?: JsxAttribute) => {
    const value = attribute
        ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
        ?.getExpression()
        ?.getText();

    // Убираем лишние скобки, если JSX выражение было в скобках
    if (value?.startsWith('(')) {
        return value.slice(1, -1);
    }

    return value;
};

// ----------------------
// Замена JSX-компонента <ToggleFeatures ... />
// ----------------------
const replaceComponent = (node: Node) => {
    const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

    // Находим атрибуты on/off/feature
    const onAttribute = getAttributeNodeByName(attributes, 'on');
    const offAttribute = getAttributeNodeByName(attributes, 'off');
    const featureNameAttribute = getAttributeNodeByName(attributes, 'feature');

    // Получаем имя фичи из feature="..."
    const featureName = featureNameAttribute
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        ?.slice(1, -1);

    // Если фича не та — пропускаем
    if (featureName !== removedFeatureName) return;

    // Извлекаем JSX из on/off
    const offValue = getReplacedComponent(offAttribute);
    const onValue = getReplacedComponent(onAttribute);

    // Если фича включена → подставляем on JSX
    if (featureState === 'on' && onValue) {
        node.replaceWithText(onValue);
    }

    // Если выключена → подставляем off JSX
    if (featureState === 'off' && offValue) {
        node.replaceWithText(offValue);
    }
};

// ----------------------
// Проходимся по каждому файлу и заменяем все вхождения
// ----------------------
files.forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
        // Если это вызов toggleFeatures(...)
        if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
            replaceToggleFunction(node);
        }

        // Если это JSX-компонент <ToggleFeatures ... />
        if (
            node.isKind(SyntaxKind.JsxSelfClosingElement) &&
            isToggleComponent(node)
        ) {
            replaceComponent(node);
        }
    });
});

// ----------------------
// Сохраняем изменения в файлах
// ----------------------
project.save();
