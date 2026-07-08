# Стеки и очереди (Stack & Queue)

!!! info "Зачем эта тема"
    **Стек** (LIFO) и **очередь** (FIFO) — простые структуры, но на них построены задачи на **скобки**, **монотонный стек**, **BFS** и эмуляция одной через другую.

!!! tip "Задачи roadmap (9)"
    - [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks?envType=problem-list-v2&envId=stack) (easy)
    - [Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/description/?envType=problem-list-v2&envId=stack) (easy)
    - [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (easy)
    - [Score of Parentheses](https://leetcode.com/problems/score-of-parentheses/description/) (medium)
    - [Minimum Add to Make Parentheses Valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/description/) (medium)
    - [Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/description/) (medium)
    - [Min Stack](https://leetcode.com/problems/min-stack/?envType=problem-list-v2&envId=stack) (medium)
    - [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/description/) (medium)
    - [Decode String](https://leetcode.com/problems/decode-string/?envType=problem-list-v2&envId=stack) (medium)

---

## Синтаксис JavaScript: стек и очередь на массиве

```javascript
// Стек — push/pop с конца, O(1)
const stack = [];
stack.push(1);
stack.push(2);
const top = stack.at(-1);  // или stack[stack.length - 1]
stack.pop();

// Очередь — без медленного shift
const queue = [];
let head = 0;
queue.push(1);
queue.push(2);
const first = queue[head++];
// периодически: if (head > 1000) { queue = queue.slice(head); head = 0; }

// Стек из пар [char, count] — Decode String
stack.push([curString, repeatCount]);
const [prev, k] = stack.pop();

// Проверка перед pop
if (stack.length === 0) { /* пустой стек */ }
const x = stack.pop();   // только если length > 0
```

---

| | Стек | Очередь |
|---|------|---------|
| Принцип | Last In, First Out | First In, First Out |
| Аналогия | стопка тарелок | очередь в магазине |
| JS | `push` / `pop` с конца массива | `push` + `shift` (медленно) или linked list |
| Типичные задачи | скобки, откат, DFS | BFS, sliding window max (deque) |

**Важно:** `array.shift()` в JS — **O(n)**. На LeetCode для очереди часто используют массив + **индекс head** или двусвязный список.

```javascript
class Queue {
  constructor() {
    this.data = [];
    this.head = 0;
  }
  enqueue(x) { this.data.push(x); }
  dequeue() { return this.data[this.head++]; }
  get size() { return this.data.length - this.head; }
}
```

---

## Паттерн 1: Valid Parentheses — стек для пар

**Идея:** открывающую скобку **кладём**, закрывающую — сверяем с вершиной.

```javascript
function isValid(s) {
  const stack = [];
  const pair = { ')': '(', ']': '[', '}': '{' };

  for (const ch of s) {
    if ('([{'.includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== pair[ch]) return false;
    }
  }
  return stack.length === 0;
}
```

**Обобщение:** любая задача «символы с вложенностью / отменой» → стек.

| Задача | Что в стеке |
|--------|-------------|
| Valid Parentheses | ожидаемые открывающие |
| Decode String | строки + счётчики повторений |
| Score of Parentheses | «слои» или баланс + сумма |

---

## Паттерн 2: Min Stack

Нужны `push`, `pop`, `top`, `getMin` за **O(1)**.

**Идея:** второй стек хранит **минимум на текущий момент**.

```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(x) {
    this.stack.push(x);
    const min = this.minStack.length
      ? Math.min(this.minStack.at(-1), x)
      : x;
    this.minStack.push(min);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() { return this.stack.at(-1); }
  getMin() { return this.minStack.at(-1); }
}
```

---

## Паттерн 3: Монотонный стек — Daily Temperatures

**Задача:** для каждого дня — сколько дней ждать **более тёплого** дня.

**Идея:** стек хранит **индексы** дней с **убывающей** температурой. Когда текущий день теплее вершины — нашли ответ для вершины.

```javascript
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const res = Array(n).fill(0);
  const stack = []; // индексы

  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[i] > temperatures[stack.at(-1)]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
```

| | |
|---|---|
| Время | O(n) — каждый индекс push/pop один раз |
| Память | O(n) |

**Когда:** «следующий больший / меньший элемент», «дни до...».

---

## Паттерн 4: Decode String

`k[encoded_string]` → строка, повторённая k раз; вложенность.

**Стек** хранит пары `(repeatCount, builtString)` при входе в `[`:

```javascript
function decodeString(s) {
  let cur = '';
  let num = 0;
  const stack = [];

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + Number(ch);
    } else if (ch === '[') {
      stack.push([cur, num]);
      cur = '';
      num = 0;
    } else if (ch === ']') {
      const [prev, k] = stack.pop();
      cur = prev + cur.repeat(k);
    } else {
      cur += ch;
    }
  }
  return cur;
}
```

---

## Паттерн 5: Score / Add / Remove Parentheses

Общая схема:

1. **Balance** — пройти слева направо, считать баланс `(` минус `)`
2. **Стек** — для score: `(` добавляет потенциал, `)` при балансе > 0 добавляет 2^(глубина)
3. **Greedy + stack** — для minimum remove: удалить лишние `)` при отрицательном балансе, потом лишние `(` с конца

**Minimum Add to Make Valid** — один проход: `balance` уходит в минус → нужна `(`; в конце `balance > 0` → нужны `)`.

---

## Эмуляция: Stack ↔ Queue

**Queue using two stacks:**

- `inStack` — для enqueue
- `outStack` — для dequeue
- При dequeue: если `outStack` пуст — перелить `inStack` в `outStack`

Амортизированно **O(1)** на операцию.

**Stack using two queues:**

- Push в queue2, перелить queue1 в queue2, swap — или один queue с rotate.

На собеседовании достаточно **идеи** и оценки амортизированной сложности.

---

## Когда стек, когда очередь

| Признак | Структура |
|---------|-----------|
| Вложенность, откат, «последний открытый» | Stack |
| Обход по уровням, BFS | Queue |
| Следующий больший элемент справа | Monotonic stack |
| Скобки, выражения | Stack |
| Sliding window maximum | Deque (двусторонняя очередь) |

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| Не проверить пустой стек перед pop | `stack.length === 0` |
| Valid Parentheses: забыть проверить stack пуст в конце | Должен быть пуст |
| Daily Temperatures: хранить значения вместо индексов | Нужны индексы для `i - j` |
| Queue через `shift()` на больших n | Индекс head или linked list |

---

## Что сказать на собеседовании

> «Стек для парных скобок: O(n) время, O(n) память. Для Daily Temperatures — монотонный стек индексов: каждый элемент push и pop не больше одного раза — O(n). Min Stack — параллельный стек минимумов.»

---

## Связанные материалы

- [Деревья](trees.md) — BFS с очередью
- [Графы](graphs.md) — BFS
- [Поиск с возвратом](backtracking.md) — стек вызовов = implicit stack
