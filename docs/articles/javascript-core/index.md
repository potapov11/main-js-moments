# JavaScript Core — ментальные модели

Этот раздел закрывает фундамент, который особенно важен на уровне Middle+/Senior: не «что вернёт метод массива», а **почему код ведёт себя именно так**.

## Порядок чтения

1. [Execution context, scope и closures](execution-context-scope-closures.md)
2. [`this`: значение определяется способом вызова](this-and-call-site.md)
3. [Примитивы, ссылки, equality и mutation](references-equality-immutability.md)
4. Затем переходи к [Event Loop](../async/event-loop.md) и Promise.

## Что нужно уметь после раздела

- объяснить lexical scope и closure без фразы «функция запомнила переменную» как единственного определения;
- предсказывать `this` по call-site, а не по месту объявления;
- понимать, когда два объекта равны и почему shallow copy не делает вложенные структуры независимыми;
- замечать скрытую mutation и объяснять, почему она особенно опасна в React/Redux;
- связывать эти модели с практическими багами: stale closure, потерянный `this`, случайная мутация state, неправильная memoization.
