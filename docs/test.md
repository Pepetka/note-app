## Unit тестирование

Unit тестирование производится с помощью фреймворка *Jest*.

`npm run test:unit` - запуск unit тестирования

Для генерации отчета тестирования используется jest-html-reporters.
Отчет хранится в [jest_html_reporters.html](../jest_html_reporters.html).

Файлы тестов хранятся рядом с тестируемыми файлами.

Документация фреймворка - [jest](https://jestjs.io/docs/getting-started)

---

## Тестирование компонентов

Тестирование компонентов производится с помощью утилиты для тестирования *React Testing Library*.

`npm run test:unit` - запуск тестирования компонентов

Для генерации отчета тестирования используется jest-html-reporters.
Отчет хранится в [jest_html_reporters.html](../jest_html_reporters.html).

Файлы тестов хранятся рядом с файлами тестируемых компонентов.

Документация утилиты - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## Скриншотное тестирование

Скриншотное тестирование производится с помощью библиотеки *Loki*.

Скриншоты снимаются с storybook stories, поэтому перед запуском тестирования необходимо произвести сборку storybook.

- `npm run storybook:build` - сборка storybook
- `npm run test:ui` - запуск скриншотного тестирования
- `npm tun test:ui:report` - генерация отчета скриншотного тестирования
- `npm tun test:ui:ok` - подтверждение новых скриншотов
- `npm tun test:ui:update` - обновление скриншотов

Отчет хранится в [.loki/report.html](../.loki/report.html).

Снятые скриншоты хранятся в [.loki/](../.loki/).

Документация библиотеки - [loki](https://loki.js.org/getting-started.html)
