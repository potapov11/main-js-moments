# Promise и Promise API

**Promise** — объект, представляющий результат операции, которого сейчас может ещё не быть.

Это важнее, чем определение «Promise — способ работы с асинхронностью». Promise сам по себе не делает операцию асинхронной и не выполняет её «в фоне». Он представляет **состояние и будущий результат** некоторой операции.

Например:

```javascript
const promise = fetch('/api/users');
```

HTTP-запрос уже начался, ответа ещё может не быть, но `fetch()` сразу возвращает объект `Promise`.

Упрощённая модель:

```text
операция началась
↓
результата ещё нет
↓
Promise = pending
↓
операция завершилась
↓
Promise = fulfilled(value) или rejected(reason)
```

На собеседовании обычно ждут: три состояния, settle один раз, цепочки `.then`, обработку ошибок, отличие `all` / `allSettled` / `race` / `any` и понимание того, что callbacks `.then()` выполняются как microtasks.

Связано: [Event Loop](event-loop.md), [async/await](async-await.md), [паттерны асинхронности](async-patterns.md).

---

## 1. Главная mental model: Promise — не сама операция

Полезно разделять две сущности:

```text
асинхронная операция
и
Promise, представляющий её результат
```

Например:

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

Здесь:

- `setTimeout` — механизм, который организует внешнее ожидание;
- Promise — объект, представляющий результат этого ожидания;
- `resolve()` — сигнал Promise: операция успешно закончилась.

Promise сам не отсчитывает миллисекунды.

После вызова:

```javascript
const p = delay(2000);
```

`p` возвращается **сразу**. Первые две секунды он просто находится в состоянии `pending`.

```text
delay(2000)
↓
создаётся Promise
↓
Promise возвращается наружу сразу как pending
↓
таймер работает отдельно
↓
через ~2000 мс callback вызывает resolve()
↓
Promise становится fulfilled
```

То же самое полезно представлять и для сети:

```text
HTTP request ≠ Promise

HTTP request → выполняет внешнюю работу
Promise      → представляет её состояние и результат
```

---

## 2. Состояния Promise

Promise имеет три состояния:

| Состояние | Смысл |
|-----------|-------|
| `pending` | результат ещё неизвестен |
| `fulfilled` | операция завершилась успешно, есть `value` |
| `rejected` | операция завершилась ошибкой, есть `reason` |

Переход возможен только один раз:

```text
pending → fulfilled

или

pending → rejected
```

После этого Promise **settled** — завершён.

Нельзя сделать:

```text
fulfilled → pending
fulfilled → rejected
rejected  → fulfilled
```

Например:

```javascript
const promise = new Promise((resolve) => {
  resolve(10);
  resolve(20);
});

promise.then(console.log); // 10
```

После первого `resolve(10)` Promise уже settled. Последующие попытки изменить его состояние ничего не меняют.

---

## 3. `new Promise` и executor

При создании Promise:

```javascript
const promise = new Promise((resolve, reject) => {
  // ...
});
```

функция:

```javascript
(resolve, reject) => {
  // ...
}
```

называется **executor**.

Критически важная деталь: **executor вызывается синхронно сразу при создании Promise**.

```javascript
console.log('A');

new Promise((resolve) => {
  console.log('B');
  resolve();
});

console.log('C');
```

Результат:

```text
A
B
C
```

Не `A → C → B`.

`new Promise(...)` не означает «выполни всё внутри позже».

Асинхронность появляется только тогда, когда executor запускает механизм, который действительно завершится позже: таймер, сетевой запрос, callback API, событие и т. п.

Пример:

```javascript
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('READY');
  }, 2000);
});
```

Пошагово:

```text
new Promise(...)
↓
executor запускается сразу
↓
setTimeout регистрирует таймер
↓
executor заканчивается
↓
Promise остаётся pending
↓
через ~2 секунды callback таймера вызывает resolve('READY')
↓
Promise становится fulfilled('READY')
```

### Откуда берутся `resolve` и `reject`

Мы их не объявляем сами:

```javascript
new Promise((resolve, reject) => {
  // resolve и reject переданы реализацией Promise
});
```

- `resolve(value)` сообщает об успешном результате;
- `reject(reason)` сообщает об ошибке.

Например:

```javascript
function loadUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Sergey' });
      } else {
        reject(new Error('Invalid user id'));
      }
    }, 1000);
  });
}
```

---

## 4. `resolve()` не означает «вызвать `.then()` синхронно»

Даже если Promise уже fulfilled, callback `.then()` не выполняется прямо в текущем синхронном стеке.

```javascript
const promise = Promise.resolve(42);

promise.then((value) => {
  console.log(value);
});

console.log('END');
```

Результат:

```text
END
42
```

Почему?

Callback `.then()` выполняется через **microtask queue**.

Упрощённо:

```text
текущий synchronous job
↓
call stack опустел
↓
microtasks
↓
следующая task/macrotask
```

Поэтому `Promise.resolve()` не стоит воспринимать как «сделать код асинхронным».

```javascript
const p = Promise.resolve(100);
```

просто создаёт уже fulfilled Promise с `value = 100`.

А вот обработчик:

```javascript
p.then(...)
```

выполнится через microtask.

Подробнее: [Event Loop](event-loop.md).

---

## 5. Registered !== queued

Одна из самых важных моделей для понимания Promise chaining.

Рассмотрим Promise, который завершится через две секунды:

```javascript
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(100);
  }, 2000);
});

promise.then((value) => {
  console.log(value);
});
```

Когда выполняется `.then(...)`, Promise ещё `pending`.

Callback уже **зарегистрирован** как реакция на Promise, но ещё не может выполняться и не обязан находиться в microtask queue.

```text
.then(callback)
↓
callback зарегистрирован
↓
Promise pending
↓
callback ждёт
```

Через две секунды:

```text
resolve(100)
↓
Promise fulfilled
↓
реакция становится готова
↓
callback планируется как microtask
```

Ключевая формула:

```text
registered !== queued
```

То, что `.then(callback)` уже был вызван, ещё не означает, что `callback` уже лежит в очереди microtasks.

---

## 6. Каждый `.then()` возвращает новый Promise

Это фундамент Promise chaining.

Код:

```javascript
Promise.resolve(10)
  .then((value) => {
    return value * 2;
  })
  .then((value) => {
    console.log(value);
  });
```

удобнее мысленно развернуть так:

```javascript
const p1 = Promise.resolve(10);

const p2 = p1.then((value) => {
  return value * 2;
});

const p3 = p2.then((value) => {
  console.log(value);
});
```

Получается цепочка:

```text
p1
↓ .then(...)
p2
↓ .then(...)
p3
```

Второй `.then()` подписывается **не на `p1`**, а на новый Promise `p2`, возвращённый первым `.then()`.

Это объясняет, почему второй callback не обязательно сразу находится в microtask queue.

---

## 7. Что делает `return` внутри `.then()`

У callback `.then()` есть несколько принципиально разных вариантов результата.

### Вариант 1 — обычное значение

```javascript
Promise.resolve()
  .then(() => {
    return 123;
  })
  .then((value) => {
    console.log(value);
  });
```

Результат:

```text
123
```

Модель:

```text
callback первого .then()
↓
return 123
↓
Promise, возвращённый первым .then(), становится fulfilled(123)
↓
следующий .then() получает 123
```

То есть обычное возвращаемое значение автоматически становится результатом следующего этапа Promise chain.

### Вариант 2 — Promise

```javascript
Promise.resolve()
  .then(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('READY');
      }, 1000);
    });
  })
  .then((value) => {
    console.log(value);
  });
```

Второй `.then()` ждёт.

Модель:

```text
callback вернул Promise
↓
Promise следующего этапа зависит от его результата
↓
returned Promise pending
↓
resolve('READY')
↓
следующий этап получает READY
```

Полезная формула:

```text
.then(callback)
      ↓
callback что-то возвращает
      ↓
обычное значение → следующий этап получает это значение

Promise → следующий этап зависит от результата этого Promise
```

### Вариант 3 — `throw`

```javascript
Promise.resolve()
  .then(() => {
    throw new Error('Boom');
  })
  .then(() => {
    console.log('SUCCESS');
  })
  .catch((error) => {
    console.log(error.message);
  });
```

Результат:

```text
Boom
```

Если callback бросает исключение, Promise, возвращённый этим `.then()`, становится `rejected`.

### Вариант 4 — ничего не возвращаем

```javascript
Promise.resolve(10)
  .then((value) => {
    console.log(value);
  })
  .then((value) => {
    console.log(value);
  });
```

Во втором `.then()` будет:

```text
undefined
```

Потому что отсутствие `return` эквивалентно:

```javascript
return undefined;
```

---

## 8. Почему цепочка ждёт возвращённый Promise

Особенно важен случай:

```javascript
Promise.resolve()
  .then(() => {
    return Promise.resolve(100);
  })
  .then((value) => {
    console.log(value);
  });
```

Результат:

```text
100
```

Мы не получаем во втором `.then()` объект `Promise`.

Promise resolution procedure «усваивает» состояние возвращённого Promise: следующий этап зависит от его settlement.

Практически полезная формулировка:

> Если из `.then()` вернуть Promise, следующий `.then()` будет ждать результат этого Promise.

Именно поэтому возможны последовательные асинхронные цепочки:

```javascript
login()
  .then((token) => getUser(token))
  .then((user) => getOrders(user.id))
  .then((orders) => renderOrders(orders))
  .catch(handleError);
```

Каждый этап может вернуть Promise, и цепочка не «проваливается» вперёд раньше времени.

---

## 9. Promise chaining и очередь microtasks

Рассмотрим пример:

```javascript
console.log('A');

Promise.resolve()
  .then(() => {
    console.log('B');
    return 123;
  })
  .then((value) => {
    console.log('C', value);
  });

Promise.resolve().then(() => {
  console.log('D');
});

console.log('E');
```

Результат:

```text
A
E
B
D
C 123
```

Почему `D` раньше `C`?

Во время синхронной фазы:

```text
callback B → уже может быть поставлен в microtask queue
callback C → только зарегистрирован на Promise p2, который ещё pending
callback D → может быть поставлен в microtask queue
```

Очередь примерно:

```text
[B, D]
```

Когда выполняется `B`:

```text
B
↓
return 123
↓
p2 становится fulfilled(123)
↓
C добавляется в microtask queue
```

Но `D` уже стоял там раньше:

```text
[D, C]
```

Поэтому итог:

```text
A → E → B → D → C
```

Это намного точнее, чем модель «все `.then()` сразу попадают в microtasks».

---

## 10. `then`, `catch`, `finally`

Базовый API:

```javascript
promise
  .then(onFulfilled, onRejected)
  .catch(onRejected)
  .finally(onFinally);
```

`catch` концептуально близок к:

```javascript
promise.then(undefined, onRejected);
```

Пример:

```javascript
fetch('/api')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('done');
  });
```

Основные правила:

1. Вернул обычное значение → следующий Promise fulfilled этим значением.
2. Вернул Promise → следующий этап ждёт его settle.
3. `throw` → Promise текущего этапа rejected.
4. `catch` тоже возвращает новый Promise.
5. Если `.catch()` обработал ошибку и нормально вернул значение, цепочка снова становится fulfilled.

Например:

```javascript
Promise.reject(new Error('network'))
  .catch((error) => {
    console.log(error.message);
    return 'fallback';
  })
  .then((value) => {
    console.log(value);
  });
```

Результат:

```text
network
fallback
```

### Важная деталь про `finally`

`finally` обычно используют для cleanup:

```javascript
showLoader();

loadData()
  .then(render)
  .catch(showError)
  .finally(hideLoader);
```

Он не получает обычный `value` / `reason` как аргумент и обычно сохраняет предыдущий результат цепочки.

Но если `finally` сам бросит ошибку или вернёт rejected Promise, эта новая ошибка изменит дальнейший результат цепочки.

---

## 11. Ошибки и unhandled rejection

Если Promise стал rejected, но ошибка нигде не обработана, среда может сообщить об **unhandled rejection**.

```javascript
Promise.reject(new Error('Boom'));
```

Для корневых асинхронных операций нужна точка обработки:

```javascript
loadData().catch(handleError);
```

или при `await`:

```javascript
async function run() {
  try {
    const data = await loadData();
    render(data);
  } catch (error) {
    handleError(error);
  }
}
```

Предпочтительно reject-ить объектом `Error`, а не строкой:

```javascript
reject(new Error('Timeout'));
```

Так сохраняются stack trace и нормальная семантика ошибки.

---

## 12. Связь Promise и `async/await`

`async/await` не заменяет Promise. Это более удобный синтаксис работы с Promise.

Promise chain:

```javascript
loadUser(5)
  .then((user) => {
    return loadOrders(user.id);
  })
  .then((orders) => {
    console.log(orders);
  })
  .catch(console.error);
```

То же с `async/await`:

```javascript
async function run() {
  try {
    const user = await loadUser(5);
    const orders = await loadOrders(user.id);

    console.log(orders);
  } catch (error) {
    console.error(error);
  }
}
```

Под капотом модель всё равно Promise-based.

### `async function` всегда возвращает Promise

```javascript
async function getNumber() {
  return 10;
}

const result = getNumber();
```

`result` — не число `10`, а Promise, который будет fulfilled значением `10`.

Концептуально:

```javascript
async function getNumber() {
  return 10;
}
```

похоже по внешнему результату на:

```javascript
function getNumber() {
  return Promise.resolve(10);
}
```

### Код до первого `await` выполняется синхронно

```javascript
console.log('A');

async function run() {
  console.log('B');
  await Promise.resolve();
  console.log('C');
}

run();
console.log('D');
```

Результат:

```text
A
B
D
C
```

Модель:

```text
run() вызывается
↓
B выполняется синхронно
↓
await создаёт границу
↓
run() отдаёт управление наружу
↓
D
↓
продолжение после await выполняется позже как microtask
↓
C
```

То есть `async` не означает «вся функция выполняется потом».

Подробнее: [async/await](async-await.md).

---

## 13. Даже `await` обычного значения создаёт асинхронную границу

```javascript
console.log('A');

async function run() {
  console.log('B');
  await 123;
  console.log('C');
}

run();
console.log('D');
```

Результат:

```text
A
B
D
C
```

Хотя `123` не Promise, продолжение после `await` всё равно выполняется позже.

Это полезно помнить: `await` всегда разделяет выполнение функции на часть **до await** и продолжение **после await**.

---

## 14. Promise API — комбинаторы

Пусть есть независимые операции:

```javascript
const p1 = loadUser();
const p2 = loadOrders();
const p3 = loadNotifications();
```

### `Promise.all(iterable)`

Нужны **все результаты**.

```javascript
const [user, orders, notifications] = await Promise.all([
  loadUser(),
  loadOrders(),
  loadNotifications(),
]);
```

Свойства:

- fulfilled, когда fulfilled все входные Promise;
- результат — массив в **порядке входных элементов**, а не в порядке фактического завершения;
- первый reject делает результирующий Promise rejected;
- остальные операции при этом автоматически не отменяются.

Когда применять: данные независимы, но для продолжения нужны все.

### Почему это иногда быстрее последовательных `await`

Последовательно:

```javascript
const user = await loadUser();
const orders = await loadOrders();
const notifications = await loadNotifications();
```

Если каждая операция занимает примерно секунду и следующая не зависит от предыдущей, мы зря ждём их последовательно.

Параллельный запуск:

```javascript
const [user, orders, notifications] = await Promise.all([
  loadUser(),
  loadOrders(),
  loadNotifications(),
]);
```

Все операции стартуют до ожидания общего результата.

Важно: Promise не создаёт «параллельные потоки JavaScript». Речь о конкурентно выполняющихся внешних операциях.

### `Promise.allSettled(iterable)`

Нужно дождаться **всех**, даже если часть завершилась ошибкой.

```javascript
const results = await Promise.allSettled([
  loadProfile(),
  loadStats(),
  loadNotifications(),
]);
```

Результат:

```javascript
[
  { status: 'fulfilled', value: profile },
  { status: 'rejected', reason: error },
  { status: 'fulfilled', value: notifications },
]
```

Хороший production-пример — dashboard, где падение одного независимого widget не должно ломать все остальные.

### `Promise.race(iterable)`

Результат определяет **первый settled Promise** — неважно, успех это или ошибка.

```javascript
const result = await Promise.race([
  fetch('/api/data'),
  timeoutReject(5000),
]);
```

Частый use case — timeout.

### `Promise.any(iterable)`

Нужен первый **успешный** результат.

```javascript
const data = await Promise.any([
  loadFromMirrorA(),
  loadFromMirrorB(),
  loadFromMirrorC(),
]);
```

Rejected Promise игнорируются, пока остаётся шанс на успех.

Если rejected все — результирующий Promise rejected с `AggregateError`.

### Сравнение

| Метод | Когда fulfilled | Когда rejected | Главная идея |
|-------|-----------------|---------------|--------------|
| `all` | все fulfilled | первый reject | нужны все результаты |
| `allSettled` | когда все settle | обычно не reject из-за входных Promise | нужны статусы всех |
| `race` | первый settle оказался fulfilled | первый settle оказался rejected | кто закончил первым |
| `any` | первый fulfilled | все rejected | кто первым успешно закончил |

Короткая формула:

```text
all        → все или ошибка
allSettled → результаты всех
race       → первый settle
any        → первый success
```

---

## 15. `all` и `race` не отменяют проигравшие операции

Например:

```javascript
await Promise.race([
  fetch('/api/data'),
  timeoutReject(1000),
]);
```

Если timeout выиграл race, это **не означает**, что `fetch` автоматически был отменён.

Promise combinator управляет результатом Promise, а не жизненным циклом внешней операции.

Для реальной отмены `fetch` нужен `AbortController` / `AbortSignal`.

Подробнее: [паттерны асинхронности](async-patterns.md).

---

## 16. Пустой массив у combinators

| Метод | `[]` |
|-------|------|
| `Promise.all([])` | fulfilled с `[]` |
| `Promise.allSettled([])` | fulfilled с `[]` |
| `Promise.race([])` | остаётся pending |
| `Promise.any([])` | rejected с `AggregateError` |

Это редко нужно в everyday-коде, но хорошо показывает разную семантику методов.

---

## 17. Оборачивание callback API в Promise

Promise особенно полезен как адаптер старого callback-based API.

Например `delay`:

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
```

Использование:

```javascript
async function run() {
  console.log('START');

  await delay(2000);

  console.log('END');
}
```

Главная модель:

```text
delay()
↓
сама возвращает Promise
↓
Promise pending
↓
таймер срабатывает
↓
callback вызывает resolve()
↓
тот же Promise становится fulfilled
↓
await может продолжить async-функцию
```

### Типичная ошибка

```javascript
async function delay(ms) {
  setTimeout(() => {
    return Promise.resolve();
  }, ms);
}
```

Это не работает как delay.

Почему?

`return` находится **внутри callback `setTimeout`** и возвращает значение только из этого callback.

Он не возвращает Promise из `delay()` и не связывает таймер с Promise, который ожидает вызывающая сторона.

Более того, поскольку `delay` объявлена `async` и ничего явно не возвращает, она фактически возвращает быстро fulfilled Promise с `undefined`.

То есть:

```text
return внутри callback ≠ return из внешней функции
```

Правильное решение — создать Promise снаружи callback, а callback должен завершить именно его через `resolve()`.

---

## 18. Почему `async` у `delay()` не нужен

Оба варианта технически возвращают Promise:

```javascript
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

и:

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

Но `async` здесь ничего полезного не добавляет: функция уже вручную возвращает Promise.

Поэтому второй вариант проще и точнее выражает намерение.

Отдельно: executor `new Promise(...)` обычно не стоит делать `async` без необходимости. Ошибки из `async` executor могут вести к неожиданной обработке и не связываться с внешним Promise так, как ожидает разработчик.

---

## 19. Thenable

Promise ecosystem работает не только с настоящими экземплярами `Promise`.

Объект с методом `.then()` может вести себя как Promise-подобный объект — **thenable**.

```javascript
const thenable = {
  then(resolve) {
    resolve(42);
  },
};

Promise.resolve(thenable).then(console.log); // 42
```

`await` тоже умеет работать с thenable.

Для собеседования достаточно понимать:

> Thenable — объект, соответствующий Promise-like контракту через метод `then`.

---

## 20. Типичные ошибки

| Ошибка | Правильная модель |
|--------|-------------------|
| Считать Promise самой асинхронной операцией | Promise представляет состояние/результат операции |
| Считать executor асинхронным | Executor `new Promise` вызывается синхронно |
| Думать, что `resolve()` синхронно вызывает `.then()` | Реакции Promise выполняются через microtasks |
| Думать, что все `.then()` цепочки сразу стоят в microtask queue | Callback может быть зарегистрирован на pending Promise и ещё не быть queued |
| Забыть, что `.then()` возвращает новый Promise | Следующий `.then()` подписывается на результат предыдущего этапа |
| Забыть `return` в `.then()` | Следующий этап получит `undefined` |
| `.then(fn())` вместо `.then(fn)` | `fn` вызывается немедленно, в `.then` передаётся результат вызова |
| `return Promise.resolve()` внутри callback таймера как попытка завершить внешний Promise | Нужно вызвать `resolve()` Promise, созданного внешней функцией |
| Думать, что `Promise.all` отменяет остальные операции | Для отмены нужен механизм самой операции, например `AbortSignal` |
| Путать `race` и `any` | `race` — первый settle, `any` — первый fulfill |
| Глотать ошибку в `.catch()` | Если вернуть нормальное значение, цепочка после catch снова fulfilled |
| Добавлять `async` к функции, которая уже просто возвращает Promise | Часто это лишняя оболочка |

---

## 21. Ментальная карта Promise

```text
Promise
│
├── pending
│     │
│     ├── resolve(value)
│     │      ↓
│     │   fulfilled
│     │      ↓
│     │   реакции .then()
│     │      ↓
│     │   microtask queue
│     │
│     └── reject(reason)
│            ↓
│         rejected
│            ↓
│         реакции .catch() / onRejected
│            ↓
│         microtask queue
│
└── после settle состояние больше не меняется
```

Для chaining:

```text
Promise p1
↓
.then(callback)
↓
создаётся Promise p2

callback вернул обычное значение
↓
p2 fulfilled(value)

callback вернул Promise
↓
p2 зависит от его результата

callback бросил ошибку
↓
p2 rejected(error)
```

---

## 22. Что важно уметь объяснить на собеседовании

Базовый ответ на вопрос «что такое Promise?»:

> Promise — объект, представляющий будущий результат операции. У него есть состояния pending, fulfilled и rejected; settle происходит один раз. Обработчики `.then/.catch` выполняются асинхронно через microtask queue, а каждый `.then()` возвращает новый Promise, поэтому можно строить цепочки и передавать результат между этапами.

Если интервьюер просит глубже, стоит добавить:

> Сам Promise не выполняет асинхронную работу. Например, сетевой запрос или таймер живут отдельно, а Promise представляет их результат. Executor `new Promise` выполняется синхронно. Если callback `.then()` возвращает Promise, следующий этап цепочки ждёт его settlement.

И дальше привести короткий пример:

```javascript
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

---

## 23. Контрольные вопросы

После статьи полезно суметь без подсказки ответить:

1. Чем Promise отличается от самой асинхронной операции?
2. Когда запускается executor `new Promise(...)`?
3. Может ли Promise после `fulfilled` стать `rejected`?
4. Почему `.then()` на уже fulfilled Promise не выполняется синхронно?
5. Что означает `registered !== queued`?
6. Что возвращает `.then()`?
7. Что произойдёт, если callback `.then()` вернёт обычное значение?
8. Что произойдёт, если он вернёт Promise?
9. Что произойдёт при `throw` внутри `.then()`?
10. Почему `return Promise.resolve()` внутри callback `setTimeout` не завершает внешний `delay()`?
11. Чем `Promise.race` отличается от `Promise.any`?
12. Почему `Promise.all` не является механизмом отмены запросов?
13. Как `async/await` связан с Promise?
14. Какая часть `async function` выполняется синхронно?

---

## 24. Практика

### Задача 1 — `delay`

Самостоятельно реализовать:

```javascript
function delay(ms) {
  // ...
}
```

чтобы:

```javascript
console.log('START');
await delay(1000);
console.log('END');
```

выводило `END` примерно через секунду.

### Задача 2 — передать значение

```javascript
function delay(ms, value) {
  // Promise должен стать fulfilled(value) через ms
}

const result = await delay(1000, 'READY');
console.log(result); // READY
```

### Задача 3 — Promise chaining

Не запускать код, сначала предсказать порядок:

```javascript
console.log('A');

Promise.resolve()
  .then(() => {
    console.log('B');
    return 123;
  })
  .then((value) => {
    console.log('C', value);
  });

Promise.resolve().then(() => {
  console.log('D');
});

console.log('E');
```

Отдельно объяснить, **когда именно callback с `C` попадает в microtask queue**.

### Задача 4 — combinators

Объяснить, какой метод нужен в каждом случае:

- страница требует сразу `user + orders + permissions`;
- dashboard может показать 4 из 5 успешно загрузившихся widgets;
- есть основной запрос и timeout;
- есть три зеркала API, нужен первый успешный ответ.

---

## Короткая шпаргалка

```text
Promise = объект будущего результата

pending → fulfilled(value)
pending → rejected(reason)

executor new Promise → синхронный
.then callback         → microtask
.then()                → новый Promise

return value   → следующий Promise fulfilled(value)
return Promise → следующий этап ждёт его
throw error    → следующий Promise rejected

all        → нужны все
allSettled → нужны результаты всех
race       → первый settle
any        → первый success

async function → всегда возвращает Promise
до await       → выполняется синхронно
после await    → продолжение позже через microtask
```
