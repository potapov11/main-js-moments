# `retry(fn, attempts, delay)` — повтор с экспоненциальной задержкой

Классическая practical‑задача на **async/await**, **try/catch внутри цикла** и **backoff** между попытками.

Практика: `async_tasks/5.js`. Теория паттернов: [async/async-patterns.md](../async/async-patterns.md).

---

## Условие

Есть функция `fetchData()`, которая возвращает `Promise`.

Нужно реализовать:

```javascript
retry(fetchData, attempts, delay)
```

### Требования

1. Функция принимает:
   - функцию, возвращающую Promise;
   - количество попыток (`attempts`);
   - базовую задержку (`delay`) в миллисекундах.

2. Логика:
   - выполнить функцию;
   - при успехе — сразу вернуть результат;
   - при ошибке — повторить попытку.

3. Максимум — `attempts` попыток.

4. Задержка между попытками растёт экспоненциально:
   - после 1-й ошибки → `delay`;
   - после 2-й ошибки → `delay * 2`;
   - после 3-й ошибки → `delay * 4`;
   - формула: `delay * 2 ** attemptIndex` (индекс ошибки с нуля).

5. Если все попытки завершились с ошибкой — пробросить **последнюю** ошибку (не оборачивать в новый `Error`).

### Пример

```javascript
retry(fetchData, 3, 1000)
```

Поведение:

```text
Попытка 1 → ошибка → ждём 1000 мс
Попытка 2 → ошибка → ждём 2000 мс
Попытка 3 → успех → возвращаем результат
```

---

## Решение

```javascript
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry(fn, attempts, baseDelay) {
  let lastError;

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      const isLast = attempt === attempts - 1;
      if (isLast) break;

      await wait(baseDelay * 2 ** attempt);
    }
  }

  throw lastError;
}
```

### Почему так

| Деталь | Зачем |
|--------|--------|
| `try/catch` **внутри** цикла | иначе первая ошибка сразу выйдет из `retry` |
| `wait` + `baseDelay` | нет shadowing: параметр не перекрывает helper |
| `baseDelay * 2 ** attempt` | одна формула вместо веток `if (attempt === 0/1)` |
| `attempt === attempts - 1` | работает для любого `attempts`, не только `3` |
| `throw lastError` | промис rejected исходной ошибкой, не `new Error(lastError)` |

### Пример использования

```javascript
async function fetchData() {
  // иногда падает
  const res = await fetch('/api/data');
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

const data = await retry(fetchData, 3, 1000);
```

---

## Типичные ошибки

| Ошибка | Почему плохо | Как исправить |
|--------|--------------|---------------|
| `throw new Error(lastError)` | теряется тип/stack исходной ошибки | `throw lastError` |
| `if (attempt < 2)` | захардкожено под 3 попытки | сравнивать с `attempts - 1` |
| параметр `delay` + функция `delay` | shadowing, вызов ломается | переименовать helper в `wait` |
| ждать **после** последней ошибки | лишняя пауза перед reject | ждать только если есть ещё попытка |

---

## Шпаргалка для собеседования

> «Retry — цикл снаружи, try/catch на одной попытке внутри. Между ошибками — backoff: `baseDelay * 2 ** i`. После исчерпания попыток — `throw` последней ошибки.»
