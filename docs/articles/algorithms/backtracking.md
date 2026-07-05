# Поиск с возвратом (Backtracking)

!!! info "Зачем эта тема"
    **Backtracking** — систематический перебор всех **вариантов** (комбинации, перестановки, расстановки скобок) с **откатом**, когда ветка не может дать ответ. На medium это стандарт; важно уметь нарисовать дерево решений.

!!! tip "Задачи roadmap (3)"
    - [Generate Parentheses](https://leetcode.com/problems/generate-parentheses) (medium)
    - [Permutations](https://leetcode.com/problems/permutations) (medium)
    - [Combinations](https://leetcode.com/problems/combinations) (medium)

---

## Синтаксис JavaScript: path и откат

```javascript
const res = [];
const path = [];

function backtrack(/* args */) {
  if (/* готово */) {
    res.push([...path]);   // копия! не push(path)
    return;
  }
  for (const choice of choices) {
    path.push(choice);     // выбор
    backtrack(/* ... */);
    path.pop();            // откат — обязательно
  }
}

// used для permutations
const used = Array(n).fill(false);
used[i] = true;
// ...
used[i] = false;

// Генерация 1..n
for (let i = start; i <= n; i++) { /* combinations */ }
```

---

1. **Выбираем** следующий шаг (положить `(`, взять элемент, …)
2. **Рекурсивно** идём дальше
3. Если дошли до **валидного полного** решения — сохраняем
4. **Откатываем** последний выбор (undo) и пробуем другой

Это DFS по **дереву решений**, где мы **обрезаем** бесполезные ветки (pruning), если можем.

```
                    ""
                   /  \
                 "("   ... (если можно)
                /   \
             "(("  "()"
              ...
```

---

## Универсальный шаблон

```javascript
function backtrack(state, choices, result) {
  if (isComplete(state)) {
    result.push(copy(state));
    return;
  }

  for (const choice of choices) {
    if (!isValid(choice, state)) continue; // pruning

    apply(state, choice);      // сделать выбор
    backtrack(state, choices, result);
    undo(state, choice);       // откат
  }
}
```

| Часть | Роль |
|-------|------|
| `state` | текущее частичное решение (массив, строка, счётчики) |
| `choices` | что можно выбрать на этом шаге |
| `apply` / `undo` | изменить state и вернуть назад |
| `isValid` | можно ли этот choice (осталось `)`, лимит k, …) |

**Сложность:** часто **экспоненциальная** O(2ⁿ), O(n!) — перебираем все ответы. На собеседовании назовите порядок и память **O(глубина рекурсии)**.

---

## Паттерн 1: Combinations — выбрать k из n

**Combinations(n, k):** порядок не важен, `[1,2]` = `[2,1]` — не дублируем.

**Трюк:** следующий элемент только **с большим индексом** → `start` в цикле.

```javascript
function combine(n, k) {
  const res = [];
  const path = [];

  function dfs(start) {
    if (path.length === k) {
      res.push([...path]);
      return;
    }
    for (let i = start; i <= n; i++) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(1);
  return res;
}
```

| | |
|---|---|
| Время | O(C(n,k) · k) |
| Память | O(k) стек + результат |

**Признак:** «комбинации», «подмножества фиксированного размера», «выбрать k элементов».

---

## Паттерн 2: Permutations — все перестановки

**Permutations:** порядок важен, используем **все** элементы ровно один раз.

**State:** `used[]` или swap-метод на массиве.

```javascript
function permute(nums) {
  const res = [];
  const path = [];
  const used = Array(nums.length).fill(false);

  function dfs() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }

  dfs();
  return res;
}
```

**Признак:** «все перестановки», «arrange», «ordering».

---

## Паттерн 3: Generate Parentheses — ограничения на state

**n пар скобок.** На каждом шаге можно добавить `(` если `open < n`, и `)` если `close < open`.

```javascript
function generateParenthesis(n) {
  const res = [];

  function dfs(open, close, s) {
    if (s.length === 2 * n) {
      res.push(s);
      return;
    }
    if (open < n) dfs(open + 1, close, s + '(');
    if (close < open) dfs(open, close + 1, s + ')');
  }

  dfs(0, 0, '');
  return res;
}
```

**Pruning встроен в условия** — не генерируем невалидные префиксы (никогда `close > open`).

| Шаг | Combinations | Permutations | Parentheses |
|-----|--------------|--------------|-------------|
| Выбор | следующий индекс > start | любой не used | `(` или `)` |
| Глубина | k | n | 2n |
| Дубликаты | избегаем через start | — | — |

---

## Подмножества (Subsets) — бонус к Combinations

Все 2ⁿ подмножеств — тот же dfs с `start`, но **без** фиксированного k: сохраняем `path` на **каждом** уровне.

```javascript
function subsets(nums) {
  const res = [];
  const path = [];

  function dfs(start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  }

  dfs(0);
  return res;
}
```

---

## Backtracking vs DFS на графе

| | Backtracking | DFS на графе/дере |
|---|--------------|-------------------|
| Цель | все **конфигурации** | обход, путь, компоненты |
| Откат | обязателен (undo) | иногда только visited |
| Примеры | permutations, N-Queens | [Number of Islands](graphs.md) |

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| Забыть `path.pop()` / undo | Без отката state «загрязняется» |
| Копировать `path` в результат | `res.push([...path])`, не `path` по ссылке |
| Combinations без `start` | Дубликаты [1,2] и [2,1] |
| Не оценить сложность | Честно: O(2ⁿ) или O(n!) |
| Путать subsets и combinations | k фиксирован vs все размеры |

---

## Что сказать на собеседовании

> «Построю дерево решений DFS. На каждом уровне перебираю допустимые выборы, после рекурсии откатываю state. Для combinations использую start, чтобы не дублировать. Сложность пропорциональна числу валидных ответов.»

---

## Связанные материалы

- [Деревья](trees.md) — DFS-рекурсия
- [Графы](graphs.md) — DFS с visited
- [Динамическое программирование](dynamic-programming.md) — когда перебор можно заменить таблицей
