# Асинхронное программирование

Теория по асинхронности в JavaScript для frontend-собеседования: Event Loop, Promise, async/await и типовые паттерны.

Практика в репозитории: папка `async_tasks/`.

## Порядок чтения

1. [Event Loop](event-loop.md) — call stack, macro/microtasks, почему UI «зависает»
2. [Promise и Promise API](promises.md) — состояния, `then`/`catch`, `all` / `race` / …
3. [async/await](async-await.md) — сахар над промисами, ошибки, параллель
4. [Паттерны](async-patterns.md) — timeout, retry, abort, concurrency

## Опубликовано

| Тема | Статья |
|------|--------|
| Event Loop (стек, macro/microtasks) | [event-loop.md](event-loop.md) |
| Promise и Promise API | [promises.md](promises.md) |
| async/await | [async-await.md](async-await.md) |
| Паттерны: timeout, retry, AbortController | [async-patterns.md](async-patterns.md) |

## Связь с другими разделами

- [Браузер](../browser/index.md) — клик, навигация, сеть (Event Loop кратко в [click-to-navigation](../browser/click-to-navigation.md))
- [Мини-задачи](../mini-tasks/index.md) — debounce/throttle (таймеры)
- Банк вопросов: `Q-JS-026`, `Q-JS-027`, `Q-JS-094`, блок Event Loop / async

Новые файлы: `docs/articles/async/имя.md` + пункт в `mkdocs.yml` → **Статьи → Асинхронное программирование**.
