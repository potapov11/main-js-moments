# Execution context, scope и closures

На уровне Middle+/Senior важно перестать воспринимать closure как отдельный «трюк». Это следствие того, как JavaScript связывает идентификаторы с лексическим окружением.

## 1. Лексическая область видимости

JavaScript использует lexical scope: доступность переменной определяется тем, **где функция объявлена**, а не тем, откуда её вызвали.

```js
const name = 'global';

function outer() {
  const name = 'outer';

  return function inner() {
    console.log(name);
  };
}

const fn = outer();
fn(); // outer
```

`inner` ищет `name` в своём окружении, затем во внешнем окружении `outer`, затем выше по цепочке.

## 2. Execution context и environment

При вызове функции создаётся контекст выполнения. Упрощённо нас интересуют:

- локальные bindings функции;
- ссылка на внешнее lexical environment;
- значение `this` для обычной функции;
- служебная информация о текущем выполнении.

Важно не смешивать **call stack** и **scope chain**:

- call stack отвечает на вопрос «какая функция сейчас выполняется и кто кого вызвал»;
- lexical scope отвечает на вопрос «где искать переменную».

Это разные модели.

## 3. Closure

Closure — функция вместе с доступом к lexical environment, в котором она была создана.

```js
function createCounter() {
  let count = 0;

  return () => {
    count += 1;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

После завершения `createCounter` переменная `count` не обязана исчезнуть, потому что возвращённая функция всё ещё ссылается на это окружение.

Лучше говорить не «функция копирует значение», а «функция сохраняет доступ к binding из внешнего lexical environment».

## 4. Главная ловушка: closure хранит доступ, а не снимок

```js
let value = 1;

const read = () => value;
value = 2;

console.log(read()); // 2
```

Closure не сделал копию `1`. Он читает текущий binding `value`.

Но в React часто возникает обратная проблема: callback был создан в **конкретном render**, поэтому замкнул значения именно того render.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
    }, 1000);

    return () => clearInterval(id);
  }, []);
}
```

Effect создан на первом render и callback замкнул `count === 0`. Пустой dependency array означает, что effect не пересоздаётся при изменении `count`.

Это stale closure — не «странность React», а обычная lexical semantics плюс модель render в React.

## 5. `var` в цикле

```js
for (var i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
// 3, 3, 3
```

`var` создаёт один binding для всего цикла. Когда callbacks выполняются, цикл уже закончился.

С `let` создаётся новый binding на итерацию:

```js
for (let i = 0; i < 3; i += 1) {
  setTimeout(() => console.log(i), 0);
}
// 0, 1, 2
```

## 6. Где closures полезны

Closures лежат в основе:

- factory functions;
- private state без class private fields;
- debounce/throttle;
- memoization;
- event handlers;
- React hooks и callbacks;
- middleware и function composition.

Пример debounce:

```js
function debounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}
```

`timerId` живёт между вызовами возвращённой функции благодаря closure.

## 7. Что важно на собеседовании

Хороший ответ:

> Closure — это функция, которая сохраняет доступ к lexical environment места своего создания. За счёт этого она может использовать внешние bindings даже после завершения внешней функции.

И сразу практический пример: debounce, factory или stale closure в React.

## Типичные ошибки

| Ошибка | Правильная модель |
|---|---|
| «Closure хранит копию значения» | Он сохраняет доступ к binding/environment |
| «Scope зависит от места вызова» | Scope lexical: зависит от места объявления |
| Путать stack и scope chain | Stack — вызовы, scope chain — поиск идентификаторов |
| Считать stale closure React-багом | Это следствие обычного closure + render snapshot |
