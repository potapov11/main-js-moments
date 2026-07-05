# Префиксные суммы (Prefix Sum)

!!! info "Зачем эта тема"
    **Префиксная сумма** превращает многократный запрос «сумма на отрезке [l, r]» из **O(n)** в **O(1)** после предобработки. На собеседовании это один из самых «дешёвых» паттернов для запоминания.

!!! tip "Задачи roadmap (5)"
    - [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/description/) (easy)
    - [Find the Highest Altitude](https://leetcode.com/problems/find-the-highest-altitude) (easy)
    - [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/description/) (easy)
    - [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/description/) (medium)
    - [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/description/) (medium)

---

## Идея в двух словах

Пусть `nums = [1, 2, 3, 4, 5]`.

**Префиксная сумма** `prefix[i]` — сумма элементов **от начала до i включительно**:

```
nums:   1   2   3   4   5
prefix: 1   3   6  10  15
         ↑   ↑   ↑   ↑   ↑
        i=0 i=1 i=2 i=3 i=4
```

**Сумма на отрезке [l, r]:**

```
sum(l, r) = prefix[r] - prefix[l - 1]
```

Если `l === 0`, то `sum(0, r) = prefix[r]`.

**Пример:** сумма [1, 3] (индексы 1 и 2) = `prefix[2] - prefix[0]` = 6 − 1 = **5** (это 2 + 3).

---

## Синтаксис JavaScript: массивы и накопление

```javascript
// Сумма массива
const total = nums.reduce((sum, x) => sum + x, 0);

// Построить prefix с «нулём» в начале
const prefix = [0];
for (const x of nums) {
  prefix.push(prefix.at(-1) + x);  // prefix.at(-1) — последний элемент
}
// prefix[i] = sum(nums[0..i-1])

// Без .at(-1) (старый стиль)
prefix.push(prefix[prefix.length - 1] + x);

// Заполнить массив
const dp = Array(n + 1).fill(0);
const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

// 2D: число строк и столбцов
const m = matrix.length;
const n = matrix[0].length;
```

---

## Паттерн 1: Предобработка + много запросов (Range Sum Query)

Когда **много раз** спрашивают сумму на отрезке, а массив **не меняется**:

```javascript
class NumArray {
  constructor(nums) {
    this.prefix = [0];
    for (const x of nums) {
      this.prefix.push(this.prefix.at(-1) + x);
    }
    // prefix[i] = сумма nums[0..i-1], prefix[0] = 0 — удобно для формулы
  }

  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}
```

| Этап | Сложность |
|------|-----------|
| Построение prefix | O(n) |
| Один запрос sumRange | O(1) |
| Память | O(n) |

!!! note "prefix[0] = 0"
    Часто добавляют «нулевой» элемент в начало — тогда формула `prefix[r+1] - prefix[l]` работает и при `l = 0` без отдельной ветки.

---

## Паттерн 2: Один проход — «текущая префиксная сумма»

Не всегда нужен массив `prefix[]`. Достаточно переменной `cur`, которая накапливает сумму по ходу обхода.

**Find the Highest Altitude:** массив `gain[i]` — изменение высоты на i-м участке. Высота после i-го участка = сумма `gain[0..i]`.

```javascript
function largestAltitude(gain) {
  let cur = 0;
  let max = 0;
  for (const g of gain) {
    cur += g;       // префиксная сумма на текущем шаге
    max = Math.max(max, cur);
  }
  return max;
}
```

**Find Pivot Index:** индекс, где сумма слева = сумме справа.

```javascript
function pivotIndex(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const rightSum = total - leftSum - nums[i];
    if (leftSum === rightSum) return i;
    leftSum += nums[i];
  }
  return -1;
}
```

**Признак:** «баланс слева и справа», «максимум накопленного», «высота / профит по шагам».

---

## Паттерн 3: Префиксная сумма + Map (Subarray Sum Equals K)

**Задача:** сколько **непрерывных** подмассивов имеют сумму `k`?

**Ключевая идея:** если префиксная сумма до индекса `r` равна `S`, а нам нужна сумма подмассива `k`, то ищем, сколько раз **раньше** уже была префиксная сумма `S - k`.

```
...  [ l ... r ]  ...
     ↑         ↑
  prefix=l-1  prefix=r
  sum(l..r) = prefix[r] - prefix[l-1] = k
  => prefix[l-1] = prefix[r] - k
```

```javascript
function subarraySum(nums, k) {
  const count = new Map(); // prefixSum → сколько раз встречалась
  count.set(0, 1);         // пустой префикс (до начала массива)

  let prefix = 0;
  let ans = 0;

  for (const x of nums) {
    prefix += x;
    ans += count.get(prefix - k) ?? 0;
    count.set(prefix, (count.get(prefix) ?? 0) + 1);
  }
  return ans;
}
```

| | |
|---|---|
| Время | O(n) |
| Память | O(n) |

**Когда применять:** «количество подмассивов с суммой k», «есть ли подмассив с суммой 0» (k = 0).

---

## Паттерн 4: Двумерная префиксная сумма (2D Prefix Sum)

Матрица `m × n`. `prefix[i][j]` — сумма подматрицы от `(0,0)` до `(i-1, j-1)` (снова удобно иметь «нулевую» строку/столбец).

**Построение:**

```javascript
function build2DPrefix(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const p = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      p[i][j] = matrix[i - 1][j - 1]
        + p[i - 1][j]
        + p[i][j - 1]
        - p[i - 1][j - 1];
    }
  }
  return p;
}
```

**Сумма прямоугольника** `(r1,c1)` — `(r2,c2)` (включительно, 0-indexed в matrix):

```
sum = p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]
```

```
+-------+-------+
| A     | B     |   sum = D - B - C + A
+-------+-------+
| C     | D     |
+-------+-------+
```

| Этап | Сложность |
|------|-----------|
| Построение | O(m · n) |
| Запрос суммы прямоугольника | O(1) |

---

## Когда какой паттерн выбирать

| Условие | Паттерн |
|---------|---------|
| Много запросов суммы на отрезке, массив статичен | 1D prefix + O(1) запрос |
| Много запросов суммы в прямоугольнике | 2D prefix |
| Один проход, «накопленное значение» | переменная `cur` |
| Подмассивы с заданной суммой, могут быть отрицательные числа | prefix + Map |
| Только неотрицательные, нужна **минимальная длина** подмассива с sum ≥ k | [скользящее окно](sliding-window.md), не prefix |

!!! warning "Prefix vs Sliding Window"
    **Subarray Sum Equals K** с **отрицательными** числами — только prefix + Map. Скользящее окно работает, когда сумма **монотонно** растёт/падает при сдвига границ (обычно неотрицательный массив).

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| `prefix[r] - prefix[l]` без учёта «-1» | Уточни формулу: inclusive [l,r] → `prefix[r+1]-prefix[l]` или `prefix[r]-prefix[l-1]` |
| Забыть `count.set(0, 1)` в Subarray Sum | Без этого теряются подмассивы, начинающиеся с индекса 0 |
| Путать «подмассив» и «подпоследовательность» | Prefix sum — только для **непрерывных** отрезков |
| 2D: перепутать порядок вычитания | Рисуй прямоугольник A-B-C-D |

---

## Что сказать на собеседовании

> «Предобработаю префиксные суммы за O(n), тогда каждый запрос суммы на отрезке — O(1). Для подмассивов с суммой k буду хранить в Map, сколько раз встречалась каждая префиксная сумма, и на каждом шаге искать complement prefix − k.»

---

## Связанные материалы

- [Хеш-таблицы](hash-tables.md) — Map в Subarray Sum Equals K
- [Матрицы](matrices.md) — 2D prefix sum
- [Подсчёт сложности](complexity.md)
