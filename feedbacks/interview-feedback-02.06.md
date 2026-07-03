# Interview Feedback — 02.06.2026

## Итог дня

**Уровень:** Junior+ / ближе к Middle на знакомых темах.

**Сильные стороны:**
- Event Loop (sync → microtask → macrotask)
- React: `key`, `useEffect` + cleanup / `AbortController`
- TS: `interface` не в runtime, `never` в `default` для exhaustiveness
- Алгоритм `Group Anagrams` — зачтён после правок

**Повторить в приоритете:**
- Promise API: `all` / `allSettled` / `race` / `any`
- CORS + `credentials: 'include'` (конкретные заголовки)
- Subarray Sum Equals K (prefix sum + Map)
- Complexity с параметром `k` в строковых задачах

---

## Собеседование (сессия дня): теория + практика

### Пройдено / зачтено

| Тема | Итог |
|------|------|
| Event Loop | Порядок `1 4 3 2`; micro vs macro — зачтено |
| React `key={index}` | Reorder ломает state/input — зачтено |
| `useEffect` cleanup | Abort отменяет старый fetch при смене фильтра — зачтено |
| TS `never` в `default` | Compile-time exhaustiveness — зачтено |
| `unknown` vs `any` | Сужение перед использованием — зачтено |
| `useMemo` vs `useCallback` | Кэш значения vs ссылки — зачтено |
| `display: none` vs `visibility: hidden` | Layout / место в потоке — зачтено |
| Valid Parentheses (алго) | Идея stack верна; мелкие баги в коде исправлены |

### Частично / с подсказкой

| Тема | Комментарий |
|------|-------------|
| CORS vs CSP | Пропущено, вернуться позже |
| `Promise.all` vs `allSettled` | База слабая, нужна таблица |
| `requestId` / `latestRef` без abort | Понял после разбора |
| Infinite scroll dedupe | Abort/debounce ок; инвариант `seenIds` — после подсказки |
| CORS credentials | Частично; нужны два заголовка наизусть |

### BigTech Middle mini block (5 + 1 алго)

См. раздел «Сессия 6» ниже.

---

## Сессия 5 — алгоритмы: Subarray Sum Equals K

**Статус:** **не решено** (перенос на повторный разбор)

### Формулировка

Дан массив `nums` и число `k`. Нужно вернуть количество подмассивов, сумма которых равна `k`.

### Что было в решении

- Использовался один временный массив `arr` и проверка суммы через `reduce` внутри цикла.
- После найденного совпадения массив очищался (`arr.length = 0`).

### Почему не засчитано

- Подход считает только один "текущий" фрагмент и не покрывает **все** подмассивы, оканчивающиеся в каждой позиции.
- Очистка `arr` пропускает валидные пересекающиеся варианты.
- Логика нестабильна для кейсов с отрицательными числами и нулями.

### Эталонная идея

- Префиксная сумма + `Map` частот префиксов.
- На каждом шаге добавлять в ответ количество `prefixSum - k`.
- Инициализация: `map.set(0, 1)`.

### Целевая сложность

- `time`: `O(n)`
- `space`: `O(n)`

### Что повторить перед следующим заходом

- Почему two pointers не подходит при наличии отрицательных чисел.
- Как работает связь: `sum(i..j) = prefix[j] - prefix[i-1]`.
- Прогон руками кейса: `[3,4,7,2,-3,1,4,2], k=7` (ожидаемо `4`).

---

## Сессия 6 — BigTech Middle mini block (5 вопросов + 1 алгоритм)

**Итог блока:** уверенный **Junior+ / ближе к Middle** на знакомых темах.

### Что получилось хорошо

- `React key`: верно объяснил, почему `key={index}` ломает identity при сортировке и ведет к "переезду" локального state/input.
- `Event Loop`: корректно объяснил порядок sync -> microtask -> macrotask и приоритет `Promise.then` над `setTimeout(0)`.
- `TypeScript runtime`: точно сказал, почему `interface` нельзя проверять через `instanceof` (типы стираются после компиляции).
- Алгоритм `Group Anagrams`: рабочее решение через `Map` + ключ из сортировки; после правки возврата (`[...map.values()]`) задача зачтена.

### Что повторить в приоритете

1. **Promise combinators (высокий приоритет)**
   - Четко различать `all`, `allSettled`, `race`, `any`.
   - Уметь быстро приводить по одному практическому кейсу на каждый метод.

2. **CORS с credentials**
   - При `credentials: 'include'` нельзя `Access-Control-Allow-Origin: *`.
   - Минимальные заголовки: `Access-Control-Allow-Origin: <exact-origin>` и `Access-Control-Allow-Credentials: true`.

3. **Async гонки в UI (поиск/догрузка)**
   - Кроме `AbortController`, знать паттерн `requestId/latestRef` и уметь объяснить в 2 шагах.
   - Для infinite scroll держать инвариант dedupe по `id` (`seenIds`/`entitiesById`).

4. **Алгоритмы: формулировка сложности**
   - Не говорить обобщенно `O(n)`, если в задаче есть длина строки `k`.
   - Для `Group Anagrams` (через сортировку): `time O(n * k log k)`, `space O(n * k)`.

### Короткий план повторения (1–2 дня)

- День 1: таблица `all/allSettled/race/any` + 4 мини-примера "когда использовать".
- День 2: CORS credentials + 2 сценария async race (`AbortController` и `latestRef/requestId`) + проговор сложности для 3 алгоритмов с параметрами (`n`, `k`).

---

## Алгоритмы за день

| Задача | Статус |
|--------|--------|
| Subarray Sum Equals K | Не решено |
| Group Anagrams | Зачтено |
| Valid Parentheses | Идея верна, код с мелкими багами (исправлено) |
