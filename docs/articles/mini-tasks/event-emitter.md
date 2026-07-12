# `EventEmitter` (pub/sub) — понятная теория и реализация

`EventEmitter` — это мини‑шина событий (**pub/sub**): один код **излучает** событие, другой код **подписывается** и реагирует.

Да, это часто показывают «как в Node.js», потому что там есть известный `EventEmitter`, но сам паттерн — **обычный JavaScript** и встречается в браузере и на фронтенде постоянно.

Это популярная practical‑задача на **структуры данных**, **функции/замыкания** и аккуратные edge‑cases.

---

## API

Нужны методы:

- `on(event, listener)` — подписаться
- `off(event, listener)` — отписаться
- `once(event, listener)` — подписаться на 1 срабатывание
- `emit(event, ...args)` — вызвать всех слушателей

---

## Пример из «классической» разработки (фронтенд)

### 1) Service → UI: события загрузки

Например, есть сервис загрузки файла. UI хочет показывать прогресс и “готово”.

```javascript
const uploaderEvents = new EventEmitter();

// UI
const unsubscribe = uploaderEvents.on('progress', (percent) => {
  // setState(percent) / обновить прогрессбар
  console.log('progress:', percent);
});

uploaderEvents.once('done', (url) => {
  console.log('uploaded:', url);
});

// Service (где-то внутри upload)
uploaderEvents.emit('progress', 10);
uploaderEvents.emit('progress', 50);
uploaderEvents.emit('done', 'https://cdn.example.com/file.png');

unsubscribe(); // можно отписаться при unmount
```

### 2) WebSocket / SSE: события входящих сообщений

```javascript
const wsEvents = new EventEmitter();

wsEvents.on('message', (msg) => console.log('message:', msg));
wsEvents.on('connected', () => console.log('connected'));

// внутри слоя транспорта:
wsEvents.emit('connected');
wsEvents.emit('message', { type: 'ping' });
```

### 3) Мини‑store: уведомления об изменении

```javascript
function createStore(initialState) {
  const events = new EventEmitter();
  let state = initialState;

  return {
    getState() {
      return state;
    },
    setState(patch) {
      state = { ...state, ...patch };
      events.emit('change', state);
    },
    subscribe(listener) {
      return events.on('change', listener);
    },
  };
}
```

---

## Важный edge‑case: удаление listener во время `emit`

Если во время `emit` один listener делает `off` (или `on`) — у тебя не должно:

- пропускать следующие listeners
- вызывать удалённый listener второй раз
- ломать порядок

Самый простой подход: **итерация по копии списка** listeners.

---

## Реализация (класс)

```javascript
class EventEmitter {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(listener);
    return () => this.off(event, listener); // удобно: вернуть unsubscribe
  }

  off(event, listener) {
    const set = this.listeners.get(event);
    if (!set) return;
    set.delete(listener);
    if (set.size === 0) this.listeners.delete(event);
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    return this.on(event, wrapper);
  }

  emit(event, ...args) {
    const set = this.listeners.get(event);
    if (!set) return;

    // Критично: копия, чтобы изменения во время emit не ломали итерацию
    for (const listener of Array.from(set)) {
      listener(...args);
    }
  }
}
```

## Почему я упоминал Node.js

Потому что **название** `EventEmitter` и методы `on/off/once/emit` — это “де-факто стандарт” из экосистемы Node.js, и интервьюеры часто ожидают именно такой интерфейс.

Но на фронтенде та же идея встречается под названиями:

- `Emitter`, `PubSub`, `Bus`, `EventBus`
- или вообще как `subscribe/unsubscribe/notify`

В браузере ещё есть `EventTarget`/`CustomEvent`, но на собеседовании чаще просят написать **свой** emitter, чтобы проверить базовые навыки.

### Почему `Set`, а не `Array`

- проще и быстрее удалять (`delete`)
- проще избежать дубликатов подписок

Если на собесе хотят `Array` — проговори сложность `off` (O(n)) и аккуратность при итерации.

---

## Мини‑тесты (самопроверка)

```javascript
const ee = new EventEmitter();

const a = (x) => console.log('a', x);
const b = (x) => {
  console.log('b', x);
  ee.off('tick', a); // удаляем во время emit
};

ee.on('tick', a);
ee.on('tick', b);

ee.emit('tick', 1);
// ожидаем: a 1, b 1 (порядок сохранён)

ee.emit('tick', 2);
// ожидаем: b 2 (a уже снят)

ee.once('tick', (x) => console.log('once', x));
ee.emit('tick', 3); // once 3
ee.emit('tick', 4); // once уже нет
```

---

## Мини‑практика (задачи)

1) Добавь `listenerCount(event)` и `removeAllListeners(event?)`.

2) Сделай режим “один глобальный канал”:
- `on(listener)` / `emit(payload)` без `event` имени.

3) Добавь `emit` так, чтобы ошибки внутри listener:
- либо не ломали остальных (try/catch и логирование),
- либо собирались в массив ошибок (обсудить trade‑off).

---

## Типичные вопросы интервьюера

- Почему копия массива/сета при `emit`?
- Какие сложности у `on/off/emit`?
- Что делать с ошибкой внутри listener (проглотить, пробросить, собрать)?

---

## Шпаргалка

- Храни listeners в `Map(event → Set(listeners))`.
- В `emit` итерация по копии, чтобы `off`/`on` во время `emit` не ломали цикл.

---

## Вопросы для самопроверки

1) Объясни паттерн pub/sub (шина событий) своими словами. Кто “publisher”, кто “subscriber”?

2) Зачем в `emit` делается итерация по копии (`Array.from(set)`)?
   - Что ломается, если итерироваться по исходному `Set` и во время эмита делать `off`?

3) Почему в реализации выбран `Set`, а не `Array`?
   - Какая сложность у `off` в каждом случае?

4) Что возвращает `on` в этой реализации и зачем это удобно в UI‑коде (unmount)?

5) Как бы ты сделал `removeAllListeners(event?)` и `listenerCount(event)`?

6) Как обрабатывать исключение внутри listener:
   - “падать сразу”
   - “не ломать остальных”
   - “собирать ошибки”
   В чём trade‑offs?

7) Чем `EventEmitter` отличается от DOM `EventTarget`/`CustomEvent`? Когда лучше использовать одно, а когда другое?

