# `async` / `await` и обработка ошибок

`async` / `await` — синтаксис поверх Promise. Он позволяет записывать асинхронный код в порядке, похожем на обычный последовательный код, не отменяя асинхронность.

## `async`-функция всегда возвращает Promise

```javascript
async function getAnswer() {
  return 42;
}

getAnswer().then(console.log); // 42
```

Даже если вернуть обычное значение, JavaScript обернёт его в успешно выполненный промис: `Promise.resolve(42)`.

Если внутри `async`-функции выбросить ошибку, возвращённый промис станет `rejected`:

```javascript
async function save() {
  throw new Error('Не удалось сохранить');
}

save().catch((error) => console.error(error.message));
```

## Что делает `await`

`await` ожидает завершения промиса и даёт его успешное значение. Его можно использовать внутри `async`-функции (либо на верхнем уровне ES-модуля).

```javascript
async function showUser() {
  const response = await fetch('/api/user/1');
  const user = await response.json();

  console.log(user.name);
}
```

`await` приостанавливает **только текущую async-функцию**, а не весь JavaScript и не браузер. Пока она ждёт сеть, могут обрабатываться клики, таймеры и другие задачи.

## Ошибки: `try/catch`

Если ожидаемый промис отклонён, `await` выбрасывает ошибку. Поэтому ошибки обычно ловят через `try/catch`:

```javascript
async function loadUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Не удалось загрузить пользователя:', error.message);
    throw error; // передаём ошибку вызывающему коду
  }
}
```

!!! note "Почему проверяют `response.ok`"
    `fetch()` отклоняет промис при сетевой ошибке, но HTTP-ответ `404` или `500` обычно считается успешным завершением сетевого запроса. Поэтому после `await fetch()` нужно вручную проверить `response.ok`.

## Последовательно или параллельно

Следующий код выполняет запросы **последовательно**: второй стартует только после первого.

```javascript
const user = await getUser();
const posts = await getPosts(user.id);
```

Это верно, когда второй запрос использует результат первого. Если зависимости нет, запускайте операции вместе и ожидайте их через `Promise.all`:

```javascript
const [user, settings] = await Promise.all([
  getUser(),
  getSettings(),
]);
```

Не пишите независимые ожидания одно за другим: так запросы будут идти медленнее без причины.

## `.then()` и `await`

Оба варианта работают с теми же промисами:

```javascript
function getNameWithThen() {
  return getUser().then((user) => user.name);
}

async function getNameWithAwait() {
  const user = await getUser();
  return user.name;
}
```

`await` обычно удобнее для ветвлений и `try/catch`; `.then()` полезен в коротких цепочках или когда нужно вернуть преобразованный промис без `async`.

## Шпаргалка для собеседования

> `async`-функция всегда возвращает Promise. `await` ждёт конкретный Promise внутри этой функции: при успехе возвращает его значение, при `rejected` выбрасывает ошибку, которую можно перехватить через `try/catch`.
