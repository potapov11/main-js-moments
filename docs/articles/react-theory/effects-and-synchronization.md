# Effects: синхронизация с внешними системами

`useEffect` проще понимать не как «код после рендера», а как механизм **синхронизации React-компонента с внешней системой**.

К внешним системам относятся:

- network side effects;
- DOM API вне обычного React-flow;
- subscriptions;
- timers;
- WebSocket;
- analytics;
- imperative third-party widgets.

## 1. Когда Effect не нужен

Если значение можно вычислить из props/state во время render — Effect обычно не нужен.

Плохо:

```jsx
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

Лучше:

```jsx
const fullName = `${firstName} ${lastName}`;
```

Effect здесь создаёт лишний render и второй source of truth.

## 2. Dependency array — не список «когда я хочу запускать»

Dependencies описывают reactive values, которые Effect использует.

```jsx
useEffect(() => {
  const connection = connect(roomId, token);
  return () => connection.disconnect();
}, [roomId, token]);
```

Если Effect читает `roomId` и `token`, они входят в dependencies. Идея «уберу dependency, чтобы Effect не запускался» часто приводит к stale closure.

## 3. Cleanup — часть одного lifecycle

Удобная модель:

```text
setup(old deps)
→ deps changed
→ cleanup(old deps)
→ setup(new deps)
→ unmount
→ cleanup(last deps)
```

Например:

```jsx
useEffect(() => {
  const onResize = () => console.log(window.innerWidth);
  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
  };
}, []);
```

Для `removeEventListener` важна та же функция-reference, поэтому listener должен быть доступен cleanup.

## 4. Race condition при async-запросах

```jsx
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then((r) => r.json())
    .then(setUser);
}, [userId]);
```

Если `userId` быстро изменится, старый запрос может завершиться позже нового и записать устаревшие данные.

Один из способов — cancellation:

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function load() {
    const response = await fetch(`/api/users/${userId}`, {
      signal: controller.signal,
    });
    const data = await response.json();
    setUser(data);
  }

  load().catch((error) => {
    if (error.name !== 'AbortError') {
      console.error(error);
    }
  });

  return () => controller.abort();
}, [userId]);
```

В production-приложении server state часто лучше доверить query library, которая уже решает caching/dedup/refetch lifecycle.

## 5. Stale closure

```jsx
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);

  return () => clearInterval(id);
}, []);
```

Callback замкнул `count` из render, в котором Effect был создан. Это обычная closure semantics.

Нельзя механически «чинить» такие случаи добавлением/удалением dependencies: сначала нужно понять, должна ли подписка пересоздаваться при изменении значения или callback должен читать актуальное значение другим способом.

## 6. `useEffect` и `useLayoutEffect`

Грубая, но полезная модель:

- `useLayoutEffect` запускается после DOM mutations и до того, как браузер визуально покажет следующий кадр; он может блокировать paint;
- `useEffect` обычно подходит для non-visual side effects и не должен использоваться для синхронного измерения/исправления layout.

Важно: формулировка «`useEffect` всегда строго после paint» слишком сильная. React может запускать Effect до paint для некоторых обновлений, вызванных interaction. Поэтому правильнее строить решение не на точном тайминге, а на назначении API.

## 7. Strict Mode

В development React может выполнить дополнительный setup → cleanup → setup для Effect. Это stress test корректности cleanup, а не production-поведение.

Если Effect ломается от повторного setup, чаще всего проблема в отсутствии симметричного cleanup или в том, что Effect делает то, что должно происходить в event handler.

## 8. Event handler vs Effect

Если действие произошло потому, что пользователь нажал кнопку, часто место ему — в handler.

```jsx
function handleBuy() {
  sendOrder();
}
```

Не стоит создавать state-флаг `shouldSendOrder`, а затем Effect, который отслеживает этот флаг, если бизнес-событие уже известно в handler.

Effect нужен, когда синхронизация является следствием **нахождения компонента в определённом состоянии**, а не конкретного пользовательского события.

## Формулировка для собеседования

> Effect нужен для синхронизации компонента с внешней системой. Dependencies описывают reactive values, используемые Effect, cleanup отменяет предыдущую синхронизацию. Derived data и действия, принадлежащие event handler, я стараюсь не переносить в Effect.

## Типичные ошибки

| Ошибка | Почему плохо |
|---|---|
| Effect для derived state | Лишний render и дублирование source of truth |
| Удалять deps ради «одного запуска» | Stale closure и скрытая зависимость |
| `addEventListener` без cleanup | Утечки и дублирующиеся handlers |
| Async request без race/cancel модели | Старый response может затереть новый |
| Всё после клика переносить в Effect | Теряется причинно-следственная связь с event |
