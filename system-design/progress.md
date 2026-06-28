# System Design Progress

Источник задач: `system-design/tasks.md`. Содержательные правила интервью: `.cursor/cursorrules/system-design-interview.mdc`.

Статусы: `new`, `in-progress`, `weak`, `repeat`, `passed`.

| ID | Задача | Уровень | Статус | Последний прогон | Слабое место | Следующий фокус |
|----|--------|---------|--------|------------------|--------------|-----------------|
| SD-01 | SaaS landing | 1 | new | — | — | сбор требований, SEO, LCP |
| SD-02 | Todo app | 1 | new | — | — | CRUD, local/server state, optimistic UI |
| SD-03 | User profile | 1 | new | — | — | формы, валидация, upload, API |
| SD-04 | Autocomplete marketplace search | 2 | new | — | — | debounce, cache, cancel, API |
| SD-05 | Infinite Pinterest feed | 2 | new | — | — | pagination, skeleton, image lazy load |
| SD-06 | Support real-time chat | 2 | new | — | — | WebSocket vs polling, reconnect, offline |
| SD-07 | E-commerce product page | 3 | new | — | — | SSR/CSR, cache, SEO, modularity |
| SD-08 | Analytics dashboard | 3 | new | — | — | filters, URL state, heavy rerenders |
| SD-09 | Collaborative document editor | 3 | new | — | — | conflicts, presence, large document perf |
| SD-10 | Split frontend monolith | 4 | new | — | — | team boundaries, monorepo vs micro-frontends |
| SD-11 | White-label frontend | 4 | new | — | — | theming, config, i18n, feature flags |

## Правило Обновления

После каждой System Design сессии обновляй строку задачи:

- `Последний прогон` — дата сессии.
- `Статус` — `weak`, `repeat` или `passed`.
- `Слабое место` — самый важный пробел: требования, NFR, high-level, frontend state, API, perf/security.
- `Следующий фокус` — один конкретный навык для следующего повтора.
