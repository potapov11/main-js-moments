# Хук `useDebouncedValue` (aka `useDebounce`)

Задача: написать хук, который возвращает **отложенное** значение: обновляется только если `value` не менялось `delay` мс.

Типичный кейс: инпут поиска + запрос на сервер.

---

## Контракт

```javascript
const debounced = useDebouncedValue(value, delay);
```

- Если `value` часто меняется, `debounced` меняется **реже**.
- На каждом новом `value` старый таймер очищается.
- При размонтировании — cleanup таймера.

---

## Реализация (JS)

```javascript
import { useEffect, useState } from 'react';

export function useDebouncedValue(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
```

### Почему deps именно `[value, delay]`

- хук должен реагировать на изменение **значения** и **задержки**

---

## Пример использования

```javascript
import { useEffect, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => {
    if (!debouncedQuery) return;
    // fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`)
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search…"
    />
  );
}
```

---

## Частые проблемы и вопросы

### 1) «Stale closure»

В этой версии stale closure обычно не возникает, потому что `value` — dependency эффекта.

Но stale closure часто появляется, если вы делаете `debounce` для коллбэка (а не для значения) и забываете правильно обновлять ссылку на `fn`.

### 2) Что возвращать на первом рендере

Обычно возвращают исходное `value` (как в примере) — тогда UI не “прыгает”.

### 3) Как отменять запросы

Этот хук лишь **стабилизирует значение**. Отмену запросов делают отдельно (например через `AbortController` в `useEffect`).

---

## Мини‑задача для практики

1) Напиши `useDebouncedCallback(fn, delay)`:
- возвращает дебаунс‑функцию
- не ломается на ре-рендерах
- имеет `cancel()` / `flush()`

2) Добавь обработку «битого delay»:
- если `delay <= 0` — обновлять сразу

---

## Вопросы для самопроверки

1) Объясни, что именно “дебаунсится”: **значение** или **коллбэк**? В чём разница между `useDebouncedValue` и `debounce(fn)`?

2) Почему мы делаем `clearTimeout` в cleanup? Что будет без cleanup при быстром вводе или при unmount?

3) Почему зависимости эффекта именно `[value, delay]`? Что сломается, если `delay` не включить?

4) Что вернёт хук на первом рендере и почему это удобно для UI?

5) Где может появиться stale closure при работе с debounce в React и почему в этой версии это обычно не проблема?

6) Почему для сетевых запросов одного `useDebouncedValue` недостаточно? Что ещё нужно добавить в `useEffect` (например, отмена через `AbortController`)?

7) Чем отличается debounce от throttle в UI‑задачах (поиск vs scroll)?

