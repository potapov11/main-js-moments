# React теория — от рендера к архитектурным решениям

Этот раздел нужен не для повторения синтаксиса хуков. Фокус — на **ментальной модели React** и на решениях, которые отличают уверенного Middle+/Senior: identity, render lifecycle, ownership состояния, effects, performance и границы ответственности.

Практика рядом: [React-задачи](../react-tasks/index.md).

## Порядок чтения

1. [Virtual DOM и reconciliation](virtual-dom.md) — identity, diff, `key`
2. [Fiber](fiber.md) — единица работы, scheduler, приоритеты
3. [Рендеринг: Render и Commit](rendering.md) — что именно означает «рендер»
4. [State и source of truth](state-and-source-of-truth.md) — local / URL / server / global client state
5. [Effects и синхронизация](effects-and-synchronization.md) — dependencies, cleanup, stale closure, race conditions
6. [Шпаргалка для собеса](interview-cheatsheet.md) — короткие формулировки

## Что важно уметь объяснить

После раздела нужно уметь не просто перечислить хуки, а ответить:

- почему компонент может render, но DOM не изменится;
- когда React сохраняет state компонента, а когда сбрасывает;
- почему `key` — это identity, а не «оптимизация списка»;
- почему derived data обычно не нужно хранить в state;
- когда фильтры лучше хранить в URL;
- чем server state отличается от client state;
- зачем Effect cleanup и откуда берутся stale closure/race conditions;
- почему memoization — инструмент после измерения, а не default-стиль кода.

## Опубликовано

| Тема | Статья |
|---|---|
| Virtual DOM и reconciliation | [virtual-dom.md](virtual-dom.md) |
| Fiber | [fiber.md](fiber.md) |
| Render / Commit | [rendering.md](rendering.md) |
| State и source of truth | [state-and-source-of-truth.md](state-and-source-of-truth.md) |
| Effects и синхронизация | [effects-and-synchronization.md](effects-and-synchronization.md) |
| Шпаргалка для собеса | [interview-cheatsheet.md](interview-cheatsheet.md) |

## Связь с другими разделами

- [JavaScript Core](../javascript-core/index.md) — closures, references, equality и `this`
- [Асинхронное программирование](../async/index.md) — Event Loop, Promise, cancellation, concurrency
- [React-задачи](../react-tasks/index.md) — practical coding

Главный критерий: уметь связать внутреннюю модель React с реальным решением в продуктовой кодовой базе.
