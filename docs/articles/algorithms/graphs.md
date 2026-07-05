# Графы (Graphs)

!!! info "Зачем эта тема"
    **Граф** — вершины + рёбра. На собеседовании medium-задачи сводятся к **DFS/BFS**, **topological sort** или **Union-Find / shortest path**. Сетка `grid` — частный случай графа.

!!! tip "Задачи roadmap (5)"
    - [Number of Islands](https://leetcode.com/problems/number-of-islands) (medium)
    - [The Maze](https://leetcode.com/problems/the-maze) (medium)
    - [Course Schedule](https://leetcode.com/problems/course-schedule) (medium)
    - [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops) (medium)
    - [Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points) (medium)

---

## Синтаксис JavaScript: граф и visited

```javascript
// Список смежности
const graph = Array.from({ length: n }, () => []);

// Set для visited
const visited = new Set();
visited.add(node);
if (visited.has(node)) { /* ... */ }

// Ключ для клетки сетки
const key = `${row},${col}`;
// или visited[row][col] = true

// 4 направления
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
for (const [dr, dc] of dirs) {
  const nr = row + dr, nc = col + dc;
  if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
}

// indegree массив
const indegree = Array(n).fill(0);
indegree[v]++;
```

---

### Список смежности (adjacency list)

```javascript
// n вершин 0..n-1, edges = [[u,v], ...]
function buildGraph(n, edges, directed = false) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    if (!directed) graph[v].push(u);
  }
  return graph;
}
```

### Сетка как граф

Каждая клетка `(r, c)` — вершина, рёбра к соседям ↑↓←→ (или 4/8 направлений).

```javascript
const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
```

| Представление | Память | Когда |
|---------------|--------|-------|
| Adjacency list | O(V + E) | разреженный граф |
| Matrix | O(V²) | плотный или n маленькое |
| Grid | O(rows · cols) | острова, лабиринт |

---

## DFS и BFS — два кита

### DFS (рекурсия или стек)

- **Компоненты связности**, flood fill, «есть ли путь»
- Память **O(h)** глубина стека / **O(V)** visited

```javascript
function dfs(node, graph, visited) {
  visited.add(node);
  for (const nei of graph[node]) {
    if (!visited.has(nei)) dfs(nei, graph, visited);
  }
}
```

### BFS (очередь)

- **Кратчайший путь** в невзвешенном графе (минимум рёбер)
- Память **O(V)**

```javascript
function bfs(start, graph) {
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length) {
    const node = queue.shift();
    for (const nei of graph[node]) {
      if (!visited.has(nei)) {
        visited.add(nei);
        queue.push(nei);
      }
    }
  }
}
```

| Задача | DFS | BFS |
|--------|-----|-----|
| Number of Islands | ✓ flood fill | ✓ |
| The Maze (до стены) | ✓ | ✓ |
| Shortest path unweighted | | ✓ |
| Cycle detection directed | ✓ | |

---

## Паттерн 1: Number of Islands

**Сетка** `'1'` — земля, `'0'` — вода. Считаем связные компоненты `'1'`.

```javascript
function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // visited — мутируем
    for (const [dr, dc] of dirs) dfs(r + dr, c + dc);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}
```

**O(rows · cols)** время и память стека до O(rows · cols).

---

## Паттерн 2: The Maze — DFS/BFS до упора

Шар катится **до стены** (не по одной клетке). Состояние — **остановка** `(r, c)`, не каждая клетка пути.

```javascript
function hasPath(maze, start, dest) {
  const rows = maze.length, cols = maze[0].length;
  const visited = new Set();

  function dfs(r, c) {
    if (r === dest[0] && c === dest[1]) return true;
    visited.add(`${r},${c}`);

    for (const [dr, dc] of dirs) {
      let nr = r, nc = c;
      while (nr + dr >= 0 && nr + dr < rows && nc + dc >= 0 && nc + dc < cols
             && maze[nr + dr][nc + dc] === 0) {
        nr += dr;
        nc += dc;
      }
      const key = `${nr},${nc}`;
      if (!visited.has(key) && dfs(nr, nc)) return true;
    }
    return false;
  }

  return dfs(start[0], start[1]);
}
```

**Признак:** «катится / скользит до препятствия» — шаг = луч, не одна клетка.

---

## Паттерн 3: Course Schedule — топологическая сортировка

**Directed graph:** есть ли **цикл**? Можно ли пройти все курсы?

**Kahn (BFS по indegree):**

```javascript
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const indegree = Array(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    graph[b].push(a); // b → a
    indegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let taken = 0;
  while (queue.length) {
    const cur = queue.shift();
    taken++;
    for (const nei of graph[cur]) {
      if (--indegree[nei] === 0) queue.push(nei);
    }
  }
  return taken === numCourses;
}
```

**Альтернатива:** DFS с тремя цветами (white/gray/black) — gray node = цикл.

| | |
|---|---|
| Время | O(V + E) |
| Память | O(V + E) |

---

## Паттерн 4: Shortest path — Cheapest Flights Within K Stops

**Взвешенный граф**, ограничение на **число рёбер** (остановок).

**Bellman-Ford / BFS по (node, stopsUsed)** или **Dijkstra** с модификацией.

Упрощённый **BFS по уровням** (k+1 слоёв):

```javascript
function findCheapestPrice(n, flights, src, dst, k) {
  let prices = Array(n).fill(Infinity);
  prices[src] = 0;

  for (let i = 0; i <= k; i++) {
    const tmp = [...prices];
    for (const [u, v, w] of flights) {
      if (prices[u] !== Infinity) {
        tmp[v] = Math.min(tmp[v], prices[u] + w);
      }
    }
    prices = tmp;
  }
  return prices[dst] === Infinity ? -1 : prices[dst];
}
```

**Признак:** «не более k пересадок», «within k steps» — ограниченный shortest path.

---

## Паттерн 5: Min Cost to Connect All Points — MST

**Minimum Spanning Tree:** соединить все точки минимальной суммой рёбер.

- **Prim** — расширяем дерево, min-heap рёбер
- **Kruskal** — sort edges by weight + **Union-Find**

Для roadmap достаточно знать: «это MST» → Kruskal/Prim или на n ≤ 1000 — можно рассмотреть полный graph + MST.

**Union-Find (Disjoint Set):**

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }
}
```

---

## Как выбрать алгоритм

| Условие | Алгоритм |
|---------|----------|
| Сетка, связные области | DFS/BFS flood fill |
| Кратчайший путь, веса = 1 | BFS |
| Кратчайший путь, неотрицательные веса | Dijkstra |
| Ограничение на число рёбер | Bellman-Ford / k-iterations |
| Зависимости, порядок, цикл | Topological sort |
| Соединить все вершины min cost | MST (Kruskal + UF) |
| «В одной ли компоненте» | Union-Find |

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| Не помечать visited | Set или mutate grid |
| BFS для weighted shortest path без Dijkstra | BFS только при весе 1 |
| Course Schedule: перепутать направление ребра | Прочитай `[a,b]` = b перед a |
| DFS на grid без границ | Проверка `r, c` в пределах |
| The Maze: visited на каждой клетке луча | visited на **точке остановки** |

---

## Что сказать на собеседовании

> «Представлю граф списком смежности. Для островов — DFS flood fill, O(rows·cols). Для курсов — топосорт через indegree и BFS: если обработали все вершины, цикла нет. Для min cost connect — MST, Kruskal с Union-Find.»

---

## Связанные материалы

- [Стеки и очереди](stacks-queues.md) — BFS
- [Поиск с возвратом](backtracking.md) — DFS по решениям
- [Динамическое программирование](dynamic-programming.md) — shortest path как DP
- [Матрицы](matrices.md) — grid traversal
