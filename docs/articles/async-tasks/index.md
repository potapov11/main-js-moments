# Задачи асинхронность

Практические задачи на **Promise**, **async/await**, **retry**, **timeout**, ограничение параллелизма и похожие паттерны с собеседований.

Теория рядом: [Асинхронное программирование](../async/index.md). Черновики решений — в `async_tasks/`.

## Опубликовано

| # | Тема | Статья | Файл практики |
|---|------|--------|---------------|
| 1 | `retry(fn, attempts, delay)` — повтор с экспоненциальной задержкой | [retry-exponential-backoff.md](retry-exponential-backoff.md) | `async_tasks/5.js` |

## В очереди

- `withTimeout(promise, ms)` через `Promise.race`
- `promisePool(tasks, limit)` — concurrency limit
- `fetchWithTimeout(url, timeoutMs)` через `AbortController`
- `sleep` / `delay` как строительный блок

## Как добавить задачу

1. Создайте `docs/articles/async-tasks/имя-задачи.md` (сначала условие, потом решение)
2. Добавьте пункт в `mkdocs.yml` → **Статьи → Задачи асинхронность**
3. Обновите таблицу в этом `index.md`
4. Положите черновик в `async_tasks/`
