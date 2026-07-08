# Сортировки (Sorting)

!!! info "Зачем эта тема"
    На frontend-собеседовании редко просят **написать quicksort с нуля**, но часто — **выбрать алгоритм**, назвать **сложность**, решить задачу через **sort + greedy** или **два указателя** (Sort Colors). Плюс Sort Array — классическая задача на реализацию.

!!! tip "Задачи roadmap (12)"
    - [Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity/description/?envType=problem-list-v2&envId=two-pointers) (easy)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — пузырьковая (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — вставками (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — выбором (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — подсчётом (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — блочная (medium)
    - [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements) (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — слиянием (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — быстрая (medium)
    - [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/description/?envType=problem-list-v2&envId=quickselect) (medium)
    - [Sort an Array](https://leetcode.com/problems/sort-an-array/description/) — поразрядная (medium)
    - [Sort Colors](https://leetcode.com/problems/sort-colors/description/) (medium)

---

## Синтаксис JavaScript: сортировка массивов

```javascript
// Встроенная сортировка — мутирует исходный массив!
const sorted = [...nums].sort((a, b) => a - b);  // числа по возрастанию
const desc = [...nums].sort((a, b) => b - a);     // по убыванию

// Строки — без comparator сортирует лексикографически как строки!
['10', '2'].sort();           // ['10', '2'] — неправильно для чисел
['10', '2'].sort((a,b) => a - b); // ['2', '10']

// Сортировка пар / интервалов
intervals.sort((a, b) => a[0] - b[0]);  // по start
entries.sort((a, b) => b[1] - a[1]);   // по freq убыванию

// swap
[arr[i], arr[j]] = [arr[j], arr[i]];

// Поиск k-го с конца после sort
nums.sort((a, b) => a - b);
const kthLargest = nums[nums.length - k];
```

!!! warning "sort без comparator"
    `[3, 10, 2].sort()` → `[10, 2, 3]` (строки!). Всегда `(a, b) => a - b` для чисел.

---

| Алгоритм | Время (среднее) | Время (худшее) | Память | Стабильный* |
|----------|-----------------|----------------|--------|-------------|
| Bubble Sort | O(n²) | O(n²) | O(1) | Да |
| Selection Sort | O(n²) | O(n²) | O(1) | Нет |
| Insertion Sort | O(n²) | O(n²) | O(1) | Да |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Да |
| Quick Sort | O(n log n) | O(n²) | O(log n) стек | Нет |
| Heap Sort | O(n log n) | O(n log n) | O(1) | Нет |
| Counting Sort | O(n + k) | O(n + k) | O(k) | Да |
| Radix Sort | O(d · (n + k)) | O(d · (n + k)) | O(n + k) | Да |
| Bucket Sort | O(n) в среднем | O(n²) | O(n) | Да |

*Стабильный — равные элементы сохраняют относительный порядок.

**В JavaScript:** `[...arr].sort((a, b) => a - b)` — **O(n log n)**, реализация движком (обычно Timsort-подобная).

---

## Когда какую сортировку вспомнить

| Ситуация | Алгоритм |
|----------|----------|
| Учебная задача «напиши сортировку» | merge / quick / heap |
| Маленький массив, почти отсортирован | insertion |
| Ограниченный диапазон ключей (0…100) | counting |
| Нужна стабильность + O(n log n) | merge |
| In-place, среднее O(n log n) | quick / heap |
| На LeetCode «просто отсортируй» | `.sort()` |

---

## Паттерн 1: Sort + scan (жадный после сортировки)

Отсортировали → один проход с правилами.

**Top K Frequent Elements:**

1. Посчитать частоты (Map)
2. Отсортировать пары `[freq, num]` по freq **или** использовать bucket sort / heap

```javascript
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const x of nums) freq.set(x, (freq.get(x) ?? 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}
```

**Kth Largest Element:** Quickselect O(n) в среднем или min-heap размера k → O(n log k).

---

## Паттерн 2: Два указателя вместо sort (Sort Array By Parity)

Чётные в начало — **не обязательно** полная сортировка:

```javascript
function sortByParity(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    if (nums[left] % 2 === 0) left++;
    else if (nums[nums.length - 1] % 2 === 1) right--;
    else {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++; right--;
    }
  }
  return nums;
}
```

См. [Два указателя](two-pointers.md).

---

## Паттерн 3: Dutch National Flag — Sort Colors

Массив из **0, 1, 2** — три-way partition за **O(n)**, **O(1)** память.

```javascript
function sortColors(nums) {
  let low = 0, mid = 0, high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++; mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}
```

**Инвариант:**

- `[0..low-1]` — нули
- `[low..mid-1]` — единицы
- `[high+1..end]` — двойки
- `[mid..high]` — неизвестно

**Когда:** k категорий (мало значений), in-place, линейное время.

---

## Кратко: как работают «учебные» сортировки

### Bubble Sort

Соседние пары: если не по порядку — swap. Большие «всплывают» в конец.

```javascript
for (let i = 0; i < n; i++)
  for (let j = 0; j < n - 1 - i; j++)
    if (nums[j] > nums[j + 1]) swap(j, j + 1);
```

### Selection Sort

На каждом шаге найти **минимум** в хвосте и поставить на текущую позицию.

### Insertion Sort

Как сортировка карт в руке: вставляем `nums[i]` в уже отсортированный префикс.

### Merge Sort

Делим пополам → сортируем половины → **merge** двух отсортированных массивов.

```javascript
function merge(a, b) {
  const res = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    res.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return res.concat(a.slice(i), b.slice(j));
}
```

### Quick Sort

Выбрали **pivot**, partition: меньше слева, больше справа, рекурсия на части.

**Quickselect** — та же partition, но рекурсия только в часть, где лежит k-й элемент.

### Counting Sort

Массив `count[value]`, накапливаем частоты, восстанавливаем порядок. Работает, когда значения в **ограниченном диапазоне**.

### Radix Sort

Сортировка по разрядам (LSD): стабильная сортировка цифр от младшей к старшей.

---

## Heap (куча) — для Top K

**Min-heap размера k** хранит k самых больших: если новый элемент больше минимума в куче — вытесняем минимум.

| Подход | Время |
|--------|-------|
| Sort всего массива | O(n log n) |
| Quickselect k-й | O(n) среднее |
| Min-heap k элементов | O(n log k) |

На LeetCode без своей кучи можно эмулировать через массив + sort части или `PriorityQueue` если доступен.

---

## Сравнение: когда sort «в лоб» достаточно

| Задача | Подход |
|--------|--------|
| Top K Frequent | Map + sort entries или bucket |
| Kth Largest | quickselect или heap |
| Sort Colors | Dutch flag, не `.sort()` |
| Sort Array By Parity | two pointers |
| Merge intervals | sort by start + scan |

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| `arr.sort()` для чисел | `(a,b) => a - b`, иначе лексикографическая сортировка строк |
| O(n²) sort на n = 10⁵ | TLE — нужен O(n log n) или линейный паттерн |
| Забыть стабильность | Merge / counting — стабильные; quick — нет |
| Sort Colors: swap с high без проверки mid | После swap с high **не** увеличивать mid — новый элемент не проверен |

---

## Что сказать на собеседовании

> «Отсортирую за O(n log n), затем один проход O(n). Для массива из трёх значений применю Dutch National Flag — O(n) время, O(1) память. Для k-й по величине — quickselect O(n) в среднем или min-heap размера k.»

---

## Связанные материалы

- [Два указателя](two-pointers.md) — parity, merge sorted
- [Бинарный поиск](binary-search.md) — после сортировки
- [Хеш-таблицы](hash-tables.md) — частоты перед sort
- [Интервалы](intervals.md) — sort by start
