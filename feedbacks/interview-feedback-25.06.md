# Interview feedback — 25.06.2026

Сессия: mock Middle Frontend (ретроспективно занесено).

---

## Пройдено уверенно (passed)

### Q-JS-021 | passed
- **Тема:** Event Loop, micro vs macro
- **Сильное:** порядок A,D,G,C,E,B,F верный
- **Пробел:** —
- **Coverage:** passed

### Q-CSS-001 | passed
- **Тема:** специфичность, !important
- **Сильное:** green с !important; red без
- **Пробел:** —
- **Coverage:** passed

### Q-REACT-028 | passed
- **Тема:** useEffect deps, fetch, race condition
- **Сильное:** isCanceled, async/await, [userId]
- **Пробел:** stale user при смене userId (мелочь)
- **Coverage:** passed

### Q-REACT-060 | passed
- **Тема:** батчинг, functional setState
- **Сильное:** setCount(prev=>prev+1)×3
- **Пробел:** батчинг не назвал явно
- **Coverage:** passed

### Q-JS-018 | passed
- **Тема:** иммутабельность массива/объекта
- **Сильное:** spread, map, key=todo.id
- **Пробел:** —
- **Coverage:** passed

### Q-ALGO-LC-004 | passed
- **Тема:** Two Sum, hash map
- **Сильное:** Map O(n), diff=target-arr[i]
- **Пробел:** early return (мелочь)
- **Coverage:** passed

---

## Слабые ответы / не закрыто — повторить с полными формулировками

### Q-REACT-058 | weak

**Вопрос (как на собесе):**

Пользователь жалуется: при каждом вводе символа в поле поиска **тормозит весь список** (500+ элементов).

```jsx
function App() {
  const [query, setQuery] = useState('');
  const [items] = useState(() => generateHugeList(500));

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (id) => {
    console.log('selected', id);
  };

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <List items={filtered} onSelect={handleSelect} />
    </div>
  );
}

const List = ({ items, onSelect }) => (
  <ul>
    {items.map((item) => (
      <ListItem key={item.id} item={item} onSelect={onSelect} />
    ))}
  </ul>
);

const ListItem = ({ item, onSelect }) => (
  <li onClick={() => onSelect(item.id)}>{item.name}</li>
);
```

1. Почему при каждом нажатии клавиши перерисовываются все 500 элементов?
2. Назовите 2–3 конкретных способа это исправить.

- **Сильное:** memo, useCallback, направление верное
- **Пробел:** `useMemo(items.filter(...))` — неверный синтаксис; нет debounce; нет виртуализации
- **Эталон кратко:** `useMemo(() => filter, [items, query])`, `useCallback`, `React.memo(ListItem)`, debounce query, `react-window`
- **Coverage:** weak → Q-REACT-034, Q-REACT-061

---

### Q-JS-011 | weak

**Вопрос (как на собесе):**

Что выведется в консоль? Объясните кратко.

```javascript
const obj = {
  name: 'App',
  getName() {
    return this.name;
  },
  getNameLater() {
    setTimeout(function () {
      console.log(this.name);
    }, 0);
  },
  getNameLaterFixed() {
    setTimeout(() => {
      console.log(this.name);
    }, 0);
  },
};

obj.getName();
obj.getNameLater();
obj.getNameLaterFixed();
```

- **Сильное:** потеря `this` в callback `function`
- **Пробел:** перепутал `obj.getName()` с таймером; не назвал итог в консоли (`undefined`/`""` и `App`)
- **Эталон:** `getName()` — return `'App'`, в консоль ничего; таймеры: `undefined`/`""` и `App`
- **Coverage:** weak → Q-JS-012

---

### Q-JS-005 | weak

**Вопрос (как на собесе):**

Что выведет каждый `console.log`? Кратко — почему.

```javascript
console.log([] == false);
console.log([] == ![]);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log(typeof null);
```

- **Сильное:** null/undefined, NaN===NaN, typeof null
- **Пробел:** `[] == ![]` не закрыт; `Object.is(NaN, NaN)` — не знал
- **Эталон:** true, true, true, false, false, true, `"object"`
- **Coverage:** weak → Q-JS-006

---

### Q-HTTP-047 | weak

**Вопрос (как на собесе):**

1. Пользователь вводит URL и нажимает Enter. Опишите цепочку от адресной строки до первого пикселя — 5–7 шагов.
2. Чем GET отличается от POST? Когда выбрать каждый?
3. Что такое CORS в двух предложениях — зачем и что при блокировке?

- **Сильное:** DNS; GET — чтение, POST — изменение
- **Пробел:** нет TCP/TLS, HTTP, parse, layout/paint; CORS сформулирован неточно
- **Эталон CORS:** Same-Origin Policy; JS не читает ответ с другого origin без `Access-Control-Allow-Origin`
- **Coverage:** weak → Q-HTTP-008, Q-SEC-028

---

### Q-REACT-079 | weak

**Вопрос (как на собесе):**

```typescript
function AdminPanel({ user, onDelete }: AdminPanelProps) {
  if (user.role !== 'admin') {
    return <p>Access denied</p>;
  }
  return (
    <button onClick={() => onDelete(user.id)}>
      Delete all users
    </button>
  );
}
```

1. Где логическая уязвимость с точки зрения безопасности?
2. Где должна быть настоящая проверка прав `admin`?
3. Что даст `as User` или `user!.role`?

- **Сильное:** интуиция «проверка не только в компоненте»
- **Пробел:** не сказал «фронт — UX, бэкенд — security»; не раскрыл `as`/`!`
- **Эталон:** UI не защищает API; проверка на каждом endpoint на сервере
- **Coverage:** weak → Q-SEC-018

---

### Q-PRACT-002 | passed (закрыто 03.07.2026)

**Задача (не закрыта):**

Напишите custom hook `useDebounce(value, delay)`:
1. Возвращает отложенное значение после паузы `delay` без изменений `value`.
2. Cleanup при размонтировании / смене `delay`.
3. Пример: поле поиска + фильтрация списка по debounced значению.

- **Сильное:** базовый `debounce(fn, delay)` решал в `tasks/repeat_task_1_test.js`
- **Пробел:** — (закрыто 03.07, см. `interview-feedback-03.07.md`)
- **Coverage:** passed

---

## Итог сессии
- **Блок:** 10 / 10 (+ algo: да; practical: отложено)
- **Уровень:** Junior+ / пограничный Middle
- **Закрыто passed:** Q-JS-021, Q-CSS-001, Q-REACT-028, Q-REACT-060, Q-JS-018, Q-ALGO-LC-004
- **На повтор (с формулировками выше):** Q-REACT-058, Q-JS-011, Q-JS-005, Q-HTTP-047, Q-REACT-079

## Итог дня
- **Уровень:** Junior+ / пограничный Middle
- **Сильные стороны:** Event Loop; CSS specificity; useEffect/fetch; иммутабельность; Two Sum O(n)
- **Темы на повторение:** React perf (useMemo/debounce); `this`; JS coercion; сеть/CORS; frontend security; useDebounce hook
