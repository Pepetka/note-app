## Production build

**[Note App](https://note-app-ebfd8.web.app/)**

---

## Запуск проекта

- `npm install` - установка зависимостей

- `npm start` - запуск dev проекта

- `npm run start:dev` - запуск dev проекта + запуск storybook

---

## Скрипты

- `npm start` - запуск dev проекта

- `npm run start:dev` - запуск dev проекта + запуск storybook

- `npm run build` - сборка проекта

- `npm run test:unit` - запуск unit тесов с jest

- `npm run test:unit:nowatch` - запуск unit тесов с jest без отслеживания изменений в файлах

- `npm run test:ui` - запуск скриншотных тестов с loki

- `npm run test:ui:report` - генерация отчета по скриншотным тестам

- `npm run test:ui:ok` - подтверждения новых скриншотов

- `npm run test:ui:update` - обновление скриншотов

- `npm run lint:ts` - проверка ts файлов линтером

- `npm run lint:ts:fix` - исправление ts файлов линтером

- `npm run lint:scss` - проверка scss файлов style-линтером

- `npm run lint:scss:fix` - исправление scss файлов style-линтером

- `npm run storybook` - запуск storybook

- `npm run storybook:build` - сборка storybook

- `npm run prepare` - прекоммит хуки с husky

---

## Интернационализация проекта

Для интернационализации проекта используется библиотека i18next.
Переводы хранятся в `public/locales`.
Конфиг хранится в `src/localization`.

Для комфортной работы с библиотекой рекомендуется установка соответствующих плагинов для среды разработки.

Документация библиотеки - [i18next](https://react.i18next.com/)


---

## Тестирование

Тестирование состоит их 3 типов тестов:
1) `npm run test:unit` - unit тестирование с jest
2) `npm run test:unit` - тестирование компонентов с React testing library
3) `npm run test:ui` - скриншотное тестирование ui с loki

[Подробнее о тестировании](./docs/test.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

##### Скрипты для запуска линтеров
- `npm run lint:ts` - проверка ts файлов линтером
- `npm run lint:ts:fix` - исправление ts файлов линтером
- `npm run lint:scss` - проверка scss файлов style-линтером
- `npm run lint:scss:fix` - исправление scss файлов style-линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.

Файл со стори-кейсами (.stories.tsx) находятся рядом с компонентом.

`npm run storybook` - запуск storybook

[Подробнее о Storybook](./docs/storybook.md)

---

## CI pipeline и pre-commit хуки

Конфигурация github actions находится в /.github/workflows.
В ci прогоняются все виды тестов, сборка проекта и storybook, линтинг.

В прекоммит хуках происходит проверка линтинга, конфиг находится в [/.husky](./.husky)

---

## Работа с состоянием проекта

Взаимодействие с данными осуществляется с помощью менеджера состояния redux toolkit.

Запросы на сервер отправляются с применением [Axios в async thunk](./src/shared/api/api.ts).

Для асинхронного подключения reducer используется
[ReducerManager](./src/store/model/reducerManager/reducerManager.ts), применяемый в HOC
[DynamicModuleLoader](./src/store/ui/DynamicModuleLoader/DynamicModuleLoader.tsx)

---
