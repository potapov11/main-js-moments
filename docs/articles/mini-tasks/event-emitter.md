# `EventEmitter` — теория и реализация

Задача: реализовать мини‑систему событий, как в Node.js: подписка, отписка, одноразовая подписка и эмит событий.

Это популярная practical‑задача на **структуры данных**, **замыкания/функции**, и аккуратные edge‑cases.

---

## API

Нужны методы:

- `on(event, listener)` — подписаться
- `off(event, listener)` — отписаться
- `once(event, listener)` — подписаться на 1 срабатывание
- `emit(event, ...args)` — вызвать всех слушателей

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

## Типичные вопросы интервьюера

- Почему копия массива/сета при `emit`?
- Какие сложности у `on/off/emit`?
- Что делать с ошибкой внутри listener (проглотить, пробросить, собрать)?

---

## Шпаргалка

- Храни listeners в `Map(event → Set(listeners))`.
- В `emit` итерация по копии, чтобы `off`/`on` во время `emit` не ломали цикл.

