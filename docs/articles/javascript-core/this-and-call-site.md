# `this`: значение определяется способом вызова

Одна из самых частых ошибок — пытаться определить `this` по месту, где функция написана. Для обычной функции главное — **как она вызвана**.

## Базовая модель

```js
function show() {
  console.log(this);
}
```

Значение `this` формируется в момент вызова. Поэтому одна и та же функция может получить разный `this`.

## 1. Method call

```js
const user = {
  name: 'Sergey',
  showName() {
    console.log(this.name);
  },
};

user.showName(); // Sergey
```

Call-site — `user.showName()`, поэтому `this === user`.

## 2. Потеря контекста

```js
const fn = user.showName;
fn();
```

Теперь вызов идёт как обычный `fn()`. Объекта слева от точки нет, поэтому `this` больше не связан с `user`.

Это особенно часто встречается при передаче метода как callback.

```js
button.addEventListener('click', user.showName);
```

Здесь контекст зависит уже от механизма вызова listener, а не от объекта `user`.

## 3. `call`, `apply`, `bind`

```js
function greet(prefix) {
  console.log(prefix, this.name);
}

const user = { name: 'Sergey' };

greet.call(user, 'Hi');
greet.apply(user, ['Hi']);

const bound = greet.bind(user, 'Hi');
bound();
```

- `call` — вызвать сразу с перечисленными аргументами;
- `apply` — вызвать сразу с массивом аргументов;
- `bind` — вернуть новую функцию с закреплённым `this`.

## 4. Constructor call

```js
function User(name) {
  this.name = name;
}

const user = new User('Sergey');
```

При вызове через `new` создаётся новый объект, и `this` указывает на него.

## 5. Arrow function

У стрелочной функции **нет собственного `this`**. Она берёт `this` из внешнего lexical environment.

```js
const user = {
  name: 'Sergey',
  delayed() {
    setTimeout(() => {
      console.log(this.name);
    }, 0);
  },
};
```

Стрелка удобна здесь именно потому, что не создаёт новый `this`.

Но стрелка как метод объекта часто даёт неожиданный результат:

```js
const user = {
  name: 'Sergey',
  show: () => {
    console.log(this.name);
  },
};
```

`this` не будет автоматически равен `user`.

## 6. React-контекст

В function components тема `this` почти исчезла из повседневного кода, но остаётся важной для:

- понимания старых class components;
- чтения библиотечного JS;
- callback-паттернов;
- вопросов на собеседовании;
- `bind/call/apply` и prototype methods.

## Быстрый алгоритм определения `this`

Для обычной функции смотри на call-site:

1. `new fn()` → новый объект;
2. `fn.call(obj)` / `apply` / bound function → явно заданный объект;
3. `obj.fn()` → объект слева от точки;
4. `fn()` → default binding, зависит от strict mode/environment.

Для arrow function этот алгоритм не применяется: она наследует внешний `this`.

## Типичные ошибки

| Ошибка | Правильная модель |
|---|---|
| «`this` — объект, где функция объявлена» | Для обычной функции важен call-site |
| «Arrow удобнее всегда» | Arrow не имеет собственного `this` и не подходит для всех методов |
| «`bind` вызывает функцию» | `bind` создаёт новую связанную функцию |
| Передать метод как callback и ждать старый `this` | Контекст может потеряться |
