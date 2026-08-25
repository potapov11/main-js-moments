# Рендеринг: Render phase и Commit phase

«Рендер» в React ≠ обязательно изменение DOM. Чаще это **вычисление следующего UI**. Реальные изменения host environment происходят отдельно, в commit phase.

Связано: [Virtual DOM](virtual-dom.md), [Fiber](fiber.md), [Effects](effects-and-synchronization.md).

---

## Ключевые идеи

- Обновление можно мыслить как **Render → Commit**.
- Render phase вычисляет следующее дерево и может быть прервана/отброшена в concurrent rendering.
- Commit phase применяет подготовленные изменения к DOM и запускает commit-related effects.
- Компонент может рендериться, даже если DOM в итоге не изменился.
- Render должен быть чистым: один и тот же набор inputs должен давать один и тот же UI без внешних side effects.

---

## 1. Что запускает render

Типичные причины:

| Триггер | Пример |
|---|---|
| `setState` / `useState` setter | `setCount(c => c + 1)` |
| `useReducer` dispatch | изменение reducer state |
| Render родителя | ребёнок по умолчанию вызывается снова |
| Context update | изменился `value` Provider |
| External store subscription | Redux/Zustand selector сообщил об изменении |

Первый mount — тоже render + commit.

---

## 2. Render phase

Упрощённо React:

```text
schedule update
→ пройти нужную часть Fiber tree
→ вызвать function components
→ получить следующее описание children
→ выполнить reconciliation
→ подготовить изменения
```

Важная мысль: вызов function component — это **не lifecycle event**, в который безопасно помещать side effects.

```jsx
function Profile({ userId }) {
  const label = userId ? `User ${userId}` : 'Guest';

  // Плохо: внешний side effect во время render
  // document.title = label;

  return <h1>{label}</h1>;
}
```

Render может выполняться повторно, а в concurrent rendering незавершённая работа может быть отброшена. Поэтому тело компонента должно оставаться чистым.

---

## 3. Reconciliation и identity

Во время render React сопоставляет предыдущих и следующих children. На сохранение state компонента влияют прежде всего:

- type;
- позиция в дереве;
- `key`.

`key` — это не просто подсказка «для производительности», а часть identity элемента среди siblings.

Подробнее: [Virtual DOM и reconciliation](virtual-dom.md).

---

## 4. Commit phase

После того как следующее дерево готово, React применяет изменения к DOM.

Полезная модель:

```text
Render
  ↓
Commit DOM mutations
  ↓
layout effects
  ↓
browser gets opportunity to paint
  ↓
passive effects are scheduled
```

`useLayoutEffect` подходит для редких случаев, когда нужно синхронно измерить/исправить layout до того, как пользователь увидит кадр. Он может блокировать paint, поэтому его нужно держать коротким.

`useEffect` предназначен для синхронизации с внешними системами и обычно не должен использоваться для visual correction, требующей синхронного layout timing.

!!! note "Про timing useEffect"
    Нельзя учить правило «`useEffect` всегда строго после paint». React может выполнить Effect до paint для некоторых interaction-driven обновлений. Для архитектуры важнее назначение API: `useLayoutEffect` — синхронная layout-синхронизация, `useEffect` — обычные внешние side effects.

---

## 5. Батчинг

Несколько state updates могут быть объединены в один render/commit cycle.

```js
function handleClick() {
  setA(1);
  setB(2);
  setC(3);
}
```

В современном React automatic batching работает шире, чем только внутри React event handlers.

Важно: батчинг не означает, что setters «ничего не сделали». Они поставили обновления в очередь, а React обработал их совместно.

---

## 6. State snapshot

Каждый render function component видит **snapshot** state для конкретного render.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count);
  }
}
```

`console.log` не обязан увидеть следующее значение. Handler был создан render'ом, в котором `count` имел текущее значение.

Когда новое состояние зависит от предыдущего, функциональная форма setter обычно выражает намерение точнее:

```js
setCount(prev => prev + 1);
```

Эта модель напрямую связана со stale closures.

---

## 7. «Лишний render» не равен DOM update

Если родитель рендерится, child function обычно вызывается снова. Но это не означает обязательную DOM mutation.

Стоимость может быть в:

- выполнении component functions;
- тяжёлых вычислениях;
- reconciliation большого дерева;
- неудачной работе с context;
- создании слишком большого количества DOM nodes.

Поэтому вопрос performance должен звучать не «как убрать все renders», а «где есть измеримая стоимость».

Инструменты:

- React Profiler;
- browser Performance panel;
- `React.memo`;
- `useMemo` / `useCallback` там, где стабильность identity реально нужна;
- state colocation;
- virtualization;
- `startTransition` для несрочных обновлений.

---

## 8. Strict Mode

В development Strict Mode React может дополнительно вызывать render и повторять setup/cleanup effects, чтобы обнаруживать impure code и некорректный cleanup.

Это не означает, что production «рендерит всё дважды».

---

## Формулировка для собеседования

> Render phase вычисляет следующий UI и выполняет reconciliation; она должна быть чистой и в concurrent rendering может быть прервана. Commit phase применяет подготовленные изменения к DOM. Поэтому render компонента не означает, что DOM обязательно изменился.

## Типичные ошибки

| Ошибка | Правильная модель |
|---|---|
| Render = DOM update | Render — вычисление, DOM меняется в commit |
| Любой re-render — performance bug | Оптимизировать нужно измеримую стоимость |
| Side effect в теле компонента | Render должен быть pure |
| `useEffect` всегда после paint | Это не абсолютная гарантия |
| `useMemo` нужен каждому объекту | Memoization нужна при реальной стоимости/identity requirement |
