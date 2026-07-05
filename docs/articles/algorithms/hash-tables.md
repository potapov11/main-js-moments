# Хеш-таблицы (Map / Set)

!!! info "Зачем эта тема"
    **Map** и **Set** — самый частый способ ускорить задачу с **O(n²)** до **O(n)**. На собеседовании достаточно сказать: «использую хеш-таблицу для поиска за O(1) в среднем» — и это уже плюс.

!!! tip "Задачи roadmap (5)"
    - [Two Sum](https://leetcode.com/problems/two-sum/?envType=problem-list-v2&envId=hash-table) (easy)
    - [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/description/?envType=problem-list-v2&envId=hash-table) (easy)
    - [Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/?envType=problem-list-v2&envId=hash-table) (easy)
    - [Valid Anagram](https://leetcode.com/problems/valid-anagram/?envType=problem-list-v2&envId=hash-table) (easy)
    - [Group Anagrams](https://leetcode.com/problems/group-anagrams/?envType=problem-list-v2&envId=hash-table) (medium)

---

## Что такое хеш-таблица простыми словами

**Хеш-таблица** — структура «ключ → значение», где по ключу можно **быстро** найти, добавить или проверить наличие.

В JavaScript это:

| Структура | Что хранит | Типичное использование |
|-----------|------------|------------------------|
| `Map` | ключ → значение | индекс, счётчик, «видели ли уже» |
| `Set` | только уникальные ключи | «есть ли в множестве» |
| `Object` | строковые ключи → значение | реже на алгосах; `Map` предпочтительнее |

**Средняя сложность:** `get`, `set`, `has`, `delete` — **O(1)**.  
**Память:** **O(n)** — храним до n записей.

!!! note "На собеседовании"
    Говорите «**в среднем** O(1)» — в худшем случае (много коллизий) может быть O(n), но на LeetCode это почти не встречается.

---

## Синтаксис JavaScript: Map и Set {#map-set-syntax}

### Map — словарь «ключ → значение»

```javascript
// Создание
const m = new Map();
const m2 = new Map([['a', 1], ['b', 2]]); // из пар

// Добавить / обновить
m.set('key', 42);
m.set(0, 'индекс');        // ключ — число
m.set({ id: 1 }, 'obj');   // ключ — объект (по ссылке)

// Прочитать
m.get('key');              // 42 или undefined, если нет
m.get('нет');              // undefined — не null!

// Проверить наличие
m.has('key');              // true

// Удалить / очистить
m.delete('key');
m.clear();

// Размер
m.size;                    // не .length !
```

### Set — множество уникальных значений

```javascript
const s = new Set();
const s2 = new Set([1, 2, 2, 3]); // {1, 2, 3}

s.add(10);
s.add(10);                 // дубликат игнорируется
s.has(10);                 // true
s.delete(10);
s.size;
```

### Перебор Map и Set

```javascript
const freq = new Map([['a', 2], ['b', 1]]);

// for...of — самый частый на алгосах
for (const [key, value] of freq) {
  console.log(key, value);
}

for (const key of freq.keys()) { /* ... */ }
for (const val of freq.values()) { /* ... */ }

// Set
for (const x of s) { /* ... */ }

// В массив (если нужен)
[...freq.keys()];
[...freq.entries()];       // [[key, val], ...]
Array.from(s);
```

### Частые приёмы на LeetCode

```javascript
// 1. Счётчик частот (самое частое)
const freq = new Map();
for (const x of arr) {
  freq.set(x, (freq.get(x) ?? 0) + 1);
}
// или короче:
for (const x of arr) freq.set(x, (freq.get(x) || 0) + 1);

// 2. Set из массива — уникальные элементы
const unique = new Set(nums);
const hasDup = unique.size !== nums.length;

// 3. Map: ключ → массив (Group Anagrams)
const groups = new Map();
const key = 'abc';
if (!groups.has(key)) groups.set(key, []);
groups.get(key).push(word);

// 4. Map через reduce (реже, но знай)
const idx = nums.reduce((map, val, i) => map.set(val, i), new Map());

// 5. Массив вместо Map для букв a-z (быстрее)
const count = new Array(26).fill(0);
count[s.charCodeAt(0) - 'a'.charCodeAt(0)]++;
```

### Map vs Object vs массив

| | `Map` | `Object` | `Array` как частоты |
|---|-------|----------|---------------------|
| Ключи | любые | строки / Symbol | индексы 0…n |
| `.size` | да | `Object.keys().length` | `.length` |
| Порядок | порядок вставки | частично | по индексу |
| На алгосах | **основной выбор** | редко | для букв/цифр 0…k |

```javascript
// Object — если привычнее (на LeetCode чаще Map)
const obj = {};
obj['a'] = (obj['a'] ?? 0) + 1;
'a' in obj;                // has
delete obj['a'];
```

!!! tip "undefined vs null"
    `map.get(key)` вернёт `undefined`, если ключа нет. Для счётчика используй `(map.get(key) ?? 0) + 1`, а не `map.get(key) + 1` — иначе `NaN`.

---

| Признак в условии | Что делать |
|-------------------|------------|
| «Найди пару / complement / второй элемент» | Map: ключ — элемент, значение — индекс |
| «Проверь, встречалось ли уже» | Set или Map |
| «Посчитай частоту символов / букв» | Map: символ → количество |
| «Сравни два набора / анаграммы» | Map частот или сортировка + сравнение |
| «Сгруппируй по признаку» | Map: признак → массив элементов |
| Наивный перебор всех пар O(n²) | Попробуй один проход + Map |

---

## Паттерн 1: Complement (дополнение) — Two Sum

**Идея:** идём по массиву один раз. Для каждого `x` ищем в Map, есть ли уже `target - x`.

```javascript
function twoSum(nums, target) {
  const seen = new Map(); // значение → индекс

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) {
      return [seen.get(need), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
```

**Почему O(n):** один проход, каждая операция с Map — O(1) в среднем.

**Когда применять:** «найди два числа с суммой target», «есть ли пара с разностью k».

---

## Паттерн 2: Частотный счётчик (Frequency Map)

**Идея:** один проход — считаем, сколько раз встретился каждый символ/число.

```javascript
function buildFreq(s) {
  const freq = new Map();
  for (const ch of s) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  return freq;
}
```

**Применение:**

- **Valid Anagram** — частоты двух строк одинаковы
- **Group Anagrams** — ключ группы = отсортированная строка или строка из 26 счётчиков
- **Isomorphic Strings** — сопоставление символов s → t через Map (и проверка конфликтов)

**Group Anagrams — ключ группы:**

```javascript
function groupKey(str) {
  const count = new Array(26).fill(0);
  for (const ch of str) {
    count[ch.charCodeAt(0) - 97]++;
  }
  return count.join('#'); // или sort(str).join('')
}
```

---

## Паттерн 3: Кодирование / декодирование (Roman to Integer)

**Идея:** заранее положить в Map все соответствия (`I → 1`, `IV → 4`, …), потом один проход по строке.

```javascript
const roman = new Map([
  ['I', 1], ['V', 5], ['X', 10], ['L', 50],
  ['C', 100], ['D', 500], ['M', 1000],
]);

function romanToInt(s) {
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = roman.get(s[i]);
    const next = roman.get(s[i + 1]);
    // если текущий меньше следующего — вычитаем (IV, IX, …)
    sum += cur < next ? -cur : cur;
  }
  return sum;
}
```

**Обобщение:** Map как **словарь правил** — когда нужно быстро переводить символ/код в число или категорию.

---

## Паттерн 4: Изоморфизм / биекция

**Isomorphic Strings:** символам строки `s` должны однозначно соответствовать символы `t` (и наоборот).

```javascript
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const a = s[i], b = t[i];
    if (sToT.has(a) && sToT.get(a) !== b) return false;
    if (tToS.has(b) && tToS.get(b) !== a) return false;
    sToT.set(a, b);
    tToS.set(b, a);
  }
  return true;
}
```

**Правило:** если нужна **взаимно однозначная** связь — часто **два Map** (или один Map + Set использованных значений).

---

## Паттерн 5: Valid Anagram — сравнение частот

Две строки — анаграммы ⟺ одинаковые частоты букв.

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  for (const ch of t) {
    if (!freq.has(ch)) return false;
    freq.set(ch, freq.get(ch) - 1);
    if (freq.get(ch) === 0) freq.delete(ch);
  }
  return freq.size === 0;
}
```

**Альтернатива:** массив из 26 счётчиков — быстрее для lowercase a-z.

---

## Когда в задаче нужен Map или Set

| Задача | Выбор |
|--------|-------|
| Нужен только факт «был ли элемент» | `Set` |
| Нужен индекс / счётчик / группа | `Map` |
| Ключи — числа 0…n | массив часто быстрее `Map` |
| Нужен порядок вставки | `Map` сохраняет порядок в JS |

---

## Сложность — шпаргалка

| Паттерн | Время | Память |
|---------|-------|--------|
| Один проход + Map/Set | O(n) | O(n) |
| Два прохода (сначала freq, потом проверка) | O(n) | O(n) |
| Group by key | O(n · k), k — длина строки на ключ | O(n) |
| Наивный перебор пар без Map | O(n²) | O(1) |

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| `nums.includes(x)` внутри цикла | O(n²). Замени на `Set.has(x)` |
| Забыть проверить конфликт в isomorphic | Нужны два направления s→t и t→s |
| Ключ Group Anagrams — только sort | Для длинных строк лучше массив из 26 счётчиков |
| Путать `Map` и `Object` | Для произвольных ключей — `Map`; `Object` не гарантирует порядок так же предсказуемо для числовых ключей |
| Добавлять в Map до проверки complement | В Two Sum сначала `has(need)`, потом `set` |

---

## Что сказать на собеседовании

> «Вместо перебора всех пар за O(n²) пройду массив один раз и буду хранить уже виденные элементы в Map. Поиск complement — O(1) в среднем. Итого O(n) по времени и O(n) по памяти.»

---

## Связанные материалы

- [Подсчёт сложности](complexity.md) — почему Map в цикле даёт O(n), а не O(n²)
- [Скользящее окно](sliding-window.md) — часто Map хранит частоты **внутри окна**
- [Префиксные суммы](prefix-sum.md) — Subarray Sum Equals K комбинирует prefix + Map
