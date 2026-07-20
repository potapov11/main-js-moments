# Promise и Promise API

**Promise** — объект, представляющий результат асинхронной операции, который появится позже: успех (**fulfilled**) или ошибка (**rejected**). Пока ждём — **pending**.

На собеседовании ждут: три состояния, «settle» один раз, цепочки `.then`, обработка ошибок, отличие `all` / `allSettled` / `race` / `any`.

Связано: [Event Loop](event-loop.md) (колбэки `.then` — microtasks), [async/await](async-await.md), [паттерны](async-patterns.md).

---

## Ключевые идеи

- Состояния: `pending` → `fulfilled` | `rejected` (переход один раз — **immutable settle**).
- `.then` всегда возвращает **новый** Promise.
- Ошибки «прыгают» к ближайшему `.catch` / второму колбэку `.then`.
- Комбинаторы: `all`, `allSettled`, `race`, `any` — разный смысл при ошибках и порядке.
- Создать «с руки»: `new Promise((resolve, reject) => { ... })`.

---

## 1. Создание и состояния

```javascript
const p = new Promise((resolve, reject) => {
  // executor вызывается сразу (синхронно)
  doSomething((err, value) => {
    if (err) reject(err);
    else resolve(value);
  });
});
```

| Состояние | Смысл |
|-----------|--------|
| `pending` | ещё не завершён |
| `fulfilled` | успех, есть `value` |
| `rejected` | ошибка, есть `reason` |

Хелперы:

```javascript
Promise.resolve(42);           // сразу fulfilled
Promise.reject(new Error('x')); // сразу rejected
```

`resolve` другого промиса «подписывается» на его результат (assimilate / flat).

---

## 2. `then`, `catch`, `finally`

```javascript
promise
  .then(onFulfilled, onRejected) // оба опциональны
  .catch(onRejected)             // ≈ .then(undefined, onRejected)
  .finally(onFinally);           // и при успехе, и при ошибке; value/reason пробрасывает дальше
```

Цепочка:

```javascript
fetch('/api')
  .then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json(); // можно вернуть значение или Promise
  })
  .then((data) => console.log(data))
  .catch((e) => console.error(e))
  .finally(() => console.log('done'));
```

Правила:

1. Вернул обычное значение → следующий `.then` получит его.
2. Вернул Promise → следующий `.then` ждёт его settle.
3. `throw` / `return Promise.reject` → уходит в `.catch`.
4. После `.catch`, если ошибку обработали и не бросили снова — цепочка снова fulfilled.

```javascript
Promise.reject('err')
  .catch((e) => {
    console.log(e);
    return 'recovered';
  })
  .then((v) => console.log(v)); // 'recovered'
```

---

## 3. Ошибки и unhandled rejection

Если промис rejected и нет `.catch` (и никто не сделал `await` в `try/catch`), в браузере — **unhandledrejection**.

Хорошая привычка: у «корневых» промисов всегда иметь обработку ошибки (`.catch` или `try/catch` при `await`).

Предпочтительно отклонять через `Error`, не строкой:

```javascript
reject(new Error('timeout')); // есть stack, instanceof Error
```

---

## 4. Promise API — комбинаторы

Пусть есть массив промисов `ps = [p1, p2, p3]`.

### `Promise.all(ps)`

- Ждёт **все** успешные → массив результатов **в том же порядке**, что вход.
- Любой **первый** reject → весь `all` rejected этой ошибкой (остальные не отменяются сами по себе).

```javascript
const [a, b] = await Promise.all([fetch('/a'), fetch('/b')]);
```

Когда: нужны **все** результаты; одна ошибка = провал всей группы.

### `Promise.allSettled(ps)`

- Всегда **fulfilled** (когда все settle).
- Элементы: `{ status: 'fulfilled', value }` или `{ status: 'rejected', reason }`.

```javascript
const results = await Promise.allSettled([p1, p2]);
```

Когда: «запусти всё и посмотри, кто выжил» (несколько независимых запросов).

### `Promise.race(ps)`

- Берёт **первый** settle (и fulfill, и reject).

```javascript
await Promise.race([fetch(url), timeoutReject(1000)]);
```

Когда: таймаут, «кто быстрее из двух источников».

### `Promise.any(ps)`

- Первая **успешная** → fulfill.
- Если **все** rejected → `AggregateError` (поле `errors`).

```javascript
const data = await Promise.any([mirror1, mirror2, mirror3]);
```

Когда: несколько зеркал / запасных URL, важен первый успех.

### Сравнение одной таблицей

| Метод | Успех когда | Ошибка когда | Результат успеха |
|-------|-------------|--------------|------------------|
| `all` | все fulfilled | первый reject | массив values |
| `allSettled` | все settle | почти никогда (сам метод) | массив `{status, ...}` |
| `race` | первый fulfill | первый reject | value/reason первого |
| `any` | первый fulfill | все reject | value первого успеха |

---

## 5. Порядок и побочные эффекты

`all` / `race` **не отменяют** проигравшие запросы. Сеть всё равно может дойти до конца — просто результат игнорируется. Для отмены нужен [AbortController](async-patterns.md).

Пустой массив:

| Метод | Пустой `[]` |
|-------|-------------|
| `all` | сразу `[]` |
| `allSettled` | сразу `[]` |
| `race` | навсегда pending |
| `any` | сразу `AggregateError` |

---

## 6. Оборачивание колбэков

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

Executor не должен быть `async` «просто так»: необработанный reject внутри async-executor легко потерять. Либо sync `resolve`/`reject`, либо явный `.catch`.

---

## 7. Thenable

Объект с методом `then` может быть «как промис» — `Promise.resolve(thenable)` и `await` его подхватят. На собесе достаточно знать: *thenable — duck typing под Promise*.

---

## 8. Типичные ошибки

| Ошибка | Как лучше |
|--------|-----------|
| Забыли `return` в `.then` | Цепочка получит `undefined` |
| `.then(fn())` вместо `.then(fn)` | Сразу вызвали `fn`, в then попал результат |
| Думать, что `all` отменяет остальные | Нужен AbortSignal |
| Путать `race` и `any` | `race` — любой settle; `any` — только успех |
| Глотать в `.catch` без rethrow / fallback | Вызывающий думает, что успех |

---

## 9. Шпаргалка для собеседования

1. *«Три состояния, settle один раз.»*
2. *«`.then` возвращает новый промис; ошибки идут к `.catch`.»*
3. *«`all` — все или ошибка; `allSettled` — все статусы; `race` — первый settle; `any` — первый успех.»*
4. *«Колбэки then — microtasks»* → [Event Loop](event-loop.md).
5. *«Для readable-кода часто async/await»* → [async/await](async-await.md).

---

## 10. Практика

- Реализуй timeout через `Promise.race` — см. [паттерны](async-patterns.md) и `async_tasks/4.js`.
- Объясни разницу `all` vs `allSettled` на примере трёх запросов, один из которых падает.
- Напиши `delay(ms)` и цепочку из трёх `.then` с `console.log` порядка.
