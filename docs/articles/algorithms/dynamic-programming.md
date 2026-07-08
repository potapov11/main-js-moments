# Динамическое программирование (Dynamic Programming)

!!! info "Зачем эта тема"
    **DP** — когда задача разбивается на **перекрывающиеся подзадачи** и оптимальный ответ строится из ответов меньших. На собеседовании важно: определить **state**, **переход** и **базу**.

!!! tip "Задачи roadmap (4)"
    - [Climbing Stairs](https://leetcode.com/problems/climbing-stairs) (easy)
    - [Jump Game](https://leetcode.com/problems/jump-game) (medium)
    - [House Robber](https://leetcode.com/problems/house-robber) (medium)
    - [Coin Change](https://leetcode.com/problems/coin-change) (medium)

---

## Синтаксис JavaScript: массив DP и memo

```javascript
// Bottom-up: таблица
const dp = Array(n + 1).fill(0);
dp[0] = 1;                          // база
const INF = Infinity;
const dp2 = Array(amount + 1).fill(INF);
dp2[0] = 0;

// Top-down: memo на объекте или Map
const memo = {};
function f(i) {
  if (i in memo) return memo[i];
  if (i <= 1) return i;
  memo[i] = f(i - 1) + f(i - 2);
  return memo[i];
}

// Сжатие до двух переменных (Fibonacci / House Robber)
let prev2 = 0, prev1 = 0;
for (const x of nums) {
  const cur = Math.max(prev1, prev2 + x);
  prev2 = prev1;
  prev1 = cur;
}

// Math для min/max
Math.min(...arr);
Math.max(...arr);
```

---

Задача **вероятно DP**, если:

1. Есть **оптимум** (min / max / count ways)
2. Можно описать решение через **меньшие** экземпляры той же задачи
3. Подзадачи **повторяются** (иначе хватит обычной рекурсии / greedy)

| DP | Greedy |
|----|--------|
| Нужно сравнивать **несколько** вариантов | Локально лучший выбор = глобально |
| «Сколько способов» | «Достаточно ли одного прохода» |
| Пример: Coin Change, House Robber | Пример: intervals greedy by end |

---

## Два подхода

| | Top-down (memo) | Bottom-up (tabulation) |
|---|-----------------|------------------------|
| Идея | рекурсия + кеш | таблица от базы к ответу |
| Память | O(state) стек + memo | O(state) таблица |
| Плюс | пишется быстрее | часто быстрее, без стека |

---

## Шаблон 1D DP

```javascript
function dp1d(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = /* база */;

  for (let i = 1; i <= n; i++) {
    dp[i] = /* f(dp[i-1], dp[i-2], ...) */;
  }
  return dp[n];
}
```

**Memo top-down:**

```javascript
function solve(n, memo = {}) {
  if (n in memo) return memo[n];
  if (/* база */) return /* ... */;
  memo[n] = /* рекурсия */;
  return memo[n];
}
```

---

## Паттерн 1: Climbing Stairs — Fibonacci

На каждом шаге +1 или +2 ступеньки. Сколько способов до n?

```
dp[i] = dp[i-1] + dp[i-2]
dp[0] = 1, dp[1] = 1
```

```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```

| | |
|---|---|
| State | `dp[i]` — способов до ступени i |
| Переход | с i-1 и с i-2 |
| Время | O(n), память O(1) |

**Признак:** «сколько способов», «шаг 1 или 2».

---

## Паттерн 2: Jump Game — reachability / greedy

Можно ли дойти до последнего индекса? `nums[i]` — max jump.

**DP:**

```javascript
function canJump(nums) {
  const n = nums.length;
  const dp = Array(n).fill(false);
  dp[0] = true;

  for (let i = 0; i < n; i++) {
    if (!dp[i]) continue;
    for (let j = 1; j <= nums[i] && i + j < n; j++) {
      dp[i + j] = true;
    }
  }
  return dp[n - 1];
}
```

**Greedy O(n):** `far = max reach`, если `i > far` — false.

```javascript
function canJumpGreedy(nums) {
  let far = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > far) return false;
    far = Math.max(far, i + nums[i]);
  }
  return true;
}
```

**Признак:** «можно ли дойти» — иногда greedy достаточно; на собеседовании назовите оба.

---

## Паттерн 3: House Robber — выбор с ограничением

Нельзя грабить **соседние** дома. Max сумма.

```
dp[i] = max(dp[i-1], dp[i-2] + nums[i])
       ↑ не берём i    ↑ берём i
```

```javascript
function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x);
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}
```

| State | max сумма до дома i (включая решение для i) |
| База | dp[-1]=0, dp[0]=nums[0] |

**Обобщение:** «выбрать подмножество без соседей» — 1D DP.

---

## Паттерн 4: Coin Change — unbounded knapsack

Минимум монет для суммы `amount`. Монеты можно брать **бесконечно**.

```javascript
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (c <= a) {
        dp[a] = Math.min(dp[a], dp[a - c] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
```

| State | min монет для суммы a |
| Переход | dp[a] = min(dp[a-c] + 1) для каждой монеты c |
| Порядок циклов | **сначала a**, потом coins (unbounded) |

**Coin Change 2 (count ways):** `dp[a] += dp[a-c]`, coins loop **внешний** — без дубликатов порядка.

---

## Как вывести DP с нуля (метод на собеседовании)

1. **Определи state:** «dp[i] = что именно?»
2. **База:** мелкие i, пустые случаи
3. **Переход:** откуда пришли в state i
4. **Ответ:** `dp[n]` / max / min по всем
5. **Оптимизация:** нужен ли весь массив или 2–3 переменные

---

## 1D vs 2D (ориентир)

| Тип | State | Примеры |
|-----|-------|---------|
| 1D | индекс i | stairs, robber, jump |
| 1D по сумме | amount | coin change |
| 2D | i, j двух строк/рюкзак | LCS, edit distance (вне roadmap) |

Roadmap ограничен **1D** — этого достаточно для старта.

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| Неверная база dp[0] | Climbing: dp[0]=1; Coin: dp[0]=0 |
| Coin Change: coins внешний loop для min coins | a от 1..amount, потом coins |
| House Robber: брать i и i-1 вместе | max(пропустить i, взять i) |
| Забыть Infinity / -1 | Недостижимая сумма |
| Greedy на Coin Change | Не работает для произвольных номиналов |

---

## Что сказать на собеседовании

> «Определяю dp[i] как минимальное число монет для суммы i. База dp[0]=0. Для каждой суммы перебираю монеты: dp[a] = min(dp[a], dp[a-c]+1). Время O(amount · coins), память O(amount). House Robber — dp[i] = max(не брать, взять), сжимаю до двух переменных.»

---

## Связанные материалы

- [Подсчёт сложности](complexity.md)
- [Поиск с возвратом](backtracking.md) — когда перебор без memo
- [Графы](graphs.md) — shortest path как DP
- [Префиксные суммы](prefix-sum.md) — другой способ «накопления»
