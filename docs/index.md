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

1. Выберите раздел: `docs/articles/algorithms/` или `docs/articles/browser/`.
2. Создайте файл `имя-статьи.md` (Markdown).
3. Добавьте пункт в `nav` → **Статьи → Алгоритмы** или **Браузер** в `mkdocs.yml`.
4. Обновите [оглавление раздела](articles/algorithms/index.md) или [браузера](articles/browser/index.md).

Шаблон: [articles/_template.md](articles/_template.md).
