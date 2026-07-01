# Режим собеседования (frontend)

Подготовка к техническому интервью: React, TypeScript, CSS/SCSS, HTML и смежный стек.

## Как включить

1. Открой файл из этой папки **или** упомяни `@interview_voice` в чате.
2. Напиши: **«режим собеседование»**, **«собеседование»** или **«продолжаем собеседование»**.

Правило Cursor: `.cursor/rules/frontend-interview.mdc`

## Источники

- Loader Cursor: `.cursor/rules/frontend-interview.mdc`
- Основное правило интервью: `.cursor/cursorrules/.cursorrules`
- Банк вопросов с ID: `.cursor/cursorrules/.questions`
- Coverage вопросов: `interview_voice/question-coverage.md`
- Daily feedback: `feedbacks/interview-feedback-DD.MM.md`

## Формат

- Один вопрос за раз.
- Уточняющие вопросы — пока нет чёткого ответа.
- Готовые решения и полный код — только по явной просьбе.
- Стандартный блок собеседования — 10 основных вопросов; расширенный блок — 15.
- Перед сессией selector выбирает вопросы по ID из `question-coverage.md`: минимум 60% `new`, без `passed` за последние 3 сессии.
- Каждый второй блок включает 1 practical coding задачу из раздела 19 `.questions` (`Q-PRACT-*`): не LeetCode, а frontend/JS практика вроде `EventEmitter`, `debounce`, hooks, DOM, cache, формы.
- Для code review / rewrite задач допустимы большие копируемые компоненты на 60–150 строк.

## Прогресс (куда пишет агент)

| Что | Когда | Файл |
|-----|--------|------|
| Статус по ID | после каждого закрытого вопроса | `question-coverage.md` |
| Короткий feedback | после каждого закрытого вопроса | `feedbacks/interview-feedback-DD.MM.md` |
| Состояние сессии | при паузе и после каждого вопроса | `NN-*.md` |
| Итог сессии / дня | конец блока / конец дня | daily feedback |

Шаблоны записей: `feedbacks/README.md` и `.cursor/cursorrules/.cursorrules`.

## Сессии

| # | Файл | Тема | Статус |
|---|------|------|--------|
| 1 | [01-react-memo-rerenders.md](./01-react-memo-rerenders.md) | React.memo, ререндеры | на паузе |
| 2 | [02-mock-middle-frontend.md](./02-mock-middle-frontend.md) | Mock Middle Frontend (10+Q) | на паузе (Q-PRACT-002) |

Coverage по всем вопросам: [question-coverage.md](./question-coverage.md).

## Пауза

При паузе агент **автоматически** обновляет активный `NN-*.md`: статус `на паузе`, текущий вопрос, ответы, незакрытые подвопросы, таблица прогресса блока. При «продолжаем собеседование» — читает этот файл и daily feedback за 2–3 дня.
