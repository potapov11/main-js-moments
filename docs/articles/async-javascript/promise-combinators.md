# Методы Promise: `all`, `race`, `allSettled`, `any`

Методы-комбинаторы принимают набор промисов и возвращают один новый промис. Выбор зависит от того, нужно ли дождаться всех операций, первого результата или собрать все исходы.

## Сравнение

| Метод | Успешное завершение | Ошибка |
|---|---|---|
| `Promise.all` | Когда успешны **все**; результат — массив значений по исходному порядку. | Отклоняется при первой ошибке. |
| `Promise.race` | Когда завершился **первый** промис; его значение становится результатом. | Отклоняется, если первым завершился отклонённый промис. |
| `Promise.allSettled` | Когда завершились **все**; результат — массив статусов. | Сам не отклоняется из-за ошибки элемента. |
| `Promise.any` | Когда успешно завершился **первый** промис. | Отклоняется с `AggregateError`, если отклонены все. |

## `Promise.all`

Используйте для независимых операций, результаты которых нужны все:

```javascript
const [user, notifications] = await Promise.all([
  getUser(),
  getNotifications(),
]);
```

Операции запускаются до вызова `Promise.all` и могут выполняться параллельно. Массив результатов сохраняет порядок входного массива, а не порядок завершения.

```javascript
const results = await Promise.all([
  Promise.resolve('первый'),
  Promise.resolve('второй'),
]);

console.log(results); // ['первый', 'второй']
```

Если любой промис отклонится, `Promise.all` сразу вернёт ошибку. Остальные уже начатые операции при этом не отменяются автоматически.

## `Promise.race`

`Promise.race` возвращает результат первого **завершившегося** промиса — успешного или с ошибкой:

```javascript
const first = await Promise.race([
  requestFromServerA(),
  requestFromServerB(),
]);
```

Частое применение — таймаут:

```javascript
function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Превышено время ожидания')), ms);
  });
}

const response = await Promise.race([
  fetch('/api/data'),
  timeout(3_000),
]);
```

!!! warning "Таймаут не отменяет `fetch`"
    `Promise.race` только перестаёт ждать проигравшие промисы. Сетевой запрос продолжится; чтобы отменить его, нужен `AbortController`.

## `Promise.allSettled`

Подходит, когда надо дождаться всех операций и показать частичный результат:

```javascript
const results = await Promise.allSettled([
  uploadAvatar(),
  saveProfile(),
]);

for (const result of results) {
  if (result.status === 'fulfilled') {
    console.log('Успех:', result.value);
  } else {
    console.error('Ошибка:', result.reason);
  }
}
```

Объекты результатов имеют одну из форм:

```javascript
{ status: 'fulfilled', value: 'данные' }
{ status: 'rejected', reason: new Error('ошибка') }
```

## `Promise.any`

`Promise.any` ждёт первый **успешный** ответ. Ошибки отдельных источников игнорируются, пока остаётся шанс на успех:

```javascript
const config = await Promise.any([
  loadFromPrimaryServer(),
  loadFromMirror(),
]);
```

Это отличается от `race`: для `race` первая ошибка завершает гонку, а `any` продолжает ждать другие промисы.

## Как выбрать метод

| Сценарий | Метод |
|---|---|
| Загрузить профиль и настройки одновременно; нужны оба | `Promise.all` |
| Ограничить ожидание ответа по времени | `Promise.race` |
| Загрузить несколько виджетов и показать, какие не удались | `Promise.allSettled` |
| Получить первый успешный ответ от зеркал | `Promise.any` |

## Шпаргалка для собеседования

> `Promise.all` ждёт все успешные результаты и падает при первой ошибке. `race` возвращает первый завершившийся исход. `allSettled` ждёт всё и сообщает статус каждого. `any` ищет первый успешный результат.
