# Собеседование — mock Middle Frontend

**Статус:** завершено  
**Дата начала:** 2026-06-25  
**Дата закрытия:** 2026-07-03  
**Блок:** 10 (+ algo + practical)  
**Тема:** Middle Frontend mock (устные + Two Sum + useDebounce)  
**Пауза:** —

---

## План блока (ID)

| # | ID | Тема | Статус |
|---|-----|------|--------|
| 1 | Q-JS-021 | Event Loop | passed |
| 2 | Q-REACT-058 | ререндеры, memo, useMemo | weak |
| 3 | Q-JS-011 | this + setTimeout | weak |
| 4 | Q-CSS-001 | специфичность | passed |
| 5 | Q-REACT-028 | useEffect + fetch | passed |
| 6 | Q-JS-005 | == / === / coercion | weak |
| 7 | Q-HTTP-047 | URL→render, CORS | weak |
| 8 | Q-REACT-060 | setState batching | passed |
| 9 | Q-JS-018 | иммутабельность | passed |
| 10 | Q-REACT-079 | admin / PrivateRoute security | weak |
| + | Q-ALGO-LC-004 | Two Sum | passed |
| + | Q-PRACT-002 | useDebounce hook | passed |

## Текущий вопрос

— (сессия закрыта)

## Ответ кандидата (Q-PRACT-002)

`useDebounce(value, delay)`: `useState` + `useEffect` с `setTimeout` → `setDebouncedVal(value)`, cleanup `clearTimeout`, deps `[value, delay]`. В `App`: `useDebounce(searchTerm, 1000)` + `useEffect` на `debauncedSearch`.

## Прогресс блока

| # | ID | Статус | Заметка |
|---|-----|--------|---------|
| 1–10 | см. план | см. план | устный блок закрыт 2026-06-25 |
| algo | Q-ALGO-LC-004 | passed | Map O(n) |
| practical | Q-PRACT-002 | passed | hook + cleanup; 2026-07-03 |

## Критерий «зачёт» practical

Хук с cleanup; debounced value; пример — ✅

## Заметки интервьюера

Сессия #2 полностью закрыта 2026-07-03.
