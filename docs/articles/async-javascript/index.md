# Асинхронный JavaScript

Раздел о промисах, `async` / `await` и типичных сценариях работы с сетью. Цель — понимать, когда код запускается параллельно, когда ожидает результат и как корректно передавать ошибки.

## С чего начать

1. [Основы Promise](promises.md) — состояния, `resolve`, `reject` и цепочки.
2. [async / await и ошибки](async-await.md) — более читаемая форма работы с промисами.
3. [Методы Promise](promise-combinators.md) — `all`, `race`, `allSettled` и `any`.
4. [Асинхронные паттерны](async-patterns.md) — задержки, зависимые и последовательные запросы, fallback.

!!! info "Важно"
    `Promise` не делает работу «асинхронной» сам по себе. Он представляет будущий результат уже начатой операции: сетевого запроса, таймера, чтения файла и т. п.

## Опубликовано

| Тема | Статья | Практика |
|------|--------|----------|
| Основы Promise | [promises.md](promises.md) | — |
| `async` / `await` и обработка ошибок | [async-await.md](async-await.md) | `async_tasks/1.js` |
| `Promise.all`, `race`, `allSettled`, `any` | [promise-combinators.md](promise-combinators.md) | — |
| Задержки, последовательные запросы и fallback | [async-patterns.md](async-patterns.md) | `async_tasks/2.js`, `async_tasks/3.js` |

## Что потренировать

1. Несколько раз напишите `wait(ms)` вручную через `new Promise` и `setTimeout`.
2. Реализуйте timeout и fallback через `Promise.race`.
3. Передайте несколько промисов в `Promise.all`, затем специально сделайте один из них отклонённым и обработайте ошибку.
4. Выполните массив запросов последовательно: цикл `for...of`, `await fetch(...)`, `await wait(delay)`.
5. Перепишите решение с `.then()` на `async` / `await`, сохранив обработку ошибок.

Новые материалы этого раздела добавляются в `docs/articles/async-javascript/` и в `mkdocs.yml` → **Статьи → Асинхронный JavaScript**.
