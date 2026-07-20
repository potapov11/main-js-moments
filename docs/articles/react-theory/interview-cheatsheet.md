# Шпаргалка: React под капотом на собесе

Короткие формулировки и типовые вопросы. Детали — в [Virtual DOM](virtual-dom.md), [Fiber](fiber.md), [рендеринг](rendering.md).

---

## 30-секундный ответ «как React обновляет UI»

1. Меняется state/props/context → React планирует обновление.
2. **Render phase:** вызывает компоненты, строит новое Fiber-дерево, сравнивает с предыдущим (reconciliation).
3. **Commit phase:** точечно меняет DOM, гоняет layout-эффекты, затем `useEffect` после paint.
4. Fiber позволяет **прерывать** долгий Render и отдавать приоритет вводу пользователя.

---

## Частые вопросы → эталон мысли

| Вопрос | На что давить в ответе |
|--------|-------------------------|
| Что такое Virtual DOM? | Описание UI объектами; не «DOM 2.0». Diff → минимум мутаций реального DOM |
| Почему не всегда быстрее руками? | Модель программирования + батчинг; точечный императив может быть быстрее |
| Что такое reconciliation? | Сравнение prev/next дерева, эвристики по типу и `key` |
| Зачем `key`? | Стабильный id sibling’ов; не «для скорости», для правильной идентичности |
| Что будет без `key` / с index? | Лишние remount, сброс state, баги при reorder |
| Что такое Fiber? | Узел работы + связный список; прерываемый reconciler |
| Зачем Fiber, если был Virtual DOM? | VDOM — идея; Fiber — реализация с приоритетами и yield |
| Render vs Commit? | Сначала вычислить (можно прервать), потом синхронно применить DOM |
| `useEffect` vs `useLayoutEffect`? | После paint vs до paint; layout — короткие измерения/правки DOM |
| Почему нельзя side effects в теле компонента? | Render может вызываться лишний раз / прерваться / Strict Mode ×2 |
| Что такое батчинг? | Несколько setState → один ре-рендер |
| Concurrent Mode / features? | Не второй поток: приоритизация и чередование работы на main thread |
| `startTransition`? | Пометить обновление низким приоритетом, UI остаётся отзывчивым |
| Зачем `React.memo`? | Bailout ре-рендера при тех же props (shallow compare) |
| Controlled vs uncontrolled? | Источник истины: React state vs DOM; value+onChange vs defaultValue/ref |

---

## Мини-карта терминов

| Термин | Одной фразой |
|--------|----------------|
| Element | Immutable описание узла (`type` + `props`) |
| Fiber | Внутренний stateful-узел reconciler’а |
| current tree | То, что сейчас на экране |
| workInProgress | Черновик следующего кадра |
| lanes / priority | Насколько срочно обновление |
| hydration | Привязка серверного HTML к клиентскому дереву |
| bailout | «Можно не пересчитывать это поддерево» |

---

## Что ещё полезно знать (кратко)

**Порядок хуков.** Хуки вызываются в одном порядке на каждом рендере → нельзя условно вызывать `useState`/`useEffect`. State хуков живёт на Fiber в связном списке.

**Старый class lifecycle vs hooks (карта):**

| Class | Hooks-мир |
|-------|-----------|
| `render` | тело функции |
| `componentDidMount` / `DidUpdate` | `useEffect` (+ deps) |
| sync DOM read after update | `useLayoutEffect` |
| `componentWillUnmount` | cleanup в effect |

**Portal.** Рендер в другой DOM-узел (`createPortal`), но дерево React сохраняет context/события логического дерева.

**Keys в фрагментах / списках.** Тот же смысл: идентичность между рендерами.

**Ошибки.** Error Boundaries ловят ошибки в Render детей (не в async/event handlers сами по себе).

---

## Связка с практикой

После теории полезно закрепить руками: [React-задачи](../react-tasks/index.md) — хуки, эффекты, stale closure. Там видны эффекты Render/Commit в коде, который пишут на секции practical coding.
