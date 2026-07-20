# React теория (как работает React)

Теория «под капотом» для устной части собеседования: Virtual DOM, Fiber, фазы рендеринга и reconciliation. Фокус — *как React обновляет UI*, а не синтаксис хуков.

Практика рядом: [React-задачи](../react-tasks/index.md).

## Порядок чтения

1. [Virtual DOM и reconciliation](virtual-dom.md) — зачем дерево элементов, diff, ключи
2. [Fiber](fiber.md) — единица работы, прерываемость, приоритеты
3. [Рендеринг: Render и Commit](rendering.md) — жизненный цикл обновления, эффекты, батчинг
4. [Шпаргалка для собеса](interview-cheatsheet.md) — короткие формулировки и частые вопросы

## Опубликовано

| Тема | Статья |
|------|--------|
| Virtual DOM и reconciliation | [virtual-dom.md](virtual-dom.md) |
| Fiber | [fiber.md](fiber.md) |
| Рендеринг (Render / Commit) | [rendering.md](rendering.md) |
| Шпаргалка для собеса | [interview-cheatsheet.md](interview-cheatsheet.md) |

## Связь с другими разделами

- [React-задачи](../react-tasks/index.md) — practical coding (хуки, debounce, effects)
- [Асинхронное программирование](../async/index.md) — Event Loop важен для эффектов и батчинга
- Банк вопросов: блок React (Virtual DOM, Fiber, re-render, keys)

Новые файлы: `docs/articles/react-theory/имя.md` + пункт в `mkdocs.yml` → **Статьи → React теория**.
