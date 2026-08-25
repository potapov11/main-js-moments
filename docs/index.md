# Frontend Engineering Notes

Это не курс «с нуля» и не набор всех возможных конспектов. Репозиторий — личная база повторения для **Middle+/Senior Frontend**: алгоритмы, JavaScript runtime, браузер, React и практические инженерные паттерны.

Цель документации — быстро восстановить **ментальную модель**, а не перечитывать учебник целиком.

## Как пользоваться базой

При повторении темы держи фокус на четырёх вопросах:

1. **Как это работает под капотом?**
2. **Где я обычно ошибаюсь?**
3. **Как это проявляется в реальном frontend-коде?**
4. **Как я объясню это на собеседовании за 30–60 секунд?**

Для Senior-уровня недостаточно помнить API. Важно понимать порядок выполнения, границы ответственности, стоимость решений и типичные failure modes.

## Рекомендуемый порядок повторения

### 1. JavaScript core

- execution context, scope, closures;
- `this` и способы вызова функции;
- primitive/reference semantics, equality, mutation;
- Event Loop, Promise, `async/await`;
- debounce/throttle, retry, cancellation, concurrency.

### 2. Browser

- от события пользователя до обработчика;
- network lifecycle, HTTP/cache/CORS;
- storage и безопасность;
- render pipeline и причины блокировки main thread.

### 3. React

- identity компонента и reconciliation;
- render/commit;
- state, derived state и source of truth;
- effects как синхронизация с внешними системами;
- memoization и performance после измерения;
- server/client/URL state и границы архитектуры.

### 4. Algorithms

Алгоритмы здесь нужны не ради спортивного программирования, а для тренировки декомпозиции, оценки сложности и узнавания паттернов.

## Что лежит рядом

В корне репозитория находятся решения задач (`.js` по папкам тем), `roadmap.md` и `weeklySchedule.md`.

## Локальный запуск документации

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-docs.txt
mkdocs serve
```

Сборка:

```bash
mkdocs build
```

## Правило для новых статей

Новая статья должна отвечать минимум на три вещи:

- правильная ментальная модель;
- типичные ошибки/мифы;
- практический пример из frontend-разработки или собеседования.

Не стоит заводить отдельную статью ради синтаксиса, который проще посмотреть в MDN. Эта база — про темы, которые важно **понимать и уметь объяснять**.
