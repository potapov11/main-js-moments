# Алгоритмы

Теория и паттерны по задачам LeetCode и алгоритмической секции. Соответствует roadmap Balun и разделам в `roadmap.md`.

## Опубликовано

| Тема | Статья |
|------|--------|
| Подсчёт сложности (Big O) | [complexity.md](complexity.md) |
| Два указателя (Two Pointers) | [two-pointers.md](two-pointers.md) |
| Матрицы (2D-массивы) | [matrices.md](matrices.md) |
| Хеш-таблицы (Map / Set) | [hash-tables.md](hash-tables.md) |
| Префиксные суммы | [prefix-sum.md](prefix-sum.md) |
| Битовые манипуляции | [bit-manipulation.md](bit-manipulation.md) |
| Бинарный поиск | [binary-search.md](binary-search.md) |
| Сортировки | [sorting.md](sorting.md) |
| Интервалы | [intervals.md](intervals.md) |
| Связные списки | [linked-lists.md](linked-lists.md) |
| Деревья | [trees.md](trees.md) |
| Стеки и очереди | [stacks-queues.md](stacks-queues.md) |
| Скользящее окно | [sliding-window.md](sliding-window.md) |
| Поиск с возвратом | [backtracking.md](backtracking.md) |
| Графы | [graphs.md](graphs.md) |
| Динамическое программирование | [dynamic-programming.md](dynamic-programming.md) |

## Рекомендуемый порядок для начинающих

1. [Подсчёт сложности](complexity.md)
2. [Хеш-таблицы](hash-tables.md) + [Два указателя](two-pointers.md)
3. [Префиксные суммы](prefix-sum.md) + [Скользящее окно](sliding-window.md)
4. [Бинарный поиск](binary-search.md) + [Сортировки](sorting.md)
5. [Связные списки](linked-lists.md) + [Стеки и очереди](stacks-queues.md)
6. [Деревья](trees.md) + [Интервалы](intervals.md)
7. [Битовые манипуляции](bit-manipulation.md)
8. [Поиск с возвратом](backtracking.md) + [Динамическое программирование](dynamic-programming.md)
9. [Графы](graphs.md) + [Матрицы](matrices.md)

Новые файлы: `docs/articles/algorithms/имя-статьи.md` + пункт в `mkdocs.yml` → **Статьи → Алгоритмы**.

!!! info "Синтаксис JavaScript"
    В каждой статье есть раздел **«Синтаксис JavaScript»** — Map/Set, указатели, биты, DP и т.д. Начни с [хеш-таблиц](hash-tables.md#map-set-syntax), если неуверен в базовых структурах.

---

## Задачи Balun roadmap {#balun-roadmap}

### Два указателя (12)

- [Reverse String](https://leetcode.com/problems/reverse-string/description/?envType=problem-list-v2&envId=two-pointers) (easy) — [теория](two-pointers.md)
- [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/description/?envType=problem-list-v2&envId=two-pointers) (easy)
- [Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array?envType=problem-list-v2&envId=two-pointers) (easy)
- [Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/description/) (easy)
- [Squares of a Sorted Array](https://leetcode.com/problems/squares-of-a-sorted-array/description/?envType=problem-list-v2&envId=two-pointers) (easy)
- [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/?envType=problem-list-v2&envId=two-pointers) (easy)
- [Move Zeroes](https://leetcode.com/problems/move-zeroes/?envType=problem-list-v2&envId=two-pointers) (easy)
- [Two Sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/?envType=problem-list-v2&envId=two-pointers) (medium)
- [3Sum](https://leetcode.com/problems/3sum/description/?envType=problem-list-v2&envId=two-pointers) (medium)
- [String Compression](https://leetcode.com/problems/string-compression/description/?envType=problem-list-v2&envId=two-pointers) (medium)
- [Compare Version Numbers](https://leetcode.com/problems/compare-version-numbers/description/?envType=problem-list-v2&envId=two-pointers) (medium)
- [Container With Most Water](https://leetcode.com/problems/container-with-most-water/description/?envType=problem-list-v2&envId=two-pointers) (medium)

### Матрицы (5)

- [Matrix Diagonal Sum](https://leetcode.com/problems/matrix-diagonal-sum/description/) (easy) — [теория](matrices.md)
- [Transpose Matrix](https://leetcode.com/problems/transpose-matrix/description/?envType=problem-list-v2&envId=matrix) (easy)
- [Valid Sudoku](https://leetcode.com/problems/valid-sudoku/?envType=problem-list-v2&envId=matrix) (medium)
- [Rotate Image](https://leetcode.com/problems/rotate-image/description/?envType=problem-list-v2&envId=matrix) (medium)
- [Spiral Matrix](https://leetcode.com/problems/spiral-matrix/description/?envType=problem-list-v2&envId=matrix) (medium)

### Хеш-таблицы (5)

- [Two Sum](https://leetcode.com/problems/two-sum/?envType=problem-list-v2&envId=hash-table) (easy) — [теория](hash-tables.md)
- [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/description/?envType=problem-list-v2&envId=hash-table) (easy)
- [Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/?envType=problem-list-v2&envId=hash-table) (easy)
- [Valid Anagram](https://leetcode.com/problems/valid-anagram/?envType=problem-list-v2&envId=hash-table) (easy)
- [Group Anagrams](https://leetcode.com/problems/group-anagrams/?envType=problem-list-v2&envId=hash-table) (medium)

### Префиксная сумма (5)

- [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/description/) (easy) — [теория](prefix-sum.md)
- [Find the Highest Altitude](https://leetcode.com/problems/find-the-highest-altitude) (easy)
- [Find Pivot Index](https://leetcode.com/problems/find-pivot-index/description/) (easy)
- [Range Sum Query 2D - Immutable](https://leetcode.com/problems/range-sum-query-2d-immutable/description/) (medium)
- [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/description/) (medium)

### Битовые манипуляции (5)

- [Power of Two](https://leetcode.com/problems/power-of-two/?envType=problem-list-v2&envId=bit-manipulation) (easy) — [теория](bit-manipulation.md)
- [Single Number](https://leetcode.com/problems/single-number/description/?envType=problem-list-v2&envId=bit-manipulation) (easy)
- [Find the Difference](https://leetcode.com/problems/find-the-difference/description/?envType=problem-list-v2&envId=bit-manipulation) (easy)
- [Reverse Bits](https://leetcode.com/problems/reverse-bits/description/?envType=problem-list-v2&envId=bit-manipulation) (easy)
- [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/description/?envType=problem-list-v2&envId=bit-manipulation) (easy)

### Бинарный поиск (10)

- [Binary Search](https://leetcode.com/problems/binary-search/) (easy) — [теория](binary-search.md)
- [Search Insert Position](https://leetcode.com/problems/search-insert-position/description/) (easy)
- [First Bad Version](https://leetcode.com/problems/first-bad-version/description/?envType=problem-list-v2&envId=binary-search) (easy)
- [Sqrt(x)](https://leetcode.com/problems/sqrtx/description/) (easy)
- [Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/description/) (easy)
- [Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/) (medium)
- [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/?envType=problem-list-v2&envId=binary-search) (medium)
- [Find Peak Element](https://leetcode.com/problems/find-peak-element/description/?envType=problem-list-v2&envId=binary-search) (medium)
- [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/) (medium)
- [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/?envType=problem-list-v2&envId=binary-search) (medium)

### Сортировки (12)

- [Sort Array By Parity](https://leetcode.com/problems/sort-array-by-parity/description/?envType=problem-list-v2&envId=two-pointers) (easy) — [теория](sorting.md)
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

### Интервалы (3)

- [Merge Intervals](https://leetcode.com/problems/merge-intervals/description/) (medium) — [теория](intervals.md)
- [Insert Interval](https://leetcode.com/problems/insert-interval/description/) (medium)
- [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/description/) (medium)

### Связные списки (8)

- [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list?envType=problem-list-v2&envId=linked-list) (easy) — [теория](linked-lists.md)
- [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle?envType=problem-list-v2&envId=linked-list) (easy)
- [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/?envType=problem-list-v2&envId=linked-list) (easy)
- [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/?envType=problem-list-v2&envId=linked-list) (easy)
- [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list?envType=problem-list-v2&envId=linked-list) (easy)
- [Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/description/?envType=problem-list-v2&envId=linked-list) (easy)
- [Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list?envType=problem-list-v2&envId=linked-list) (medium)
- [Sort List](https://leetcode.com/problems/sort-list/description/?envType=problem-list-v2&envId=linked-list) (medium)

### Деревья (10)

- [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/) (easy) — [теория](trees.md)
- [Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/description/) (easy)
- [Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/description/) (medium)
- [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/description/) (medium)
- [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) (easy)
- [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (easy)
- [Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/description/) (easy)
- [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) (easy)
- [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) (medium)
- [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/?envType=problem-list-v2&envId=binary-tree) (medium)

### Стеки и очереди (9)

- [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks?envType=problem-list-v2&envId=stack) (easy) — [теория](stacks-queues.md)
- [Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/description/?envType=problem-list-v2&envId=stack) (easy)
- [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) (easy)
- [Score of Parentheses](https://leetcode.com/problems/score-of-parentheses/description/) (medium)
- [Minimum Add to Make Parentheses Valid](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/description/) (medium)
- [Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/description/) (medium)
- [Min Stack](https://leetcode.com/problems/min-stack/?envType=problem-list-v2&envId=stack) (medium)
- [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/description/) (medium)
- [Decode String](https://leetcode.com/problems/decode-string/?envType=problem-list-v2&envId=stack) (medium)

### Скользящее окно (5)

- [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/?envType=problem-list-v2&envId=hash-table) (medium) — [теория](sliding-window.md)
- [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/?envType=problem-list-v2&envId=sliding-window) (medium)
- [Longest Harmonious Subsequence](https://leetcode.com/problems/longest-harmonious-subsequence/description/?envType=problem-list-v2&envId=sliding-window) (medium)
- [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement/description/?envType=problem-list-v2&envId=sliding-window) (medium)
- [Fruit Into Baskets](https://leetcode.com/problems/fruit-into-baskets/description/?envType=problem-list-v2&envId=sliding-window) (medium)

### Поиск с возвратом (3)

- [Generate Parentheses](https://leetcode.com/problems/generate-parentheses) (medium) — [теория](backtracking.md)
- [Permutations](https://leetcode.com/problems/permutations) (medium)
- [Combinations](https://leetcode.com/problems/combinations) (medium)

### Графы (5)

- [Number of Islands](https://leetcode.com/problems/number-of-islands) (medium) — [теория](graphs.md)
- [The Maze](https://leetcode.com/problems/the-maze) (medium)
- [Course Schedule](https://leetcode.com/problems/course-schedule) (medium)
- [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops) (medium)
- [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points) (medium)

### Динамическое программирование (4)

- [Climbing Stairs](https://leetcode.com/problems/climbing-stairs) (easy) — [теория](dynamic-programming.md)
- [Jump Game](https://leetcode.com/problems/jump-game) (medium)
- [House Robber](https://leetcode.com/problems/house-robber) (medium)
- [Coin Change](https://leetcode.com/problems/coin-change) (medium)
