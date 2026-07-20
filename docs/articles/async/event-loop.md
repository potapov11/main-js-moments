# Event Loop — как JavaScript выполняет асинхронный код

В браузере (и в Node) JavaScript однопоточен: один **call stack**. Асинхронность — не «второй поток по умолчанию», а **отложенное выполнение колбэков** через очереди. Event Loop решает, *когда* снова запустить JS после таймера, клика или settled Promise.

На собеседовании ждут: разницу **макротаск / микротаск**, порядок `setTimeout` vs `Promise.then`, что блокирует UI.

Связано: [Promise](promises.md), [async/await](async-await.md). Клик как макротаска — также в [click-to-navigation](../browser/click-to-navigation.md) (§ 1.4).

---

## Ключевые идеи

- Пока стек не пуст — Event Loop не берёт следующую задачу из очереди.
- После каждой **макрозадачи** сначала опустошается очередь **микрозадач**.
- `Promise.then` / `queueMicrotask` / продолжение после `await` → **microtasks**.
- `setTimeout`, `setInterval`, I/O, UI-события → обычно **macrotasks** (task queue).
- Долгий синхронный код блокирует и отрисовку, и обработку кликов.

---

## 1. Call stack

```javascript
function a() {
  b();
}
function b() {
  console.log('b');
}
a();
```

Вызовы кладутся на стек и снимаются при `return`. Пока на стеке крутится тяжёлый цикл — ничего «асинхронного» не выполнится:

```javascript
const t0 = Date.now();
while (Date.now() - t0 < 3000) {} // 3 секунды UI «мёртвый»
```

---

## 2. Web APIs и колбэки

Асинхронные API (таймеры, `fetch`, DOM-события) живут **вне** стека JS:

1. Вызвали `setTimeout(fn, 100)` — браузер завёл таймер.
2. Через ≥100 мс колбэк `fn` попадает в **очередь задач** (не сразу на стек).
3. Event Loop, когда стек пуст, забирает задачу и кладёт `fn` на стек.

То же для ответа сети и клика пользователя (упрощённо).

---

## 3. Макрозадачи и микрозадачи

| Очередь | Примеры | Когда выполняется |
|---------|---------|-------------------|
| **Macrotask** (task) | `setTimeout`, `setInterval`, обработка `click`, сообщение с воркера | По одной: взяли задачу → выполнили → microtasks → (часто) render → следующая |
| **Microtask** | `Promise.then` / `.catch` / `.finally`, `queueMicrotask`, `MutationObserver`, продолжение `async` после `await` | **Все** накопленные microtasks после текущей macrotask, *до* следующей macrotask |

Упрощённый цикл:

```
пока есть работа:
  1. взять 1 macrotask (если есть) → выполнить
  2. выполнить ВСЕ microtasks (включая те, что добавились в процессе)
  3. при необходимости — отрисовка кадра
  4. к шагу 1
```

!!! note "Упрощение"
    У браузера несколько очередей и приоритетов; для собеса хватает модели «task / microtask / render».

---

## 4. Классический пример порядка

```javascript
console.log('1 sync');

setTimeout(() => console.log('2 timeout'), 0);

Promise.resolve().then(() => console.log('3 promise'));

console.log('4 sync');
```

Вывод: `1 sync` → `4 sync` → `3 promise` → `2 timeout`.

Почему:

1. Синхронный код текущего скрипта.
2. `setTimeout(..., 0)` — macrotask в очереди.
3. `Promise.then` — microtask.
4. После синхронного кода — все microtasks (`3`), потом macrotask (`2`).

Ещё плотнее:

```javascript
setTimeout(() => console.log('macrotask'), 0);

Promise.resolve()
  .then(() => {
    console.log('micro 1');
    return Promise.resolve();
  })
  .then(() => console.log('micro 2'));

queueMicrotask(() => console.log('micro queue'));
```

Сначала microtasks (в т.ч. цепочки `.then`), потом `setTimeout`.

---

## 5. Связь с Promise и async/await

- Колбэк `.then` — **microtask**.
- После `await` продолжение `async`-функции планируется как microtask (как будто `.then`).
- `reject` / `throw` в async → тоже через микрозадачи до внешнего `.catch` / `try/catch` при `await`.

```javascript
async function f() {
  console.log('A');
  await null; // «пауза»: дальше — microtask
  console.log('B');
}

f();
console.log('C');
// A, C, B
```

Подробнее: [async/await](async-await.md), [Promise](promises.md).

---

## 6. UI, render и «зависания»

Между макрозадачами браузер может отрисовать кадр. Если одна макрозадача (или бесконечные microtasks) занимает 200+ мс:

- анимации дёргаются;
- клики копятся в очереди;
- страница «висит».

**Опасность microtasks:** если в каждом `.then` снова ставить microtask без выхода, очередь microtasks не кончится — render и macrotasks не получат шанс. На практике так делают редко, но интервьюеры иногда спрашивают.

---

## 7. `addEventListener` — не макрозадача

Важно для собесов:

| Сущность | Макрозадача? |
|----------|----------------|
| Вызов `addEventListener('click', fn)` | Нет — синхронная регистрация |
| Сама функция `fn` | Нет — это колбэк |
| «Обработать событие click» в очереди | **Да** — macrotask; внутри неё синхронно вызываются listeners |

Подробный разбор: [click-to-navigation](../browser/click-to-navigation.md).

`dispatchEvent` из своего кода часто обрабатывается **синхронно** на текущем стеке (новая macrotask не создаётся).

---

## 8. Node.js (кратко)

Идея та же: стек + очереди. В Node свои фазы (`timers`, `poll`, `check`…) и `process.nextTick` (ещё приоритетнее обычных microtasks). На frontend-собесе обычно достаточно браузерной модели; если спросили про Node — упомяните фазы и `nextTick`.

---

## 9. Типичные ошибки и ловушки

| Ошибка / миф | Как есть на самом деле |
|--------------|----------------------|
| «`setTimeout(fn, 0)` выполнится сразу» | Не раньше, чем после текущего кода и microtasks |
| «Промис — отдельный поток» | Обычно нет; это планирование колбэков |
| Путать listener и macrotask | Macrotask — обработка события целиком |
| Долгий `while` «отдам другим» | Нет — пока стек занят, очереди ждут |

---

## 10. Шпаргалка для собеседования

1. *«Один call stack; асинхронность — через Web APIs и очереди.»*
2. *«После macrotask сначала все microtasks, потом следующая macrotask / render.»*
3. *«`Promise.then` и продолжение `await` — microtasks; `setTimeout` — macrotask.»*
4. *«Порядок: sync → micro → timeout(0).»*
5. *«Тяжёлый sync блокирует UI.»*

---

## 11. Практика

- Предскажи вывод скрипта с 2–3 `setTimeout` и цепочкой `.then` — проговори вслух.
- Открой DevTools → Performance и посмотри long task при тяжёлом цикле.
- Перечитай § про клик в [click-to-navigation](../browser/click-to-navigation.md).
