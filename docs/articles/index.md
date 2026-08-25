# Статьи

Документация собрана как база повторения для **Middle+/Senior Frontend**, а не как энциклопедия всего frontend.

## Основные разделы

| Раздел | Зачем читать |
|---|---|
| [JavaScript Core](javascript-core/index.md) | Execution context, closures, `this`, references, equality, mutation |
| [Асинхронное программирование](async/index.md) | Event Loop, Promise, `async/await`, timeout/retry/abort/concurrency |
| [Браузер](browser/index.md) | Browser lifecycle, навигация, сеть, DOM и runtime-модель |
| [React теория](react-theory/index.md) | Reconciliation, Fiber, Render/Commit, state ownership, Effects |
| [React-задачи](react-tasks/index.md) | Practical coding по hooks/effects/debounce/stale closure |
| [Мини-задачи](mini-tasks/index.md) | Debounce, throttle, curry, compose, EventEmitter |
| [Алгоритмы](algorithms/index.md) | Complexity и основные паттерны для coding interview |
| [Async-задачи](async-tasks/index.md) | Retry, timeout и практические задачи на управление асинхронностью |

## Что изменено в структуре

Раньше существовали два параллельных теоретических раздела — `async/` и `async-javascript/` — с пересекающимися материалами про Promise и `async/await`.

Основным разделом теперь считается **[Асинхронное программирование](async/index.md)**. Старый `async-javascript/` оставлен в репозитории как legacy-материал, чтобы не ломать историю и ссылки, но в основную навигацию не включается.

## Как читать

Не нужно читать всё подряд. Для повторения темы используй цикл:

1. прочитать mental model;
2. закрыть статью и объяснить своими словами;
3. решить одну мини-задачу без запуска;
4. назвать 1–2 production failure mode;
5. сформулировать ответ для интервью за 30–60 секунд.

Если статья не помогает сделать хотя бы один из этих пунктов, её ценность для этой базы сомнительна.
