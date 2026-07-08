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

