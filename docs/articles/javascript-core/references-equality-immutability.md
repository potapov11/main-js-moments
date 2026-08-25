# Примитивы, ссылки, equality и mutation

Для React/Redux это не абстрактная тема: большая часть ошибок с «почему не обновилось» или «почему memo не сработал» упирается в ссылочную семантику.

## 1. Примитивы и объекты

Примитивные значения (`string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`) сравниваются по значению.

```js
'abc' === 'abc'; // true
10 === 10;       // true
```

Объекты, массивы и функции — по identity ссылки.

```js
{} === {}; // false
[] === []; // false

const a = {};
const b = a;
a === b; // true
```

Два объекта могут содержать одинаковые данные, но быть разными объектами.

## 2. Присваивание объекта не копирует объект

```js
const user = { profile: { name: 'Ann' } };
const copy = user;

copy.profile.name = 'Bob';
console.log(user.profile.name); // Bob
```

`copy` и `user` указывают на один объект.

## 3. Shallow copy

Spread создаёт новый объект только на верхнем уровне.

```js
const user = {
  name: 'Ann',
  settings: { theme: 'dark' },
};

const copy = { ...user };

copy !== user; // true
copy.settings === user.settings; // true
```

Вложенный `settings` всё ещё общий.

Если меняется вложенная структура, копировать нужно путь до изменяемого узла:

```js
const nextUser = {
  ...user,
  settings: {
    ...user.settings,
    theme: 'light',
  },
};
```

## 4. Почему mutation опасна в React

```js
const [user, setUser] = useState({ name: 'Ann' });

user.name = 'Bob';
setUser(user);
```

Ссылка осталась той же. React использует identity значения при решении, есть ли изменение state; кроме того, mutation разрушает идею render snapshot и делает поведение кода менее предсказуемым.

Правильно:

```js
setUser((prev) => ({
  ...prev,
  name: 'Bob',
}));
```

## 5. Referential equality и memoization

```jsx
function Parent() {
  const config = { pageSize: 20 };
  return <List config={config} />;
}
```

Каждый render создаёт новый объект. Даже если содержимое одинаковое:

```js
prevConfig === nextConfig; // false
```

Поэтому `React.memo` увидит изменившийся prop по ссылке.

Но вывод не должен быть «всё оборачивать в useMemo». Сначала нужно понять, действительно ли render дорогой и нужна ли стабильная identity.

## 6. `Object.is` и `===`

В большинстве бытовых случаев поведение похоже, но есть исключения:

```js
Object.is(NaN, NaN); // true
NaN === NaN;         // false

Object.is(0, -0); // false
0 === -0;         // true
```

React использует `Object.is` в ряде сравнений state/dependencies, поэтому полезно знать термин, но для реальной frontend-практики куда важнее reference identity объектов и функций.

## 7. Deep clone — не универсальное решение

Не нужно делать глубокую копию всего state при каждом обновлении. Это:

- дороже;
- уничтожает стабильные ссылки даже там, где данные не изменились;
- ухудшает memoization;
- скрывает неправильную модель данных.

Нужен **structural sharing**: новые ссылки только по пути реально изменившихся данных, остальные ветки переиспользуются.

Именно этот подход лежит в основе immutable updates и хорошо сочетается с Redux/Immer.

## Что важно на собеседовании

Хорошая связка ответа:

> Примитивы сравниваются по значению, объекты — по identity ссылки. Spread делает shallow copy. В React это важно, потому что state и memoization опираются на identity; при immutable update мы создаём новые ссылки только для изменившихся веток.

## Типичные ошибки

| Ошибка | Правильная модель |
|---|---|
| `const b = a` создаёт копию объекта | Копируется ссылка |
| `{...obj}` — deep clone | Это shallow copy |
| «Одинаковое содержимое значит `===`» | Объекты сравниваются по identity |
| Deep clone всего state безопаснее | Он дорог и ломает structural sharing |
| Любой новый объект — проблема | Проблема только когда стабильность identity реально нужна |
