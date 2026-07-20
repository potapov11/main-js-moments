# Algo Prep — документация

Здесь собраны **статьи и теория** по алгоритмам и смежным темам для подготовки к собеседованию на Frontend Developer.

Рядом в корне репозитория: решения задач (`.js` по папкам тем), `roadmap.md` и `weeklySchedule.md`.

## Как открыть сайт локально

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements-docs.txt
mkdocs serve
```

Откройте в браузере: [http://127.0.0.1:8000](http://127.0.0.1:8000)

Сборка статики в папку `site/`:

```bash
mkdocs build
```

## Как добавить статью

<<<<<<< HEAD
1. Выберите раздел: `docs/articles/algorithms/`, `docs/articles/browser/`, `docs/articles/async-javascript/`, `docs/articles/mini-tasks/` или `docs/articles/react-tasks/`.
2. Создайте файл `имя-статьи.md` (Markdown).
3. Добавьте пункт в `nav` → **Статьи → Алгоритмы**, **Браузер**, **Асинхронный JavaScript**, **Интересные мини-задачи** или **React-задачи** в `mkdocs.yml`.
4. Обновите [оглавление раздела](articles/algorithms/index.md), [браузера](articles/browser/index.md), [асинхронного JavaScript](articles/async-javascript/index.md), [мини-задач](articles/mini-tasks/index.md) или [React-задач](articles/react-tasks/index.md).
=======
1. Выберите раздел: `docs/articles/algorithms/`, `docs/articles/async/`, `docs/articles/browser/`, `docs/articles/mini-tasks/`, `docs/articles/react-tasks/` или `docs/articles/react-theory/`.
2. Создайте файл `имя-статьи.md` (Markdown).
3. Добавьте пункт в `nav` → **Статьи → Алгоритмы**, **Асинхронное программирование**, **Браузер**, **Интересные мини-задачи**, **React-задачи** или **React теория** в `mkdocs.yml`.
4. Обновите оглавление раздела: [algorithms](articles/algorithms/index.md), [async](articles/async/index.md), [browser](articles/browser/index.md), [mini-tasks](articles/mini-tasks/index.md), [react-tasks](articles/react-tasks/index.md) или [react-theory](articles/react-theory/index.md).
>>>>>>> 5f83e3c42f104bfbded81a7b72b338eeafa8b528

Шаблон: [articles/_template.md](articles/_template.md).
