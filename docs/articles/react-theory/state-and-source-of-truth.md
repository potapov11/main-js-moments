# State и source of truth в React

На Senior-уровне вопрос обычно не «как вызвать `useState`», а **где вообще должны жить данные**. Ошибочный выбор слоя состояния быстро приводит к дублированию, рассинхронизации и лишней сложности.

## Базовая классификация

Полезно разделять состояние минимум на четыре типа:

| Тип | Примеры | Где обычно хранить |
|---|---|---|
| Local UI state | открыт modal, выбран tab | `useState` / `useReducer` рядом с владельцем |
| URL state | фильтры, сортировка, page, search query | query params / router |
| Server state | users, products, orders | query/cache layer: RTK Query, TanStack Query и т.п. |
| Global client state | auth/session flags, theme, сложный cross-feature state | Redux/Zustand/Context — только если действительно глобально |

Главная мысль: **не всё состояние приложения должно жить в одном store**.

## 1. Один источник истины

Если одни и те же данные хранятся в двух местах, появляется задача постоянной синхронизации.

Плохо:

```jsx
const [filteredUsers, setFilteredUsers] = useState([]);

useEffect(() => {
  setFilteredUsers(users.filter(...));
}, [users, filter]);
```

Если `filteredUsers` полностью вычисляется из `users` и `filter`, это derived data, а не самостоятельный state.

Лучше:

```jsx
const filteredUsers = users.filter(...);
```

`useMemo` нужен только если вычисление действительно дорогое и это подтверждено измерением.

## 2. URL как state

Фильтры каталога, сортировка и pagination часто полезнее в URL:

```text
/products?category=phones&sort=price&page=2
```

Плюсы:

- refresh не теряет состояние;
- ссылкой можно поделиться;
- back/forward работают ожидаемо;
- меньше скрытого состояния внутри приложения.

Если фильтр важен для адресуемости страницы, URL часто является лучшим source of truth.

## 3. Server state — не обычный Redux state

Данные API имеют особые свойства:

- могут устаревать;
- требуют loading/error states;
- кэшируются;
- могут инвалидироваться;
- зависят от параметров запроса;
- могут обновляться независимо от клиента.

Поэтому ручное хранение каждой server entity через `useEffect + dispatch + loading + error` часто хуже специализированного query/cache слоя.

Пример мышления с RTK Query:

```js
const { data, isLoading, error } = useGetUsersQuery({ page, filter });
```

Query layer отвечает за transport/cache lifecycle, а компонент — за отображение.

## 4. Когда нужен global client store

Global state оправдан, когда данные:

- нужны далёким веткам дерева;
- имеют независимый жизненный цикл;
- изменяются из разных features;
- не являются просто server cache или URL state.

Примеры: theme, часть auth/session state, сложная корзина, глобальные пользовательские настройки.

Но «нужен в двух компонентах» ещё не означает «нужен Redux». Иногда достаточно поднять state к ближайшему общему владельцу.

## 5. Derived state

Частая ошибка — сохранять то, что можно вычислить.

```js
const [firstName, setFirstName] = useState('Ann');
const [lastName, setLastName] = useState('Lee');
const [fullName, setFullName] = useState('Ann Lee');
```

`fullName` легко рассинхронизировать.

Лучше:

```js
const fullName = `${firstName} ${lastName}`;
```

State нужен для **минимального набора изменяемых источников**, остальное лучше выводить из них.

## 6. State ownership

Хороший вопрос при проектировании:

> Кто является владельцем этого состояния и кто имеет право его менять?

Если ответ «все компоненты понемногу», архитектура почти наверняка станет хрупкой.

Для каждого состояния желательно понимать:

- owner;
- readers;
- writers;
- lifetime;
- persistence requirements;
- нужно ли отражать его в URL;
- приходит ли оно с сервера.

## Формулировка для собеседования

> Я сначала классифицирую state. UI state держу локально, адресуемые фильтры и pagination — в URL, server state — в query/cache layer, а глобальный client store использую только для действительно cross-feature состояния. Стараюсь не дублировать derived data и сохранять один source of truth.

## Типичные ошибки

| Ошибка | Лучше |
|---|---|
| Всё положить в Redux | Разделить local / URL / server / global client state |
| Копировать API data в local state без причины | Читать данные из query cache |
| Хранить derived value в state | Вычислять из источников |
| Дублировать фильтры и в URL, и в store | Выбрать основной source of truth |
| Поднимать state максимально высоко | Поднимать только до реального владельца |
