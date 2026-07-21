# Теория по браузеру

Материалы для фронтенд-собеседования: как работает браузер, сеть, безопасность, DOM.

Асинхронность JS (Event Loop, Promise, async/await) вынесена в отдельный раздел: **[Асинхронное программирование](../async/index.md)**. В статье про клик Event Loop упоминается точечно.

## Опубликовано

| Тема                                        | Статья                                           |
| ------------------------------------------- | ------------------------------------------------ |
| Клик → навигация → отрисовка новой страницы | [click-to-navigation.md](click-to-navigation.md) |

## Планируется

- Event Loop (углублённо: call stack, microtasks, macrotasks)
- CORS и `credentials: 'include'`
- Кэширование и заголовки HTTP
- DOM и рендеринг (краткий обзор)
- Web Storage, cookies, SameSite

## См. также

- [Асинхронный JavaScript](../async-javascript/index.md): Promise, `async` / `await`, `Promise.all`, `Promise.race`, `Promise.allSettled` и практические паттерны.

Новые файлы: `docs/articles/browser/имя-статьи.md` + пункт в `mkdocs.yml` → **Статьи → Браузер**.
