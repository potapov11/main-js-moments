# Паттерны асинхронного кода

Практические приёмы поверх Promise / async/await: таймаут, retry, отмена, ограничение параллелизма. Часто встречаются в practical-задачах и на собесах.

База: [Promise API](promises.md), [async/await](async-await.md), [Event Loop](event-loop.md).  
Практика: `async_tasks/` (в т.ч. `4.js` — retry + timeout).

---

## Ключевые идеи

- Таймаут ≠ «отложить старт»: запрос уже идёт, параллельно тикает reject-таймер → `Promise.race`.
- Retry: цикл снаружи, `try/catch` на **одной** попытке внутри.
- Отмена запроса — `AbortController` / `AbortSignal`, а не «забыть await».
- Параллель без лимита бьёт по серверу и по браузеру — нужен concurrency pool.

---

## 1. Delay

```javascript
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

await delay(300);
```

Полезно для backoff между retry и для тестов.

---

## 2. Timeout через `Promise.race`

```javascript
function withTimeout(promise, ms, message = 'Timeout') {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), ms);
  });
  return Promise.race([promise, timeoutPromise]);
}

await withTimeout(fetchData(url), 1000);
```

| Неправильно | Правильно |
|-------------|-----------|
| `setTimeout(() => fetchData(url), ms)` — откладывает **старт** | Гонка: fetch уже стартовал + reject по таймеру |

`race` **не отменяет** `fetchData`, только игнорирует поздний результат. Чтобы оборвать сеть — см. Abort ниже.

Разбор в [async/await](async-await.md) (§ таймаут + retry).

---

## 3. Retry

```javascript
async function retry(fn, { retries = 3, delayMs = 0 } = {}) {
  let lastError;

  for (let i = 0; i < retries; i += 1) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i < retries - 1 && delayMs) await delay(delayMs);
    }
  }

  throw lastError;
}
```

Важно:

- `try/catch` **внутри** цикла — иначе первая ошибка прервёт retry.
- После всех попыток — `throw`, не `return lastError` (иначе промис fulfilled).

С таймаутом на попытку: `fn = () => withTimeout(fetchData(url), 1000)`.

---

## 4. AbortController

```javascript
const controller = new AbortController();

const p = fetch(url, { signal: controller.signal });

// отмена:
controller.abort(); // fetch → AbortError
```

Типовые сценарии:

- ушёл со страницы / размонтировал компонент → `abort()` в cleanup;
- новый поиск отменяет предыдущий запрос;
- таймаут: `setTimeout(() => controller.abort(), ms)`.

```javascript
async function fetchWithAbortTimeout(url, ms) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}
```

Отличие от «голого» `race`: здесь запрос действительно может быть прерван на уровне сети.

---

## 5. Последовательность vs параллель

```javascript
// последовательно
for (const id of ids) {
  await process(id);
}

// параллельно без лимита
await Promise.all(ids.map((id) => process(id)));
```

### Пул с лимитом concurrency (идея)

Держишь не больше `limit` активных промисов; по мере завершения — берёшь следующую задачу. На собесе часто просят набросать `promisePool(tasks, limit)`.

Упрощённая схема:

```
очередь задач → слоты [., ., .] (limit=3)
когда слот освободился → взять следующую из очереди
когда очередь пуста и слоты пусты → готово
```

---

## 6. Обработка группы запросов

| Нужно | Инструмент |
|-------|------------|
| Все или ничего | `Promise.all` |
| Все статусы по отдельности | `Promise.allSettled` |
| Первый ответ / таймаут | `Promise.race` |
| Первый успех из зеркал | `Promise.any` |

См. таблицы в [promises.md](promises.md).

---

## 7. Ошибки: контракт наружу

```javascript
// плохо: снаружи «успех»
async function load() {
  try {
    return await fetchData();
  } catch (e) {
    return e;
  }
}

// хорошо: либо данные, либо reject
async function load() {
  return await fetchData();
}
```

Если ловите ошибку только чтобы залогировать — после лога `throw e`.

---

## 8. Типичные ошибки

| Ошибка | Исправление |
|--------|-------------|
| `try/catch` вокруг всего цикла retry | Перенести внутрь итерации |
| `return error` вместо `throw` | `throw` / `Promise.reject` |
| Таймаут через отложенный старт `setTimeout` | `Promise.race` или `abort` |
| Забыли `await` в retry | Не поймаете ошибку, «успех» с промисом |
| `forEach(async …)` | `for...of` или `map` + `all` / pool |

---

## 9. Шпаргалка

1. *«Timeout = race(запрос, reject по таймеру) или abort.»*
2. *«Retry = for + try/catch на попытку + throw в конце.»*
3. *«Отмена = AbortSignal.»*
4. *«Много задач = all / allSettled / pool с limit.»*

---

## 10. Практика в репозитории

- `async_tasks/4.js` — `fetchWithTimeout` + `fetchWithRetry`
- Банк: `Q-PRACT-005` (retry + AbortSignal), `Q-PRACT-006` (promisePool)
