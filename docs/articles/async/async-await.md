# async/await — промисы «в синхронном» стиле

`async`/`await` — синтаксический сахар над **Promise**. На собеседовании ждут не только «как писать», но и: что возвращает `async`-функция, куда уходит ошибка, чем `await` отличается от `.then`, как не сломать параллелизм и как это связано с Event Loop.

Связанные темы раздела: [Event Loop](event-loop.md), [Promise API](promises.md), [паттерны](async-patterns.md). Практика: `async_tasks/` (например, retry + timeout).

---

## Ключевые идеи

- `async function` **всегда** возвращает Promise.
- `await` **приостанавливает** выполнение `async`-функции, пока промис не settle (fulfilled / rejected), и не блокирует весь JS-поток.
- `return value` → промис **resolve**; `throw error` → промис **reject**.
- Ошибки от `await` ловят через `try/catch` (или через `.catch` на результате вызова).
- Несколько независимых запросов нельзя ждать строго «друг за другом», если нужен параллелизм — см. `Promise.all`.

---

## 1. Зачем это появилось

Эволюция асинхронности в JS:

1. **Callbacks** — вложенность («callback hell»), ошибки размазаны по колбэкам.
2. **Promise** — цепочки `.then` / `.catch`, единый контракт успеха/ошибки.
3. **async/await** — тот же Promise, но код читается сверху вниз, как синхронный.

```javascript
// Promise-цепочка
function loadUser(id) {
  return fetch(`/api/users/${id}`)
    .then((r) => r.json())
    .then((user) => user.name);
}

// То же с async/await
async function loadUser(id) {
  const r = await fetch(`/api/users/${id}`);
  const user = await r.json();
  return user.name;
}
```

Важно: обе версии возвращают **Promise**. `async` не делает код синхронным — только выглядит так.

---

## 2. Что такое `async function`

Ключевое слово `async` перед функцией:

```javascript
async function f() {
  return 1;
}

const p = f();
console.log(p); // Promise { <fulfilled>: 1 }
```

| В теле функции | Итог вызова `f()` |
|----------------|-------------------|
| `return 42` | Promise → **fulfilled** с `42` |
| `return` / нет return | Promise → **fulfilled** с `undefined` |
| `return somePromise` | Promise «подтягивает» результат/ошибку внутреннего промиса |
| `throw new Error('x')` | Promise → **rejected** с этой ошибкой |

Отсюда классический вопрос собеса (**Q-JS-094**): почему `async function` всегда возвращает Promise? Потому что рантайм **оборачивает** выход функции в Promise; исключение превращается в reject.

```javascript
async function ok() {
  return 1;
}

async function fail() {
  throw new Error('boom');
}

ok();   // Promise fulfilled 1
fail(); // Promise rejected Error('boom') — нужен .catch / try/catch при await
```

То же для стрелок и методов:

```javascript
const g = async () => 2;

class Api {
  async get() {
    return fetch('/x');
  }
}
```

---

## 3. Что делает `await`

`await expr` можно использовать **только внутри** `async`-функции (или на верхнем уровне ES-модуля — *top-level await*).

Поведение:

1. Вычисляется `expr` (часто это Promise).
2. Если значение — не Promise, оно всё равно обрабатывается как уже готовый результат (`await 5` → `5`).
3. Если Promise **fulfilled** — выражение `await` даёт value, выполнение продолжается.
4. Если Promise **rejected** — в месте `await` возникает **исключение** (как `throw`), нужен `try/catch`.

```javascript
async function demo() {
  const a = await Promise.resolve(10); // 10
  const b = await 20;                  // 20 (не промис — ок)
  // await Promise.reject(new Error('x')); // бросит в catch
}
```

### Не блокирует весь поток

`await` **не** замораживает браузер. Пока промис ждёт сеть/таймер:

- текущая `async`-функция «стопнута» на этой строке;
- Event Loop продолжает другие задачи (обработчики кликов, таймеры, отрисовку — в рамках правил loop).

После settle колбэк продолжения `async`-функции обычно попадает в очередь **микрозадач** (как `.then`).

Упрощённо:

```
вызвали async fn
  → дошли до await promise
  → fn «заморожена», управление вернулось наружу (часто с pending Promise наружу)
  → ... event loop ...
  → promise settled
  → продолжение fn ставится как microtask
  → либо return (resolve внешнего промиса), либо throw (reject)
```

Детали очередей — в [Event Loop](event-loop.md); клик как макротаска — в [click-to-navigation](../browser/click-to-navigation.md) (§ microtasks).

---

## 4. Ошибки: `try/catch` vs `.catch`

**Вопрос собеса (Q-JS-027):** как обрабатывать ошибки в async/await?

### Вариант A — `try/catch` внутри async

```javascript
async function load() {
  try {
    const data = await fetchData('/api');
    return data;
  } catch (e) {
    console.error(e);
    throw e; // пробросить наружу — иначе снаружи будет «успех»
  }
}
```

Любой `await`, который rejected, и любой `throw` внутри `try` попадают в `catch`.

### Вариант B — `.catch` на вызове

```javascript
load().catch((e) => {
  console.error('снаружи', e);
});
```

### Когда что выбирать

| Подход | Когда удобен |
|--------|----------------|
| `try/catch` | Несколько `await` подряд, единая обработка, `finally` |
| `.catch` на вызове | Короткий fire-and-forget, композиция цепочек |
| Оба | Внутри ловите и нормализуете, снаружи — финальный fallback |

### Частая ошибка: «вернуть ошибку» вместо `throw`

```javascript
async function fetchWithRetry(/* ... */) {
  // ...
  return lastError; // ПЛОХО: промис fulfilled, в руках Error как «данные»
  // throw lastError; // ХОРОШО: промис rejected
}
```

| | `throw lastError` | `return lastError` |
|--|-------------------|--------------------|
| Состояние промиса | **rejected** | **fulfilled** |
| `await` снаружи | попадёт в `catch` | исключение **не** возникнет |
| `.then` / `.catch` | сработает `.catch` | сработает `.then` с Error |

Контракт: ошибка должна выглядеть как **reject**, а не как успешный ответ с объектом ошибки.

---

## 5. Последовательность vs параллель

### Последовательный await (медленнее, если задачи независимы)

```javascript
async function sequential() {
  const a = await fetch('/a'); // ждём
  const b = await fetch('/b'); // только потом стартует
  return [a, b];
}
```

### Параллельный запуск

```javascript
async function parallel() {
  const p1 = fetch('/a'); // стартовали сразу
  const p2 = fetch('/b');
  const a = await p1;
  const b = await p2;
  return [a, b];
}

// или короче
async function parallelAll() {
  const [a, b] = await Promise.all([fetch('/a'), fetch('/b')]);
  return [a, b];
}
```

Правило: **сначала** создаёте промисы (запросы уже идут), **потом** `await`. Если написать `await fetch('/a'); await fetch('/b');` — второй запрос начнётся только после первого.

---

## 6. Полезные паттерны с Promise API

Полный разбор комбинаторов — в [promises.md](promises.md). Кратко:

| API | Смысл |
|-----|--------|
| `Promise.all` | все успешны; любая ошибка → reject всего |
| `Promise.allSettled` | дождаться всех; у каждого свой status |
| `Promise.race` | кто первый settle (успех или ошибка) |
| `Promise.any` | первая **успешная**; все reject → AggregateError |

Retry, AbortController и пул — в [async-patterns.md](async-patterns.md).

### Таймаут через `Promise.race` (как в задаче retry + timeout)

```javascript
async function fetchWithTimeout(url, timeout = 1000) {
  const dataPromise = fetchData(url);

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeout);
  });

  return Promise.race([dataPromise, timeoutPromise]);
}
```

- `dataPromise` — запрос уже идёт.
- `timeoutPromise` — через `timeout` мс делает `reject`.
- Кто первый — тот и результат гонки.

Обернуть в retry:

```javascript
async function fetchWithRetry(url, maxRetries = 3, timeout = 1000) {
  let lastError = null;

  for (let attempt = 0; attempt < maxRetries; attempt += 1) {
    try {
      return await fetchWithTimeout(url, timeout);
    } catch (e) {
      lastError = e; // попытка неудачна — следующая итерация
    }
  }

  throw lastError; // все попытки исчерпаны → reject
}
```

Структура: **цикл снаружи**, `try/catch` **внутри** итерации. Если `try/catch` обернуть весь цикл — при первой ошибке retry оборвётся.

Практика в репозитории: `async_tasks/4.js`.

---

## 7. `await` в циклах

```javascript
// последовательно обработать список
for (const id of ids) {
  await process(id);
}

// параллельно (осторожно с лимитом нагрузки)
await Promise.all(ids.map((id) => process(id)));
```

`forEach` + `async` колбэк — типичная ловушка:

```javascript
// ПЛОХО: forEach не ждёт async-колбэки
ids.forEach(async (id) => {
  await process(id);
});
// код ниже выполнится, не дождавшись process
```

Используйте `for...of` + `await` или `Promise.all` / пул с concurrency limit.

---

## 8. Связь с `.then` — один и тот же контракт

```javascript
async function load() {
  return await fetchData();
}

// Эквивалентно по смыслу:
function load() {
  return fetchData().then((data) => data);
}
```

Вызов:

```javascript
load()
  .then((data) => console.log(data))
  .catch((e) => console.error(e));

// или
try {
  const data = await load();
} catch (e) {
  console.error(e);
}
```

Интервьюеру можно сказать: *«async/await — сахар над промисами; под капотом всё равно thenable и микрозадачи»*.

---

## 9. Типичные ошибки

| Ошибка | Почему плохо | Как исправить |
|--------|--------------|---------------|
| Забыли `await` | Получили Promise вместо данных; `try/catch` не поймает поздний reject | Писать `await` / возвращать промис осознанно |
| `return error` вместо `throw` | Снаружи «успех» с Error в данных | `throw` / `return Promise.reject(...)` |
| `await` в цикле без нужды | Лишняя последовательная задержка | `Promise.all`, если задачи независимы |
| `forEach(async ...)` | Внешний код не ждёт завершения | `for...of` или `map` + `Promise.all` |
| Глотать ошибку в `catch` без `throw` | Вызывающий думает, что всё ок (`undefined`) | Либо обработать и вернуть fallback, либо пробросить |
| `async` там, где не нужен | Лишний слой Promise | Обычная функция, если нет `await` |
| Путать `setTimeout` «отложить старт» с таймаутом ожидания | Запрос стартует поздно, а не ограничивается по времени | `Promise.race` с reject по таймеру |

---

## 10. Мини-шпаргалка для собеседования

Можно почти дословно:

1. *«`async`-функция всегда возвращает Promise: `return` → resolve, `throw` → reject.»*
2. *«`await` ждёт settle промиса; при reject в этом месте возникает исключение — ловим `try/catch`.»*
3. *«Это сахар над Promise; Event Loop / microtasks те же, что у `.then`.»*
4. *«Независимые операции: стартуем промисы сразу, потом `await` / `Promise.all`, иначе получим лишнюю последовательность.»*
5. *«Таймаут: `Promise.race([request, timeoutReject])`; retry — цикл с `try/catch` вокруг одной попытки.»*

Вопросы из банка (ориентиры): **Q-JS-026**, **Q-JS-027**, **Q-JS-094**, **Q-SCEN-ASYNC-004**.

---

## 11. Задачи для практики

- `async_tasks/4.js` — повторный запрос с таймаутом (`fetchWithTimeout` + `fetchWithRetry`).
- Из банка practice: `retry(fn, { retries, delay })`, `promisePool(tasks, limit)` — см. roadmap / список practical JS.
- Самопроверка: что вернёт `async function f() { return 1 }` при вызове `f()`? (Promise fulfilled `1`, не «голое» число.)

---

## 12. Чеклист перед собесом

- [ ] Объяснить разницу `return` / `throw` в `async`
- [ ] Написать `try/catch` вокруг нескольких `await`
- [ ] Переписать цепочку `.then` в `async/await` и обратно
- [ ] Сделать параллельные запросы через `Promise.all`
- [ ] Собрать timeout через `Promise.race`
- [ ] Объяснить, почему `forEach` + `async` не ждёт завершения
