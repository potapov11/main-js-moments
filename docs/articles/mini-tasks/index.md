# Интересные мини-задачи

Практика на **замыкания**, **функции высшего порядка**, **каррирование**, **partial**, **compose** и похожие паттерны из frontend/JS-собеседований.

Это **не LeetCode** — короткие задачи на написание утилит и понимание «функция возвращает функцию».

## Опубликовано

| # | Тема | Статья | Файл практики |
|---|------|--------|---------------|
| — | Каррирование и функция `carried` | [currying-and-carried.md](currying-and-carried.md) | `interestedTasks/repeat_task_2.js`, `carry_func.js` |
| 1 | `compose` — склейка функций справа налево | [compose.md](compose.md) | `interestedTasks/repeatMinStack.js` |

## В очереди

- `partial(fn, ...fixed)`
- `once(fn)`
- `pipe` (compose слева направо)
- `memoize(fn)` (простая версия)

## Как добавить задачу

1. Создайте `docs/articles/mini-tasks/имя-задачи.md`
2. Добавьте пункт в `mkdocs.yml` → **Статьи → Интересные мини-задачи**
3. Обновите таблицу в этом `index.md`
4. Положите решение/черновик в `interestedTasks/`
