# Рендеринг: Render phase и Commit phase

«Рендер» в React ≠ обязательно «отрисовка в браузере». Часто имеют в виду **вычисление UI** (вызов функции компонента). Реальные изменения DOM происходят отдельно, в **commit**.

Связано: [Virtual DOM](virtual-dom.md), [Fiber](fiber.md).

---

## Ключевые идеи

- Обновление = **Render (может прерываться)** → **Commit (синхронный, видимый)**.
- Render phase: вызвать компоненты, построить workInProgress Fiber tree, найти diff. **Без** (почти) мутаций DOM.
- Commit phase: применить мутации к DOM, вызвать layout-эффекты, потом passive effects (`useEffect`).
- Компонент **рендерится** чаще, чем «что-то изменилось на экране»: родитель обновился → дети по умолчанию тоже пересчитываются (если нет memo/bailout).

---

## 1. Триггеры обновления

Что обычно запускает ре-рендер:

| Триггер | Пример |
|---------|--------|
| `setState` / `useState` setter | клик → `setCount(c => c + 1)` |
| `useReducer` dispatch | то же по смыслу |
| Обновление родителя | props «проехали» вниз |
| Контекст (`useContext`) | изменился value Provider’а |
| Подписка на внешний store | Redux/Zustand с selector’ом (зависит от библиотеки) |

Первый монтирование — тоже Render + Commit, только без «предыдущего» дерева.

---

## 2. Render phase (фаза рендера / reconciliation)

Упрощённый ход:

```
1. Запланировали обновление (scheduler / lanes)
2. Берём root, строим/обновляем workInProgress
3. Для каждого Fiber unit of work:
   - вызываем function component (или class render)
   - сравниваем children (reconciliation)
   - помечаем flags: Update, Placement, Deletion…
4. Повторяем, пока работа не закончена
   (в concurrent — можно прервать и продолжить позже)
```

Важно для собеса:

- В Render phase **нельзя** полагаться на побочные эффекты в теле компонента (подписки, мутации DOM, `Math.random` как источник истины) — в Strict Mode React специально **двойно** вызывает render в dev, чтобы ловить чистоту.
- Render phase в concurrent режиме **может быть отброшена** и пересчитана заново (если прервали ради более срочного обновления).

```jsx
function Profile({ userId }) {
  // ✅ вычисление из props/state
  const label = userId ? `User ${userId}` : 'Guest';

  // ❌ side effect в теле — плохо для Render phase
  // document.title = label;

  return <h1>{label}</h1>;
}
```

Side effects — в `useEffect` / `useLayoutEffect` / event handlers.

---

## 3. Commit phase (фаза коммита)

Когда дерево workInProgress готово, React **синхронно**:

1. **Before mutation / mutation** — применять изменения к DOM (вставка, обновление атрибутов, удаление).
2. **Layout** — `useLayoutEffect` (и `componentDidMount` / `DidUpdate`): код видит обновлённый DOM, до paint браузера. Блокирует отрисовку — держать коротким.
3. Переключить текущее дерево: workInProgress → current.
4. **Passive effects** — `useEffect`: уже после paint (асинхронно относительно кадра).

```
Render (interruptible, no DOM) 
   → Commit mutations (sync DOM)
   → useLayoutEffect (sync, before paint)
   → browser paint
   → useEffect (after paint)
```

| API | Когда относительно paint | Типичный кейс |
|-----|--------------------------|---------------|
| `useLayoutEffect` | до paint | измерить DOM, синхронно поправить scroll/focus |
| `useEffect` | после paint | fetch, подписки, логирование |

---

## 4. Батчинг (batching)

Несколько `setState` в одном обработчике → **один** ре-рендер:

```javascript
function handleClick() {
  setA(1);
  setB(2);
  setC(3); // один commit, не три
}
```

Начиная с React 18 автоматический батчинг шире: и в промисах, и в `setTimeout` (раньше в async часто было иначе).

---

## 5. Что такое «лишний» ре-рендер

Рендер функции компонента ≠ обязательно тяжёлый DOM commit.

Но:

- пересчёт большого JSX + reconciliation всё же стоит CPU;
- если props/children изменились по ссылке — memo не спасёт;
- Context value новый объект каждый раз → все consumers ре-рендерятся.

Инструменты контроля (для устного ответа «как оптимизировать»):

- `React.memo` / `useMemo` / `useCallback` — когда профиль показал проблему;
- разбиение context;
- `startTransition` для несрочных обновлений UI;
- виртуализация длинных списков (не «магия React», а паттерн).

!!! warning "Не начинайте с memo"
    Сначала корректность и простота. Оптимизации — после измерения (Profiler / slow interaction).

---

## 6. Strict Mode и «двойной» вызов

В development Strict Mode:

- компоненты могут рендериться дважды;
- effects: mount → cleanup → mount снова.

Цель — найти impure render и эффекты без правильного cleanup. В production двойного вызова нет.

---

## Схема на одном экране

```
setState / props / context
        │
        ▼
┌───────────────────┐
│   RENDER PHASE    │  вызвать компоненты, diff, Fiber flags
│  (может yield)    │  DOM ещё не трогаем
└─────────┬─────────┘
          │ готово
          ▼
┌───────────────────┐
│   COMMIT PHASE    │  мутации DOM → layout effects → paint → useEffect
│  (синхронно DOM)  │
└───────────────────┘
```

---

## Шпаргалка

- Render = вычислить UI (чистая функция от state/props).
- Commit = применить к DOM + эффекты.
- `useLayoutEffect` до paint, `useEffect` после.
- Батчинг склеивает несколько setState в один проход.
- Лишний ре-рендер ≠ баг сам по себе; проблема — когда дорого.
