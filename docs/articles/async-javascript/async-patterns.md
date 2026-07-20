# Асинхронные паттерны: задержка, запросы и fallback

В этой статье — практические паттерны, которые часто встречаются в задачах и frontend-коде.

## Задержка через Promise

`setTimeout` использует callback, поэтому его нельзя написать как `await setTimeout(...)`. Оборачиваем таймер в промис:

```javascript
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

await wait(1_000);
console.log('Прошла одна секунда');
```

По истечении `ms` таймер вызывает `resolve()`, и промис из `wait` успешно завершается со значением `undefined`.

## Цепочка зависимых запросов

Если второй запрос требует данные из первого, запросы должны быть последовательными:

```javascript
async function getUserPosts(userId) {
  const userResponse = await fetch(`/api/users/${userId}`);
  if (!userResponse.ok) throw new Error('Не удалось загрузить пользователя');

  const user = await userResponse.json();

  const postsResponse = await fetch(`/api/posts?userId=${user.id}`);
  if (!postsResponse.ok) throw new Error('Не удалось загрузить посты');

  const posts = await postsResponse.json();
  return { user, posts };
}
```

Если первый запрос завершится ошибкой, выполнение прервётся и второй запрос не начнётся. Готовый пример задачи находится в `async_tasks/1.js`.

## Последовательные запросы с задержкой

Когда запросы надо выполнять по одному, используйте `for...of`: он дружит с `await`.

```javascript
async function fetchWithDelay(urls, delay) {
  const results = [];

  for (const url of urls) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    results.push(await response.json());
    await wait(delay);
  }

  return results;
}
```

Ошибка любого запроса прервёт функцию и вернёт отклонённый промис. В отличие от `Promise.all`, здесь следующий запрос не стартует, пока не завершён предыдущий. Практика: `async_tasks/2.js`.

## Гонка с запасным вариантом (fallback)

Задача: вернуть результат основного `promise1`, если он успеет за `ms` миллисекунд; иначе — дождаться и вернуть результат запасного `promise2`.

```javascript
function raceWithFallback(promise1, promise2, ms) {
  const fallbackAfterTimeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      promise2.then(resolve, reject);
    }, ms);
  });

  return Promise.race([promise1, fallbackAfterTimeout]);
}
```

### Как это работает

1. `fallbackAfterTimeout` создаётся в состоянии `pending`.
2. `setTimeout` откладывает подключение к `promise2` на `ms` миллисекунд.
3. После таймера вызывается `promise2.then(resolve, reject)`.
4. Если `promise2` завершился раньше, `.then(...)` всё равно вызовет `resolve` асинхронно уже после таймера. Если он ещё выполняется — `fallbackAfterTimeout` будет ждать его.
5. `Promise.race` выбирает того, кто завершится раньше: `promise1` или `fallbackAfterTimeout`.

Ключевая строка:

```javascript
promise2.then(resolve, reject);
```

Эквивалентна следующему коду:

```javascript
promise2.then(
  (value) => resolve(value),
  (error) => reject(error),
);
```

То есть значение или ошибка `promise2` передаются во внешний промис. В исходном упражнении использовалось только `promise2.then(resolve)`: оно передаёт успешное значение, но не передаёт ошибку. Вариант с `reject` корректнее обрабатывает оба исхода.

!!! note "Проигравшие промисы не отменяются"
    После победы в `Promise.race` основной и запасной промисы могут продолжать выполняться. Для отменяемой операции, например `fetch`, применяйте `AbortController`.

Практика: `async_tasks/3.js`.

## Чек-лист для практики

- Напишите `wait(ms)` по памяти.
- Реализуйте `fetchWithTimeout(url, ms)` через `Promise.race`.
- Сделайте fallback, где `promise2` сначала отклоняется, и убедитесь, что ошибка доходит до `.catch()`.
- Напишите три независимых запроса через `Promise.all`, затем перепишите их последовательным циклом и сравните поведение.
- Перепишите одну цепочку `.then()` на `async` / `await`, не теряя `return` и обработку ошибок.
