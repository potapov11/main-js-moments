# Деревья (Trees)

!!! info "Зачем эта тема"
    **Деревья** — базовая иерархическая структура. На собеседовании проверяют обходы (DFS/BFS), свойства BST и умение рекурсивно описать задачу на поддеревьях.

!!! tip "Задачи roadmap (10)"
    - [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/) (easy)
    - [Search in a Binary Search Tree](https://leetcode.com/problems/search-in-a-binary-search-tree/description/) (easy)
    - [Insert into a Binary Search Tree](https://leetcode.com/problems/insert-into-a-binary-search-tree/description/) (medium)
    - [Delete Node in a BST](https://leetcode.com/problems/delete-node-in-a-bst/description/) (medium)
    - [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) (easy)
    - [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/) (easy)
    - [Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst/description/) (easy)
    - [Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) (easy)
    - [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) (medium)
    - [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/?envType=problem-list-v2&envId=binary-tree) (medium)

---

## Синтаксис JavaScript: TreeNode и обходы

```javascript
// LeetCode даёт готовый класс
function TreeNode(val, left, right) {
  this.val = val ?? 0;
  this.left = left ?? null;
  this.right = right ?? null;
}

// Проверка на null — всегда первой строкой в рекурсии
if (!root) return 0;

// BFS — очередь на массиве
const queue = [root];
while (queue.length) {
  const node = queue.shift();  // на LeetCode n умеренное — ok
  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
}

// DFS рекурсивно — стек вызовов неявный
function dfs(node) {
  if (!node) return;
  dfs(node.left);
  dfs(node.right);
}

// Optional chaining (осторожно на собеседовании — лучше явный if)
root?.left?.val;
```

---

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

| Термин | Значение |
|--------|----------|
| Корень (root) | верхний узел |
| Лист | узел без детей |
| Глубина узла | число рёбер от корня |
| Высота дерева | максимальная глубина |
| Поддерево | узел + все его потомки |

**BST (Binary Search Tree):** для каждого узла все в **левом** поддереве **меньше**, в **правом** — **больше** (строго или нестрого — смотри условие).

---

## Три обхода DFS — запомни порядок

Для узла `N`: **L** — left, **N** — node, **R** — right.

| Обход | Порядок | Зачем |
|-------|---------|-------|
| Preorder | N → L → R | копия дерева, prefix |
| **Inorder** | L → N → R | **BST → отсортированный порядок** |
| Postorder | L → R → N | удаление, сумма снизу вверх |

```javascript
function inorder(root, out = []) {
  if (!root) return out;
  inorder(root.left, out);
  out.push(root.val);
  inorder(root.right, out);
  return out;
}
```

**Итеративный inorder** (стек):

```javascript
function inorderIter(root) {
  const stack = [];
  const res = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    res.push(cur.val);
    cur = cur.right;
  }
  return res;
}
```

---

## BFS — обход по уровням (Level Order)

```javascript
function levelOrder(root) {
  if (!root) return [];
  const res = [];
  const queue = [root];

  while (queue.length) {
    const level = [];
    const size = queue.length; // фиксируем размер уровня
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
```

| | DFS | BFS |
|---|-----|-----|
| Структура | стек / рекурсия | очередь |
| Память | O(h) высота | O(w) ширина уровня |
| Задачи | глубина, пути, BST | уровни, кратчайший путь в дереве |

---

## Паттерн 1: Рекурсия «на поддерево»

Большинство задач на **глубину, диаметр, симметрию**:

```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

**Шаблон:**

1. База: `if (!root) return …`
2. Рекурсия на `left` и `right`
3. Комбинируем результаты

**Diameter of Binary Tree** — для каждого узла длина пути через него = `leftDepth + rightDepth`; глобальный максимум.

**Symmetric Tree** — два зеркальных обхода:

```javascript
function isMirror(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.val === b.val
    && isMirror(a.left, b.right)
    && isMirror(a.right, b.left);
}
```

---

## Паттерн 2: BST — используй свойство порядка

### Search in BST

```javascript
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val
    ? searchBST(root.left, val)
    : searchBST(root.right, val);
}
```

O(h), h = высота; в сбалансированном O(log n).

### Insert into BST

Идём как при поиске, вставляем в **лист** на пустое место.

### Delete Node in BST

Три случая:

1. **Лист** — просто удалить
2. **Один ребёнок** — поднять ребёнка
3. **Два ребёнка** — заменить на **inorder successor** (минимум в правом поддереве) или predecessor

### Validate BST

**Ошибка новичка:** проверять только `left.val < root.val < right.val`.

**Правильно:** каждый узел должен быть в **глобальном диапазоне** (min, max), унаследованном от предков.

```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val)
      && isValidBST(root.right, root.val, max);
}
```

### Range Sum of BST

DFS/BFS, суммируем только узлы в `[low, high]`, в BST можно **отсекать** ветки:

```javascript
function rangeSumBST(root, low, high) {
  if (!root) return 0;
  if (root.val < low) return rangeSumBST(root.right, low, high);
  if (root.val > high) return rangeSumBST(root.left, low, high);
  return root.val
    + rangeSumBST(root.left, low, high)
    + rangeSumBST(root.right, low, high);
}
```

### Diameter of Binary Tree — глобальный max через рекурсию

```javascript
function diameterOfBinaryTree(root) {
  let max = 0;
  function depth(node) {
    if (!node) return 0;
    const L = depth(node.left);
    const R = depth(node.right);
    max = Math.max(max, L + R);  // путь через node
    return 1 + Math.max(L, R);
  }
  depth(root);
  return max;
}
```

### Delete Node in BST — три случая (кратко)

1. **Лист** — `return null`
2. **Один ребёнок** — `return root.left ?? root.right`
3. **Два ребёнка** — найти **successor** (min в правом поддереве), скопировать значение, удалить successor

---

## Когда DFS, когда BFS

| Задача | Подход |
|--------|--------|
| Max Depth, Diameter | DFS |
| Level Order | BFS |
| Validate BST, Range Sum | DFS с границами |
| Kth smallest in BST | inorder (DFS) |
| Минимальная глубина (если спрашивают) | BFS — первый лист |

---

## Сложность

| Операция | Среднее (balanced) | Худшее (линейное дерево) |
|----------|-------------------|--------------------------|
| Search/Insert/Delete BST | O(log n) | O(n) |
| Обход всего дерева | O(n) | O(n) |
| Память DFS | O(h) | O(n) |
| Память BFS | O(w) | O(n) |

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| Validate BST только локально | Диапазон (min, max) от корня |
| Level order без `size = queue.length` | Смешиваются уровни |
| Забыть `if (!root)` | Null reference |
| Inorder successor при delete | Идти вправо, потом всегда влево до конца |
| Путать глубину и число узлов | Max Depth считает **рёбра/уровни** — уточни в задаче (+1 за узел vs за ребро) |

---

## Что сказать на собеседовании

> «Рекурсивно: результат для дерева = f(левое поддерево, правое поддерево). Для BST использую свойство порядка — отсекаю половину при поиске. Validate BST — передаю допустимый диапазон (min, max) вниз по рекурсии.»

---

## Связанные материалы

- [Связные списки](linked-lists.md) — fast/slow как в деревьях
- [Стеки и очереди](stacks-queues.md) — итеративный обход
- [Поиск с возвратом](backtracking.md) — обход с выбором
- [Подсчёт сложности](complexity.md)
