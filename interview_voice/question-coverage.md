# Question Coverage

Источник вопросов: `.cursor/cursorrules/.questions`.

Статусы: `new`, `seen`, `weak`, `repeat`, `passed`.

Перед mock-interview selector берёт вопросы со статусом `new`, `weak` или `repeat`; `passed` не повторяется в ближайшие 3 сессии без явной просьбы.

| ID | Тема | Последний раз | Статус | Заметка |
|----|------|---------------|--------|---------|
| Q-REACT-001 | Что такое React и его основные принципы? | — | new | — |
| Q-REACT-002 | Что такое JSX? Как он транспилируется? | — | new | — |
| Q-REACT-003 | В чем разница между элементами (elements) и компонентами (components)? | — | new | — |
| Q-REACT-004 | Что такое Virtual DOM? Как он сравнивается с реальным DOM? | — | new | — |
| Q-REACT-005 | Как работает алгоритм согласования (reconciliation)? | — | new | — |
| Q-REACT-006 | Что такое ключи (keys) в React? Почему нельзя использовать index? | — | new | — |
| Q-REACT-007 | Что такое "подъем состояния" (lifting state up)? | — | new | — |
| Q-REACT-008 | Как передать данные от ребенка к родителю? | — | new | — |
| Q-REACT-009 | Управляемые (controlled) vs неконтролируемые (uncontrolled) компоненты? | — | new | — |
| Q-REACT-010 | Что такое refs? Когда использовать? createRef vs useRef? | — | new | — |
| Q-REACT-011 | Как работать с формами в React? | — | new | — |
| Q-REACT-012 | Что такое Fragment? Зачем нужен? | — | new | — |
| Q-REACT-013 | Что такое порталы (Portals)? Реальный кейс использования? | — | new | — |
| Q-REACT-014 | Как обрабатывать ошибки в React? Error Boundaries? | — | new | — |
| Q-REACT-015 | Что такое StrictMode? Какие проверки выполняет? | — | new | — |
| Q-REACT-016 | Функциональные vs классовые компоненты: плюсы и минусы? | — | new | — |
| Q-REACT-017 | Какие методы жизненного цикла были в классовых компонентах? | — | new | — |
| Q-REACT-018 | Как useEffect эмулирует методы жизненного цикла? | — | new | — |
| Q-REACT-019 | Что такое чистая функция компонента? Почему React компоненты должны быть чистыми? | — | new | — |
| Q-REACT-020 | Что такое React.memo? Когда использовать? | — | new | — |
| Q-REACT-021 | Что такое PureComponent? Чем отличается от React.memo? | — | new | — |
| Q-REACT-022 | Как работает shouldComponentUpdate? | — | new | — |
| Q-REACT-023 | Что происходит при монтировании/обновлении/размонтировании? | — | new | — |
| Q-REACT-024 | Как правильно размонтировать компонент и очистить подписки? | — | new | — |
| Q-REACT-025 | Что такое "мерцание" (flash) при SSR и как его избежать? | — | new | — |
| Q-REACT-026 | Какие правила использования хуков? Почему они важны? | — | new | — |
| Q-REACT-027 | Как работает useState? Что возвращает? | — | new | — |
| Q-REACT-028 | Что такое useEffect? Массив зависимостей: как работает? | 2026-06-25 | passed | fetch: deps, race, isCanceled/async |
| Q-REACT-029 | Как useEffect определяет изменения зависимостей? Object.is? | — | new | — |
| Q-REACT-030 | Что такое useLayoutEffect? Чем отличается от useEffect? | — | new | — |
| Q-REACT-031 | Когда использовать useLayoutEffect вместо useEffect? | — | new | — |
| Q-REACT-032 | Что такое useContext? Как оптимизировать контекст? | — | new | — |
| Q-REACT-033 | Что такое useReducer? Когда лучше useState? | — | new | — |
| Q-REACT-034 | useCallback vs useMemo: в чем разница? Примеры использования? | — | new | — |
| Q-REACT-035 | Что такое useRef? Чем отличается от useState? | — | new | — |
| Q-REACT-036 | Что такое useImperativeHandle? Когда использовать? | — | new | — |
| Q-REACT-037 | Что такое useDebugValue? Зачем нужен? | — | new | — |
| Q-REACT-038 | Как создать свой хук (custom hook)? Пример? | — | new | — |
| Q-REACT-039 | Что такое useId? Зачем нужен? | — | new | — |
| Q-REACT-040 | Что такое useTransition и useDeferredValue? | — | new | — |
| Q-REACT-041 | Как работает useSyncExternalStore? Когда нужен? | — | new | — |
| Q-REACT-042 | Что такое useInsertionEffect? (React 18) | — | new | — |
| Q-REACT-043 | Как работают хуки под капотом? Почему порядок важен? | — | new | — |
| Q-REACT-044 | Как отлаживать хуки? React DevTools? | — | new | — |
| Q-REACT-045 | В чем проблема с "замыканиями" в useEffect? | — | new | — |
| Q-REACT-046 | Что такое локальный, глобальный и серверный state? | — | new | — |
| Q-REACT-047 | Когда использовать Context API vs Redux? | — | new | — |
| Q-REACT-048 | Как работает Redux? Flux паттерн? | — | new | — |
| Q-REACT-049 | Что такое Redux Thunk vs Redux Saga? | — | new | — |
| Q-REACT-050 | Что такое Redux Toolkit? Зачем нужен? | — | new | — |
| Q-REACT-051 | Что такое Zustand? Чем отличается от Redux? | — | new | — |
| Q-REACT-052 | Что такое MobX? Реактивное программирование? | — | new | — |
| Q-REACT-053 | Что такое Recoil? Атомы и селекторы? | — | new | — |
| Q-REACT-054 | Что такое Jotai? Когда использовать? | — | new | — |
| Q-REACT-055 | Как управлять состоянием форм? React Hook Form, Formik? | — | new | — |
| Q-REACT-056 | Какие инструменты для измерения производительности React? | — | new | — |
| Q-REACT-057 | Что такое "рендер" в React? Когда происходит? | — | new | — |
| Q-REACT-058 | Как избежать лишних рендеров? | 2026-06-25 | weak | memo ok; useMemo syntax wrong; no debounce/virtualize |
| Q-REACT-059 | Что такое "bailing out of update"? | — | new | — |
| Q-REACT-060 | Как работает батчинг обновлений в React 18? | 2026-06-25 | passed | functional setState prev+1×3 |
| Q-REACT-061 | Что такое виртуализация списков? react-window, react-virtualized? | — | new | — |
| Q-REACT-062 | Как лениво загружать компоненты? React.lazy + Suspense? | — | new | — |
| Q-REACT-063 | Как оптимизировать контекст от частых обновлений? | — | new | — |
| Q-REACT-064 | Что такое Code Splitting? Как реализовать? | — | new | — |
| Q-REACT-065 | Как работает tree shaking в React? | — | new | — |
| Q-REACT-066 | Что нового в React 18? | — | new | — |
| Q-REACT-067 | Что такое Concurrent Rendering? | — | new | — |
| Q-REACT-068 | Как работает автоматическое батчирование (automatic batching)? | — | new | — |
| Q-REACT-069 | Что такое startTransition? Когда использовать? | — | new | — |
| Q-REACT-070 | Что такое Suspense для данных? | — | new | — |
| Q-REACT-071 | Что такое Server Components? Как работают? | — | new | — |
| Q-REACT-072 | Что такое React Server Components vs Client Components? | — | new | — |
| Q-REACT-073 | Что такое "use server" директива? | — | new | — |
| Q-REACT-074 | Что такое "use client" директива? | — | new | — |
| Q-REACT-075 | Что такое React Compiler (React Forget)? | — | new | — |
| Q-REACT-076 | Как работает React Router v6? Чем отличается от v5? | — | new | — |
| Q-REACT-077 | Что такое SPA (Single Page Application)? Плюсы и минусы? | — | new | — |
| Q-REACT-078 | Как работает BrowserRouter vs HashRouter? | — | new | — |
| Q-REACT-079 | Как защитить маршруты (PrivateRoute)? | 2026-06-25 | weak | UI check ≠ security; backend enforcement |
| Q-REACT-080 | Что такое loaders и actions в React Router v6? | — | new | — |
| Q-TS-001 | Что такое TypeScript? Зачем нужен? | — | new | — |
| Q-TS-002 | Чем отличается TypeScript от JavaScript? | — | new | — |
| Q-TS-003 | Как TypeScript компилируется? Что такое tsconfig.json? | — | new | — |
| Q-TS-004 | Базовые типы: string, number, boolean, null, undefined, void, never? | — | new | — |
| Q-TS-005 | Что такое union (\|) и intersection (&) типы? | ) и intersection (&) типы? | — | new |
| Q-TS-006 | Как работают литеральные типы? | — | new | — |
| Q-TS-007 | Что такое any, unknown, never? В чем разница? | — | new | — |
| Q-TS-008 | Что такое void? Когда возвращается? | — | new | — |
| Q-TS-009 | Что такое null и undefined в TypeScript? | — | new | — |
| Q-TS-010 | Как работает type inference? | — | new | — |
| Q-TS-011 | Что такое type annotation? | — | new | — |
| Q-TS-012 | Как типизировать массивы и кортежи (tuples)? | — | new | — |
| Q-TS-013 | Что такое enum? Когда использовать? | — | new | — |
| Q-TS-014 | Проблемы с enum? Альтернативы? | — | new | — |
| Q-TS-015 | Как типизировать функции? Overloads? | — | new | — |
| Q-TS-016 | interface vs type: в чем разница? Когда что использовать? | — | new | — |
| Q-TS-017 | Как расширять интерфейсы? (extends) | — | new | — |
| Q-TS-018 | Как объединять типы? (intersection &) | — | new | — |
| Q-TS-019 | Что такое declaration merging? | — | new | — |
| Q-TS-020 | Как работает implements vs extends? | — | new | — |
| Q-TS-021 | Как типизировать объекты с динамическими ключами? (index signature) | — | new | — |
| Q-TS-022 | Как сделать свойства опциональными? (optional, Partial) | — | new | — |
| Q-TS-023 | Как сделать свойства только для чтения? (readonly) | — | new | — |
| Q-TS-024 | Что такое utility types: Partial, Required, Readonly? | — | new | — |
| Q-TS-025 | Что такое Record, Pick, Omit, Exclude, Extract? | — | new | — |
| Q-TS-026 | Что такое дженерики (generics)? Зачем нужны? | — | new | — |
| Q-TS-027 | Как написать generic функцию? | — | new | — |
| Q-TS-028 | Что такое generic constraints? extends keyof? | — | new | — |
| Q-TS-029 | Как работает keyof оператор? | — | new | — |
| Q-TS-030 | Что такое typeof в TS? | — | new | — |
| Q-TS-031 | Как работает infer? | — | new | — |
| Q-TS-032 | Что такое conditional types? T extends U ? X : Y | — | new | — |
| Q-TS-033 | Что такое mapped types? { [P in K]: T[P] } | — | new | — |
| Q-TS-034 | Что такое template literal types? | — | new | — |
| Q-TS-035 | Как работают рекурсивные типы? | — | new | — |
| Q-TS-036 | Что такое unknown? Как с ним работать? type narrowing? | — | new | — |
| Q-TS-037 | Что такое type guards? typeof, instanceof, in, пользовательские guards? | — | new | — |
| Q-TS-038 | Что такое assertion functions? asserts value is Type | — | new | — |
| Q-TS-039 | Что такое satisfies оператор? (TS 4.9) | — | new | — |
| Q-TS-040 | Что такое as const утверждение? | — | new | — |
| Q-TS-041 | Как работает NonNullable? | — | new | — |
| Q-TS-042 | Что такое ReturnType, Parameters? | — | new | — |
| Q-TS-043 | Что такое Awaited? | — | new | — |
| Q-TS-044 | Как работать с модулями? пространства имен? | — | new | — |
| Q-TS-045 | Как типизировать декораторы? | — | new | — |
| Q-TS-046 | Как типизировать функциональный компонент? React.FC vs обычная функция? | — | new | — |
| Q-TS-047 | Как типизировать пропсы? PropsWithChildren? | — | new | — |
| Q-TS-048 | Как типизировать хуки: useState, useEffect, useReducer, useContext? | — | new | — |
| Q-TS-049 | Как типизировать события: SyntheticEvent, MouseEvent, FormEvent? | — | new | — |
| Q-TS-050 | Как типизировать refs? RefObject, MutableRefObject? | — | new | — |
| Q-JS-001 | В чем разница между var, let, const? (hoisting, TDZ) | — | new | — |
| Q-JS-002 | Что такое hoisting? | — | new | — |
| Q-JS-003 | Что такое Temporal Dead Zone (TDZ)? | — | new | — |
| Q-JS-004 | Какие типы данных в JavaScript? | — | new | — |
| Q-JS-005 | Разница между == и ===? Когда использовать? | 2026-06-25 | weak | null/undefined/NaN ok; []==![] unclear; Object.is gap |
| Q-JS-006 | Что такое приведение типов (type coercion)? Примеры? | — | new | — |
| Q-JS-007 | Что такое замыкания (closures)? Пример использования? | — | new | — |
| Q-JS-008 | Что такое область видимости (scope)? Глобальная, функциональная, блочная? | — | new | — |
| Q-JS-009 | Что такое контекст выполнения (execution context)? | — | new | — |
| Q-JS-010 | Что такое лексическое окружение (lexical environment)? | — | new | — |
| Q-JS-011 | Как работает this? Правила определения? | 2026-06-25 | weak | arrow vs function callback; confused getName() |
| Q-JS-012 | Как явно привязать this? call, apply, bind? | — | new | — |
| Q-JS-013 | Разница между стрелочной и обычной функцией? | — | new | — |
| Q-JS-014 | Что такое spread оператор (...)? Rest параметры? | — | new | — |
| Q-JS-015 | Что такое деструктуризация (destructuring)? | — | new | — |
| Q-JS-016 | Что такое функции высшего порядка? | — | new | — |
| Q-JS-017 | Что такое чистая функция? | — | new | — |
| Q-JS-018 | Что такое иммутабельность (immutability)? | 2026-06-25 | passed | TodoList: spread, map, key=id |
| Q-JS-019 | Как работает new оператор? | — | new | — |
| Q-JS-020 | Что такое прототипное наследование? | — | new | — |
| Q-JS-021 | Что такое Event Loop? Call Stack, Task Queue, Microtask Queue? | 2026-06-25 | passed | A,D,G,C,E,B,F — sync/micro/macro |
| Q-JS-022 | Разница между микро- и макрозадачами? (microtasks vs macrotasks) | — | new | — |
| Q-JS-023 | Что такое промисы (Promises)? Состояния? | — | new | — |
| Q-JS-024 | Что такое callback hell? Как избежать? | — | new | — |
| Q-JS-025 | Разница между Promise.all, allSettled, race, any? | — | new | — |
| Q-JS-026 | Что такое async/await? Как работает под капотом? | — | new | — |
| Q-JS-027 | Как обрабатывать ошибки в async/await? try/catch vs .catch? | — | new | — |
| Q-JS-028 | Что такое генераторы? function*, yield? | — | new | — |
| Q-JS-029 | Что такое async-генераторы? | — | new | — |
| Q-JS-030 | Что такое setTimeout, setInterval, requestAnimationFrame? | — | new | — |
| Q-JS-031 | Как работает queueMicrotask? | — | new | — |
| Q-JS-032 | Что такое process.nextTick в Node.js? | — | new | — |
| Q-JS-033 | Что такое отложенные вычисления? (thunk) | — | new | — |
| Q-JS-034 | Что такое "гонка состояний"? Как избежать? | — | new | — |
| Q-JS-035 | Как отменить промис? AbortController? | — | new | — |
| Q-JS-036 | Что такое методы: map, filter, reduce, forEach? | — | new | — |
| Q-JS-037 | Что такое call, apply, bind? Отличия? | — | new | — |
| Q-JS-038 | Что такое каррирование (currying)? Пример? | — | new | — |
| Q-JS-039 | Что такое частичное применение функций? | — | new | — |
| Q-JS-040 | Что такое мемоизация (memoization)? Как реализовать? | — | new | — |
| Q-JS-041 | Как клонировать объект? shallow vs deep? | — | new | — |
| Q-JS-042 | Что такое WeakMap, WeakSet? Чем отличаются от Map, Set? | — | new | — |
| Q-JS-043 | Что такое Object.create? Прототипное наследование? | — | new | — |
| Q-JS-044 | Что такое Object.freeze, Object.seal? | — | new | — |
| Q-JS-045 | Что такое геттеры и сеттеры? get, set? | — | new | — |
| Q-JS-046 | Что такое классы в ES6? | — | new | — |
| Q-JS-047 | Как работает наследование? extends, super? | — | new | — |
| Q-JS-048 | Что такое статические методы и свойства? static? | — | new | — |
| Q-JS-049 | Что такое приватные поля? #privateField? | — | new | — |
| Q-JS-050 | Что такое абстрактные классы в JS? | — | new | — |
| Q-JS-051 | Что такое миксины (mixins)? | — | new | — |
| Q-JS-052 | Что такое композиция vs наследование? | — | new | — |
| Q-JS-053 | Что такое полиморфизм в JS? | — | new | — |
| Q-JS-054 | Что такое инкапсуляция? | — | new | — |
| Q-JS-055 | Как эмулировали классы до ES6? | — | new | — |
| Q-JS-056 | Что такое ES modules? import/export? | — | new | — |
| Q-JS-057 | Разница между default и named export? | — | new | — |
| Q-JS-058 | Что такое CommonJS? require/module.exports? | — | new | — |
| Q-JS-059 | Разница между ES modules и CommonJS? | — | new | — |
| Q-JS-060 | Что такое динамический импорт? import() | — | new | — |
| Q-JS-061 | Что такое Tree Shaking? | — | new | — |
| Q-JS-062 | Что такое Module Federation? | — | new | — |
| Q-JS-063 | Что такое UMD, AMD? | — | new | — |
| Q-JS-064 | Как работает циклическая зависимость? | — | new | — |
| Q-JS-065 | Что такое "звездный импорт" import * as? Проблемы? | — | new | — |
| Q-JS-066 | Что такое Reflection API? Reflect, Proxy? | — | new | — |
| Q-JS-067 | Что такое метапрограммирование? Symbol? | — | new | — |
| Q-JS-068 | Что такое тайпизированные массивы? TypedArray, ArrayBuffer? | — | new | — |
| Q-JS-069 | Что такое Web Workers? Shared Workers? | — | new | — |
| Q-JS-070 | Как работает Atomics? SharedArrayBuffer? | — | new | — |
| Q-ARCH-001 | Что такое SOLID? Каждый принцип с примером? | — | new | — |
| Q-ARCH-002 | Single Responsibility Principle (SRP) во фронтенде? | — | new | — |
| Q-ARCH-003 | Open-Closed Principle (OCP)? | — | new | — |
| Q-ARCH-004 | Liskov Substitution Principle (LSP)? | — | new | — |
| Q-ARCH-005 | Interface Segregation Principle (ISP)? | — | new | — |
| Q-ARCH-006 | Dependency Inversion Principle (DIP)? | — | new | — |
| Q-ARCH-007 | DRY (Don't Repeat Yourself) - где границы? | — | new | — |
| Q-ARCH-008 | KISS (Keep It Simple, Stupid)? | — | new | — |
| Q-ARCH-009 | YAGNI (You Aren't Gonna Need It)? | — | new | — |
| Q-ARCH-010 | Composition over Inheritance? Почему? | — | new | — |
| Q-ARCH-011 | Какие паттерны из GoF используете? | — | new | — |
| Q-ARCH-012 | Паттерн Singleton? Проблемы в JS? | — | new | — |
| Q-ARCH-013 | Паттерн Factory? Когда использовать? | — | new | — |
| Q-ARCH-014 | Паттерн Builder? Пример? | — | new | — |
| Q-ARCH-015 | Паттерн Observer? EventEmitter? | — | new | — |
| Q-ARCH-016 | Паттерн Pub/Sub? Чем отличается от Observer? | — | new | — |
| Q-ARCH-017 | Паттерн Strategy? Пример в React? | — | new | — |
| Q-ARCH-018 | Паттерн Decorator? HOC в React? | — | new | — |
| Q-ARCH-019 | Паттерн Adapter? Адаптер для API? | — | new | — |
| Q-ARCH-020 | Паттерн Proxy? Пример в JS? | — | new | — |
| Q-ARCH-021 | Паттерн Command? Redux actions? | — | new | — |
| Q-ARCH-022 | Паттерн State? Конечные автоматы? | — | new | — |
| Q-ARCH-023 | Паттерн Template Method? | — | new | — |
| Q-ARCH-024 | Паттерн Visitor? Когда нужен? | — | new | — |
| Q-ARCH-025 | Паттерн Middleware? Express, Redux? | — | new | — |
| Q-ARCH-026 | Что такое Feature-Sliced Design (FSD)? Слои? | — | new | — |
| Q-ARCH-027 | Что такое Component-Driven Development? | — | new | — |
| Q-ARCH-028 | Что такое Atomic Design? Атомы, молекулы, организмы? | — | new | — |
| Q-ARCH-029 | Что такое Container/Presentational паттерн? | — | new | — |
| Q-ARCH-030 | Что такое Clean Architecture во фронтенде? | — | new | — |
| Q-ARCH-031 | Что такое Hexagonal Architecture (Ports & Adapters)? | — | new | — |
| Q-ARCH-032 | Что такое MVC, MVVM, MVP во фронтенде? | — | new | — |
| Q-ARCH-033 | Что такое Flux? Однонаправленный поток данных? | — | new | — |
| Q-ARCH-034 | Что такое CQRS? Command Query Responsibility Segregation? | — | new | — |
| Q-ARCH-035 | Что такое Event Sourcing? | — | new | — |
| Q-ARCH-036 | Что такое Micro Frontends? Когда нужны? | — | new | — |
| Q-ARCH-037 | Какие подходы к интеграции? IFrame, Web Components, Module Federation? | — | new | — |
| Q-ARCH-038 | Как разделять состояние между микрофронтендами? | — | new | — |
| Q-ARCH-039 | Как реализовать навигацию между приложениями? | — | new | — |
| Q-ARCH-040 | Как организовать shared-библиотеки? | — | new | — |
| Q-ARCH-041 | REST vs GraphQL? Когда что выбрать? | — | new | — |
| Q-ARCH-042 | Что такое GraphQL? Плюсы и минусы? | — | new | — |
| Q-ARCH-043 | Что такое gRPC-Web? | — | new | — |
| Q-ARCH-044 | Что такое WebSocket? SSE? Когда что использовать? | — | new | — |
| Q-ARCH-045 | Как реализовать long polling? | — | new | — |
| Q-HTTP-001 | Как работает HTTP запрос? Структура? | — | new | — |
| Q-HTTP-002 | Идемпотентность методов? Какие методы идемпотентны? | — | new | — |
| Q-HTTP-003 | Что такое HTTP статусы? Все группы и примеры? | — | new | — |
| Q-HTTP-004 | 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error)? | — | new | — |
| Q-HTTP-005 | Что такое заголовки? Основные: Content-Type, Authorization, Cache-Control? | — | new | — |
| Q-HTTP-006 | Content-Type: application/json vs multipart/form-data? | — | new | — |
| Q-HTTP-007 | Что такое cookie? Как работают? Атрибуты: HttpOnly, Secure, SameSite? | — | new | — |
| Q-HTTP-008 | Что такое CORS? Preflight запрос? Как решить? | — | new | — |
| Q-HTTP-009 | Что такое CSRF? Как защититься? | — | new | — |
| Q-HTTP-010 | Что такое XSS? Как защититься? | — | new | — |
| Q-HTTP-011 | Что такое HTTPS? Как работает TLS? | — | new | — |
| Q-HTTP-012 | Что такое HTTP/2.0? Отличия от HTTP/1.1? | — | new | — |
| Q-HTTP-013 | Что такое HTTP/3.0? QUIC протокол? | — | new | — |
| Q-HTTP-014 | Что такое gzip, Brotli сжатие? | — | new | — |
| Q-HTTP-015 | Что такое REST? Принципы REST? | — | new | — |
| Q-HTTP-016 | Что такое ресурс (resource) в REST? | — | new | — |
| Q-HTTP-017 | Как правильно именовать endpoints? | — | new | — |
| Q-HTTP-018 | Что такое версионирование API? Стратегии? | — | new | — |
| Q-HTTP-019 | Что такое HATEOAS? | — | new | — |
| Q-HTTP-020 | Пагинация в REST: offset/limit vs cursor? | — | new | — |
| Q-HTTP-021 | Фильтрация, сортировка, поиск в REST? | — | new | — |
| Q-HTTP-022 | Что такое idempotency key? | — | new | — |
| Q-HTTP-023 | Что такое rate limiting? Как реализовать на фронте? | — | new | — |
| Q-HTTP-024 | Как документировать REST API? OpenAPI, Swagger? | — | new | — |
| Q-HTTP-025 | JWT токен: структура, как работает? | — | new | — |
| Q-HTTP-026 | Где хранить JWT? localStorage vs cookies? Безопасность? | — | new | — |
| Q-HTTP-027 | Refresh token механизм? Как работает? | — | new | — |
| Q-HTTP-028 | OAuth 2.0 и OpenID Connect? | — | new | — |
| Q-HTTP-029 | Basic Auth vs Bearer Auth? | — | new | — |
| Q-HTTP-030 | Что такое Session-based auth? | — | new | — |
| Q-HTTP-031 | Что такое SSO (Single Sign-On)? | — | new | — |
| Q-HTTP-032 | Как реализовать "запомнить меня"? | — | new | — |
| Q-HTTP-033 | DNS: как работает? Что такое A, CNAME записи? | — | new | — |
| Q-HTTP-034 | CDN: что это? Как ускоряет загрузку? | — | new | — |
| Q-HTTP-035 | Что такое WebSocket? Как работает handshake? | — | new | — |
| Q-HTTP-036 | Что такое Server-Sent Events (SSE)? | — | new | — |
| Q-HTTP-037 | Что такое WebRTC? Когда использовать? | — | new | — |
| Q-HTTP-038 | Что такое MQTT? Для IoT? | — | new | — |
| Q-HTTP-039 | Что такое QUIC протокол? | — | new | — |
| Q-CSS-001 | Что такое специфичность? Как считать селекторы? | 2026-06-25 | passed | !important green; без — red #text |
| Q-CSS-002 | Каскадность CSS: как применяются стили? | — | new | — |
| Q-CSS-003 | Что такое блочная модель (box model)? box-sizing? | — | new | — |
| Q-CSS-004 | Разница между display: block, inline, inline-block, none? | — | new | — |
| Q-CSS-005 | Разница между visibility: hidden и display: none? | — | new | — |
| Q-CSS-006 | Позиционирование: static, relative, absolute, fixed, sticky? | — | new | — |
| Q-CSS-007 | Что такое z-index? Контекст наложения (stacking context)? | — | new | — |
| Q-CSS-008 | Единицы измерения: px, em, rem, vw, vh, %, fr? | — | new | — |
| Q-CSS-009 | Работа с цветом: hex, rgb, hsl, rgba? | — | new | — |
| Q-CSS-010 | Что такое псевдоклассы? Примеры: :hover, :first-child, :nth-of-type? | — | new | — |
| Q-CSS-011 | Что такое псевдоэлементы? ::before, ::after, ::first-line? | — | new | — |
| Q-CSS-012 | Что такое CSS-переменные (custom properties)? Преимущества? | — | new | — |
| Q-CSS-013 | Как работает наследование в CSS? | — | new | — |
| Q-CSS-014 | Что такое сброс стилей (reset)? normalize.css? | — | new | — |
| Q-CSS-015 | Что такое вендорные префиксы? Autoprefixer? | — | new | — |
| Q-CSS-016 | Что такое @import? Плюсы и минусы? | — | new | — |
| Q-CSS-017 | Что такое @media? Адаптивная верстка? | — | new | — |
| Q-CSS-018 | Breakpoints для мобильных, планшетов, десктопов? | — | new | — |
| Q-CSS-019 | Что такое @keyframes? CSS-анимация? | — | new | — |
| Q-CSS-020 | Что такое transition? Разница с анимацией? | — | new | — |
| Q-CSS-021 | Что такое Flexbox? Когда использовать? | — | new | — |
| Q-CSS-022 | Flex-контейнер и flex-элементы? | — | new | — |
| Q-CSS-023 | Свойства контейнера: flex-direction, flex-wrap, justify-content, align-items, align-content? | — | new | — |
| Q-CSS-024 | Свойства элементов: order, flex-grow, flex-shrink, flex-basis, align-self? | — | new | — |
| Q-CSS-025 | Как центрировать элемент с помощью Flexbox? | — | new | — |
| Q-CSS-026 | Как сделать "липкий" футер с Flexbox? | — | new | — |
| Q-CSS-027 | Как сделать колонки одинаковой высоты? | — | new | — |
| Q-CSS-028 | Flexbox vs Grid: когда что выбрать? | — | new | — |
| Q-CSS-029 | Как работает автоматический margin в Flexbox? | — | new | — |
| Q-CSS-030 | Что такое gap в Flexbox? | — | new | — |
| Q-CSS-031 | Что такое CSS Grid? Для чего? | — | new | — |
| Q-CSS-032 | Grid-контейнер и grid-элементы? | — | new | — |
| Q-CSS-033 | Свойства контейнера: grid-template-columns, grid-template-rows, gap? | — | new | — |
| Q-CSS-034 | Что такое fr единица? | — | new | — |
| Q-CSS-035 | Что такое grid-template-areas? | — | new | — |
| Q-CSS-036 | Функции: repeat(), minmax(), fit-content()? | — | new | — |
| Q-CSS-037 | Свойства элементов: grid-column, grid-row, grid-area? | — | new | — |
| Q-CSS-038 | Как сделать адаптивную сетку с помощью Grid? | — | new | — |
| Q-CSS-039 | Grid vs Flexbox для layout страницы? | — | new | — |
| Q-CSS-040 | Что такое subgrid? | — | new | — |
| Q-CSS-041 | Mobile First vs Desktop First подходы? | — | new | — |
| Q-CSS-042 | Что такое viewport meta tag? | — | new | — |
| Q-CSS-043 | Что такое responsive images? srcset, picture, sizes? | — | new | — |
| Q-CSS-044 | Что такое Retina дисплеи? Как подготовить изображения? | — | new | — |
| Q-CSS-045 | Что такое object-fit и object-position? | — | new | — |
| Q-CSS-046 | Что такое aspect-ratio? | — | new | — |
| Q-CSS-047 | Как работать с адаптивными шрифтами? clamp(), calc(), vw? | — | new | — |
| Q-CSS-048 | Что такое container queries? | — | new | — |
| Q-CSS-049 | Что такое CSS логические свойства? margin-inline-start? | — | new | — |
| Q-CSS-050 | Как тестировать адаптивность в браузере? | — | new | — |
| Q-CSS-051 | Препроцессоры: Sass, LESS? Плюсы и минусы? | — | new | — |
| Q-CSS-052 | Что такое CSS Modules? Как работает? | — | new | — |
| Q-CSS-053 | styled-components? Как работает под капотом? | — | new | — |
| Q-CSS-054 | Emotion, Stitches, Panda CSS? | — | new | — |
| Q-CSS-055 | Tailwind CSS? Utility-first подход? | — | new | — |
| Q-CSS-056 | transform vs position для анимации? Производительность? | — | new | — |
| Q-CSS-057 | Что такое will-change? | — | new | — |
| Q-CSS-058 | Что такое Canvas, SVG, WebGL? Когда что использовать? | — | new | — |
| Q-BROWSER-001 | Как браузер рендерит страницу? Critical Rendering Path? | — | new | — |
| Q-BROWSER-002 | DOM (Document Object Model) vs CSSOM? | — | new | — |
| Q-BROWSER-003 | Render Tree? Layout, Paint, Composite? | — | new | — |
| Q-BROWSER-004 | Что такое reflow (layout) и repaint? Что дороже? | — | new | — |
| Q-BROWSER-005 | Что такое compositing? Какие слои? | — | new | — |
| Q-BROWSER-006 | Что такое event bubbling и capturing? Как остановить? | — | new | — |
| Q-BROWSER-007 | Что такое event delegation? Пример использования? | — | new | — |
| Q-BROWSER-008 | Что такое requestAnimationFrame? Когда использовать? | — | new | — |
| Q-BROWSER-009 | Что такое requestIdleCallback? | — | new | — |
| Q-BROWSER-010 | Что такое Web Workers? Когда нужны? | — | new | — |
| Q-BROWSER-011 | Что такое Service Workers? Кэширование, PWA? | — | new | — |
| Q-BROWSER-012 | Что такое IndexedDB? Когда использовать? | — | new | — |
| Q-BROWSER-013 | Что такое localStorage, sessionStorage? Лимиты? | — | new | — |
| Q-BROWSER-014 | Что такое Session Storage vs Local Storage vs Cookies? | — | new | — |
| Q-BROWSER-015 | Что такое BroadcastChannel, SharedWorker? | — | new | — |
| Q-BROWSER-016 | Какие метрики Core Web Vitals? LCP, FID, CLS, INP? | — | new | — |
| Q-BROWSER-017 | Что такое First Paint (FP) и First Contentful Paint (FCP)? | — | new | — |
| Q-BROWSER-018 | Что такое Largest Contentful Paint (LCP)? Как оптимизировать? | — | new | — |
| Q-BROWSER-019 | Что такое First Input Delay (FID) и Interaction to Next Paint (INP)? | — | new | — |
| Q-BROWSER-020 | Что такое Cumulative Layout Shift (CLS)? Как избежать? | — | new | — |
| Q-BROWSER-021 | Что такое Time to Interactive (TTI)? | — | new | — |
| Q-BROWSER-022 | Что такое Total Blocking Time (TBT)? | — | new | — |
| Q-BROWSER-023 | Как измерить производительность? Lighthouse, Web Vitals? | — | new | — |
| Q-BROWSER-024 | Как оптимизировать загрузку изображений? lazy loading, webp? | — | new | — |
| Q-BROWSER-025 | Как оптимизировать шрифты? font-display: swap? | — | new | — |
| Q-BROWSER-026 | Как работает Critical CSS? Inline critical стили? | — | new | — |
| Q-BROWSER-027 | Что такое код-сплиттинг (code splitting)? | — | new | — |
| Q-BROWSER-028 | Что такое предзагрузка? preload, prefetch, preconnect, dns-prefetch? | — | new | — |
| Q-BROWSER-029 | Разница между preload и prefetch? | — | new | — |
| Q-BROWSER-030 | Как оптимизировать JavaScript? Remove dead code, minify? | — | new | — |
| Q-BROWSER-031 | Что такое Web Workers для тяжелых вычислений? | — | new | — |
| Q-BROWSER-032 | Как оптимизировать работу с DOM? DocumentFragment? | — | new | — |
| Q-BROWSER-033 | Что такое Virtual Scrolling? Когда нужен? | — | new | — |
| Q-BROWSER-034 | Как оптимизировать анимации? transform, opacity? | — | new | — |
| Q-BROWSER-035 | Инструменты профилирования: Chrome DevTools Performance tab? | — | new | — |
| Q-BUILD-001 | Что такое Webpack? Зачем нужен? | — | new | — |
| Q-BUILD-002 | entry, output, loaders, plugins? | — | new | — |
| Q-BUILD-003 | Что такое code splitting? Как настроить? | — | new | — |
| Q-BUILD-004 | Разница между chunk и bundle? | — | new | — |
| Q-BUILD-005 | Что такое Tree Shaking? Как работает? | — | new | — |
| Q-BUILD-006 | Как работает hot module replacement (HMR)? | — | new | — |
| Q-BUILD-007 | Что такое source maps? Типы? Pros/cons? | — | new | — |
| Q-BUILD-008 | Как оптимизировать размер бандла? | — | new | — |
| Q-BUILD-009 | Что такое webpack-dev-server? Как работает? | — | new | — |
| Q-BUILD-010 | Что такое Module Federation? (Webpack 5) | — | new | — |
| Q-BUILD-011 | Что такое asset modules? (file-loader, url-loader) | — | new | — |
| Q-BUILD-012 | Что такое babel-loader? Зачем нужен Babel? | — | new | — |
| Q-BUILD-013 | Что такое CSS extraction? MiniCssExtractPlugin? | — | new | — |
| Q-BUILD-014 | Как работает кэширование в Webpack? contenthash? | — | new | — |
| Q-BUILD-015 | Что такое webpack-merge? Зачем нужен? | — | new | — |
| Q-BUILD-016 | Что такое Vite? Отличия от Webpack? | — | new | — |
| Q-BUILD-017 | Как работает Vite? no-bundle dev server? | — | new | — |
| Q-BUILD-018 | Что такое esbuild? Почему Vite его использует? | — | new | — |
| Q-BUILD-019 | Что такое pre-bundling dependencies? | — | new | — |
| Q-BUILD-020 | Как работает HMR в Vite? | — | new | — |
| Q-BUILD-021 | Что такое Rollup? Когда использовать? | — | new | — |
| Q-BUILD-022 | Что такое Parcel? | — | new | — |
| Q-BUILD-023 | Что такое SWC? vs Babel? | — | new | — |
| Q-BUILD-024 | Что такое Turbopack? | — | new | — |
| Q-BUILD-025 | Что такое esbuild? Почему быстрый? | — | new | — |
| Q-TEST-001 | Unit тесты vs Integration тесты vs E2E? | — | new | — |
| Q-TEST-002 | Что такое Snapshot тестирование? | — | new | — |
| Q-TEST-003 | Что такое TDD (Test-Driven Development)? | — | new | — |
| Q-TEST-004 | Что такое BDD (Behavior-Driven Development)? | — | new | — |
| Q-TEST-005 | Что такое тестовое покрытие (coverage)? Какой процент нужен? | — | new | — |
| Q-TEST-006 | Jest vs Vitest? Что выбрать? | — | new | — |
| Q-TEST-007 | Как тестировать React компоненты? React Testing Library? | — | new | — |
| Q-TEST-008 | Почему Testing Library, а не Enzyme? | — | new | — |
| Q-TEST-009 | Как тестировать хуки? renderHook? | — | new | — |
| Q-TEST-010 | Как тестировать асинхронный код? | — | new | — |
| Q-TEST-011 | Как мокать модули? jest.mock? | — | new | — |
| Q-TEST-012 | Как тестировать API запросы? MSW (Mock Service Worker)? | — | new | — |
| Q-TEST-013 | Что такое Cypress? vs Selenium? | — | new | — |
| Q-TEST-014 | Что такое Playwright? vs Puppeteer? | — | new | — |
| Q-TEST-015 | Что такое Storybook? Как использовать для тестов? | — | new | — |
| Q-TEST-016 | Что тестировать в первую очередь? | — | new | — |
| Q-TEST-017 | Как тестировать пользовательские сценарии? | — | new | — |
| Q-TEST-018 | Как тестировать ошибки и граничные случаи? | — | new | — |
| Q-TEST-019 | Как организовать тестовые данные? factories, fixtures? | — | new | — |
| Q-TEST-020 | Как интегрировать тесты в CI/CD? | — | new | — |
| Q-BACKEND-001 | Что такое SQL vs NoSQL? Когда что выбрать? | — | new | — |
| Q-BACKEND-002 | Что такое ORM? Примеры для JS (Prisma, TypeORM, Sequelize)? | — | new | — |
| Q-BACKEND-003 | Что такое миграции (migrations)? | — | new | — |
| Q-BACKEND-004 | Что такое индексы? Зачем нужны? | — | new | — |
| Q-BACKEND-005 | Что такое транзакции? ACID? | — | new | — |
| Q-BACKEND-006 | Что такое нормализация и денормализация? | — | new | — |
| Q-BACKEND-007 | Что такое JOIN? Типы: INNER, LEFT, RIGHT, FULL? | — | new | — |
| Q-BACKEND-008 | Что такое агрегации? GROUP BY, HAVING? | — | new | — |
| Q-BACKEND-009 | Что такое MongoDB? Документо-ориентированная БД? | — | new | — |
| Q-BACKEND-010 | Что такое Redis? Кэширование, сессии? | — | new | — |
| Q-BACKEND-011 | Что такое ElasticSearch? Поиск и аналитика? | — | new | — |
| Q-BACKEND-012 | Что такое Firebase? Realtime Database, Firestore? | — | new | — |
| Q-BACKEND-013 | SQL инъекции? Как защититься? | — | new | — |
| Q-BACKEND-014 | Что такое prepared statements? | — | new | — |
| Q-BACKEND-015 | Что такое шифрование данных? bcrypt? | — | new | — |
| Q-GIT-001 | Git flow? Стратегии ветвления? | — | new | — |
| Q-GIT-002 | Что такое rebase vs merge? | — | new | — |
| Q-GIT-003 | Что такое squash commits? Когда использовать? | — | new | — |
| Q-GIT-004 | Что такое cherry-pick? | — | new | — |
| Q-GIT-005 | Как отменить коммит? revert vs reset? | — | new | — |
| Q-GIT-006 | Что такое stash? Когда использовать? | — | new | — |
| Q-GIT-007 | Что такое interactive rebase? git rebase -i? | — | new | — |
| Q-GIT-008 | Как работать с субмодулями (submodules)? | — | new | — |
| Q-GIT-009 | Что такое git bisect? Как найти баг? | — | new | — |
| Q-GIT-010 | Что такое git hooks? pre-commit, pre-push? | — | new | — |
| Q-GIT-011 | Как разрешать конфликты? Стратегии? | — | new | — |
| Q-GIT-012 | Что такое Git LFS? Для больших файлов? | — | new | — |
| Q-GIT-013 | Что такое CI/CD? GitLab CI, GitHub Actions, Jenkins? | — | new | — |
| Q-GIT-014 | Что такое пайплайн (pipeline)? Этапы? | — | new | — |
| Q-GIT-015 | Что такое артефакты (artifacts)? | — | new | — |
| Q-GIT-016 | Как автоматизировать деплой? | — | new | — |
| Q-GIT-017 | Как настроить окружения: dev, staging, production? | — | new | — |
| Q-GIT-018 | Что такое Docker? Контейнеризация? | — | new | — |
| Q-GIT-019 | Docker vs Virtual Machine? | — | new | — |
| Q-GIT-020 | Что такое Docker Compose? | — | new | — |
| Q-ALGO-001 | Массивы: методы, сложность операций? | — | new | — |
| Q-ALGO-002 | Связные списки (Linked Lists): односвязные, двусвязные? | — | new | — |
| Q-ALGO-003 | Стек (Stack) и очередь (Queue): реализация? | — | new | — |
| Q-ALGO-004 | Хеш-таблицы (Hash Tables): как работают? Коллизии? | — | new | — |
| Q-ALGO-005 | Деревья (Trees): бинарные деревья, BST? | — | new | — |
| Q-ALGO-006 | Графы (Graphs): представление, обход? | — | new | — |
| Q-ALGO-007 | Set vs Map? Когда использовать? | — | new | — |
| Q-ALGO-008 | Что такое WeakMap, WeakSet? | — | new | — |
| Q-ALGO-009 | Что такое бинарная куча (Binary Heap)? | — | new | — |
| Q-ALGO-010 | Что такое очередь с приоритетом? | — | new | — |
| Q-ALGO-011 | Сортировка: пузырьком, быстрая, слиянием? Сложность? | — | new | — |
| Q-ALGO-012 | Поиск: бинарный поиск? Линейный? | — | new | — |
| Q-ALGO-013 | Рекурсия: что такое стек вызовов? Переполнение? | — | new | — |
| Q-ALGO-014 | Динамическое программирование? Пример? | — | new | — |
| Q-ALGO-015 | Жадные алгоритмы (Greedy)? | — | new | — |
| Q-ALGO-016 | Обход графа: DFS, BFS? Разница? | — | new | — |
| Q-ALGO-017 | Что такое Big O нотация? Примеры O(1), O(n), O(n²), O(log n)? | — | new | — |
| Q-ALGO-018 | Как оценивать сложность алгоритмов? | — | new | — |
| Q-ALGO-019 | Что такое мемоизация? Кэширование результатов? | — | new | — |
| Q-ALGO-020 | Что такое двух указателей (two pointers)? | — | new | — |
| Q-SOFT-001 | Как объяснить сложную техническую проблему нетехническому человеку? | — | new | — |
| Q-SOFT-002 | Как вы проводите код-ревью? На что смотрите? | — | new | — |
| Q-SOFT-003 | Как даете обратную связь коллегам? | — | new | — |
| Q-SOFT-004 | Как решаете конфликт в команде? | — | new | — |
| Q-SOFT-005 | Как эскалируете проблему? | — | new | — |
| Q-SOFT-006 | Как работаете с legacy кодом? | — | new | — |
| Q-SOFT-007 | Как оцениваете время на задачу? | — | new | — |
| Q-SOFT-008 | Как документируете код и решения? | — | new | — |
| Q-SOFT-009 | Что такое Agile, Scrum, Kanban? | — | new | — |
| Q-SOFT-010 | Как проводятся daily, planning, retro? | — | new | — |
| Q-SOFT-011 | Что такое story points? Оценка задач? | — | new | — |
| Q-SOFT-012 | Как работаете с требованиями? Что делать, если требования нечеткие? | — | new | — |
| Q-SOFT-013 | Как приоритизируете задачи? | — | new | — |
| Q-SOFT-014 | Как делитесь знаниями в команде? | — | new | — |
| Q-SOFT-015 | Куда развиваетесь дальше? Tech lead, Architect, Manager? | — | new | — |
| Q-SOFT-016 | Как следите за новыми технологиями? | — | new | — |
| Q-SOFT-017 | Как выбираете, что учить дальше? | — | new | — |
| Q-SOFT-018 | Что такое технический долг? Как с ним работать? | — | new | — |
| Q-SOFT-019 | Как ведете технический блог/выступаете на конференциях? | — | new | — |
| Q-SOFT-020 | Самый сложный баг в карьере? Как нашли и исправили? | — | new | — |
| Q-BEHAV-001 | Какая была самая интересная техническая задача? Что именно делал и какой результат? | — | new | — |
| Q-SEC-001 | Как обеспечить безопасность WebSocket-соединения? | — | new | — |
| Q-SEC-002 | Как понять, что пользователь авторизован в REST API? | — | new | — |
| Q-SEC-003 | Как передавать авторизацию в WebSocket? | — | new | — |
| Q-SEC-004 | Можно ли передать Authorization header из браузера в WebSocket? | — | new | — |
| Q-SEC-005 | Какие альтернативы header: cookie, query params, первое сообщение после подключения? | — | new | — |
| Q-SEC-006 | Плюсы и минусы передачи токена через query string в WebSocket URL? | — | new | — |
| Q-SEC-007 | Как защититься от утечки токена в логах/Referer при WebSocket auth? | — | new | — |
| Q-SEC-008 | Чем отличается аутентификация REST-запроса от WebSocket handshake? | — | new | — |
| Q-SEC-009 | Когда использовать cookie-based auth для WebSocket, а когда token в первом сообщении? | — | new | — |
| Q-SEC-010 | Как обработать истечение токена во время активного WebSocket-соединения? | — | new | — |
| Q-ARCH-046 | Что именно строил с нуля в проекте (архитектура, модули, инфра)? | — | new | — |
| Q-ARCH-047 | Какое мнение про Feature-Sliced Design? Где уместен, где нет? | — | new | — |
| Q-ARCH-048 | Что не понравилось в FSD на практике? | — | new | — |
| Q-ARCH-049 | Какие проблемы были при внедрении FSD в команде? | — | new | — |
| Q-ARCH-050 | Как онбордили разработчиков на FSD-структуру? | — | new | — |
| Q-CSS-059 | Как центрировать квадрат (несколько способов: flex, grid, absolute)? | — | new | — |
| Q-CSS-060 | Чем отличается display: none от visibility: hidden? | — | new | — |
| Q-CSS-061 | Flex vs Grid: в чём разница и когда что использовать? | — | new | — |
| Q-CSS-062 | Когда Flex, когда Grid для layout страницы? | — | new | — |
| Q-HTTP-040 | Из чего состоит HTTP-запрос (method, URL, headers, cookies, body)? | — | new | — |
| Q-HTTP-041 | Что приходит в HTTP response (status, headers, body)? | — | new | — |
| Q-HTTP-042 | Что происходит после ввода URL в браузере (пошагово)? | — | new | — |
| Q-HTTP-043 | На каком этапе появляются headers, cookies и body? | — | new | — |
| Q-HTTP-044 | Чем отличается request headers от response headers на практике? | — | new | — |
| Q-HTTP-045 | Что делает браузер до отправки HTTP-запроса (DNS, TCP/TLS, redirect)? | — | new | — |
| Q-SEC-011 | Что такое CSP (Content Security Policy) и зачем нужен? | — | new | — |
| Q-SEC-012 | Как CSP ограничивает выполнение inline-скриптов и внешние источники? | — | new | — |
| Q-SEC-013 | Какие основные CSP directives знаешь (default-src, script-src, connect-src, frame-ancestors)? | — | new | — |
| Q-SEC-014 | Как CORS связан с безопасностью фронтенда? | — | new | — |
| Q-SEC-015 | Как запретить запросы на нежелательные домены (CSP connect-src, network policy)? | — | new | — |
| Q-SEC-016 | Что такое hash/nonce в CSP для inline-скриптов? | — | new | — |
| Q-SEC-017 | Что такое SRI (Subresource Integrity) и когда применять? | — | new | — |
| Q-SEC-018 | Какие клиентские уязвимости знаешь (XSS, CSRF, clickjacking, open redirect)? | — | new | — |
| Q-SEC-019 | Как защититься от XSS на фронте и бэке? | — | new | — |
| Q-SEC-020 | Чем frame-ancestors отличается от X-Frame-Options? | — | new | — |
| Q-SEC-021 | Как безопасно хранить JWT на клиенте? | — | new | — |
| Q-SEC-022 | Что такое SameSite cookie и как это помогает от CSRF? | — | new | — |
| Q-REAL-001 | Как работает Event Emitter (pub/sub на клиенте)? | — | new | — |
| Q-REAL-002 | Чем Event Emitter отличается от нативных DOM events? | — | new | — |
| Q-REAL-003 | Когда Event Emitter уместен во фронтенде, а когда лучше Context/Redux? | — | new | — |
| Q-JS-071 | Как работает Event Loop (call stack, Web APIs, microtasks, macrotasks)? | — | new | — |
| Q-JS-072 | Что такое microtask starvation и когда возникает? | — | new | — |
| Q-JS-073 | Чем microtask queue отличается от macrotask queue? | — | new | — |
| Q-JS-074 | Почему Promise.then выполняется раньше setTimeout(..., 0)? | — | new | — |
| Q-TS-051 | Как работает instanceof в JavaScript/TypeScript? | — | new | — |
| Q-TS-052 | Почему interface нельзя проверить в runtime? | — | new | — |
| Q-TS-053 | В чём разница между type/interface и class/object при runtime-проверках? | — | new | — |
| Q-TS-054 | Какие runtime type guards возможны (typeof, instanceof, in, Array.isArray)? | — | new | — |
| Q-TS-055 | Как типизировать и проверять данные с API, если TS исчезает после компиляции? | — | new | — |
| Q-ALGO-LC-017 | Two Sum, Valid Parentheses, Best Time Buy/Sell Stock, Contains Duplicate | — | new | — |
| Q-ALGO-LC-018 | Longest Substring Without Repeating (sliding window), Merge Intervals, Maximum Subarray (Kadane) | — | new | — |
| Q-ALGO-LC-019 | Group Anagrams, Binary Search, Product of Array Except Self | — | new | — |
| Q-ALGO-LC-020 | BFS/DFS (граф/матрица), Number of Islands, Clone Graph (базово) | — | new | — |
| Q-ALGO-LC-001 | Linked List: reverse, cycle detection, merge two lists | — | new | — |
| Q-ALGO-LC-002 | Tree: max depth, validate BST, level order traversal | — | new | — |
| Q-ALGO-LC-003 | DP easy: Climbing Stairs, House Robber | — | new | — |
| Q-JS-108 | Объясни Event Loop: call stack → microtasks → macrotasks. Приведи порядок вывода. | — | new | — |
| Q-JS-075 | Что такое microtask starvation? Когда возникает и как проявляется? | — | new | — |
| Q-JS-076 | Разница Promise.all / allSettled / race / any — когда что на фронте? | — | new | — |
| Q-JS-077 | Как работает this в strict vs sloppy mode? Оторванный метод объекта. | — | new | — |
| Q-JS-078 | Prototype chain: как JS ищет свойство? __proto__ vs prototype. | — | new | — |
| Q-JS-109 | Shallow vs deep copy: способы и ловушки (structuredClone, JSON.parse). | — | new | — |
| Q-JS-079 | Как работает debounce vs throttle? Реализуй throttle словами. | — | new | — |
| Q-JS-080 | Почему 0.1 + 0.2 !== 0.3? Как решать денежные расчёты? | — | new | — |
| Q-JS-110 | Event delegation: зачем, как работает, минусы. | — | new | — |
| Q-JS-081 | WeakMap/WeakSet — зачем на фронте? | — | new | — |
| Q-JS-082 | Как отменить fetch? AbortController + cleanup в React. | — | new | — |
| Q-TS-081 | unknown vs any: runtime-баг и type guard. | — | new | — |
| Q-TS-082 | Discriminated union + exhaustiveness (never в default). | — | new | — |
| Q-TS-083 | Pick/Omit/Partial/Record — практические кейсы на API/types. | — | new | — |
| Q-TS-056 | satisfies vs аннотация : Type — когда что? | — | new | — |
| Q-TS-057 | Почему interface не существует в runtime? Как валидировать API? | — | new | — |
| Q-TS-084 | instanceof — как работает, ограничения с классами из разных realm. | — | new | — |
| Q-TS-085 | Generic constraint: T extends keyof U — пример. | — | new | — |
| Q-TS-058 | ReturnType, Parameters, Awaited — зачем? | — | new | — |
| Q-TS-059 | Как типизировать generic hook useLocalStorage<T>? | — | new | — |
| Q-TS-060 | Branded types / nominal typing — зачем? | — | new | — |
| Q-REACT-116 | useEffect: deps, cleanup, race condition (AbortController) — полный сценарий. | — | new | — |
| Q-REACT-081 | Stale closure в useEffect/setInterval — как воспроизвести и исправить? | — | new | — |
| Q-REACT-082 | Почему key={index} ломает state при reorder/filter? | — | new | — |
| Q-REACT-083 | Батчинг React 18: что группируется, что нет? | — | new | — |
| Q-REACT-084 | Context: почему частые updates ререндерят всё дерево? Как оптимизировать? | — | new | — |
| Q-REACT-117 | Controlled vs uncontrolled + когда ref уместнее state. | — | new | — |
| Q-REACT-085 | Error Boundary: что ловит, что не ловит? | — | new | — |
| Q-REACT-118 | Подъём state vs colocation vs global state — критерии выбора. | — | new | — |
| Q-REACT-086 | Как бы ты спроектировал cart (reducer): state shape, actions, selectors? | — | new | — |
| Q-REACT-087 | Stale props в memoized child — как воспроизвести? | — | new | — |
| Q-REACT-088 | Concurrent features: startTransition / useDeferredValue — зачем? | — | new | — |
| Q-HTTP-046 | Из чего состоит HTTP request и response? | — | new | — |
| Q-HTTP-047 | Что происходит после ввода URL (DNS, TCP, TLS, request, parse, render)? | 2026-06-25 | weak | DNS only; GET/POST shallow; CORS imprecise |
| Q-HTTP-048 | Preflight CORS: кто шлёт OPTIONS, какие headers нужны? | — | new | — |
| Q-HTTP-072 | Simple vs non-simple request — примеры. | — | new | — |
| Q-HTTP-049 | Cookie attributes: HttpOnly, Secure, SameSite — зачем каждый? | — | new | — |
| Q-HTTP-073 | Cache-Control, ETag — базовая модель кэширования. | — | new | — |
| Q-HTTP-074 | REST: идемпотентность методов, типичные status codes. | — | new | — |
| Q-HTTP-050 | Где настраивается CORS — фронт или бэк? Почему? | — | new | — |
| Q-HTTP-051 | Что такое TTFB, FCP, LCP — одним предложением каждый? | — | new | — |
| Q-SEC-028 | CORS: механизм, Allow-Origin, preflight headers — без путаницы «кто кому». | — | new | — |
| Q-SEC-023 | CSP: default-src, script-src, connect-src, frame-ancestors — что блокируют? | — | new | — |
| Q-SEC-024 | XSS: reflected/stored/DOM — как защищаться на фронте и бэке? | — | new | — |
| Q-SEC-029 | CSRF: механизм, SameSite, double submit cookie. | — | new | — |
| Q-SEC-030 | JWT в localStorage vs HttpOnly cookie — trade-offs. | — | new | — |
| Q-SEC-031 | Clickjacking: X-Frame-Options vs CSP frame-ancestors. | — | new | — |
| Q-SEC-025 | SRI (Subresource Integrity) — когда нужен? | — | new | — |
| Q-SEC-032 | CSP nonce vs hash для inline scripts. | — | new | — |
| Q-SEC-026 | Как connect-src ограничивает fetch/WebSocket? | — | new | — |
| Q-SEC-033 | OWASP Top 10 для фронта — назови 3 релевантных. | — | new | — |
| Q-SEC-027 | Open redirect — что это, как не допустить? | — | new | — |
| Q-SEC-034 | Supply chain attack через npm — базовые меры. | — | new | — |
| Q-WS-001 | Как авторизовать WebSocket из браузера (header/cookie/query/first message)? | — | new | — |
| Q-WS-002 | Можно ли Authorization header в WS handshake из browser? | — | new | — |
| Q-WS-003 | Как обновить токен при активном WS-соединении? | — | new | — |
| Q-WS-004 | WS vs SSE vs long polling — когда что? | — | new | — |
| Q-WS-005 | Как масштабировать WS на несколько инстансов (conceptual)? | — | new | — |
| Q-WS-006 | Безопасность: утечка токена в query string. | — | new | — |
| Q-ARCH-068 | Спроектируй autocomplete/search с debounce и cancel. | — | new | — |
| Q-ARCH-069 | Спроектируй infinite scroll: state, pagination, race conditions. | — | new | — |
| Q-ARCH-070 | FSD: слои, правила импортов, public API слайса. | — | new | — |
| Q-ARCH-051 | Когда FSD overkill? Альтернативы. | — | new | — |
| Q-ARCH-071 | Feature flags / A/B — как на фронте (conceptual). | — | new | — |
| Q-ARCH-072 | Микрофронтенды: Module Federation — плюсы/минусы. | — | new | — |
| Q-ARCH-052 | Как организовать API layer (fetch wrapper, errors, retry)? | — | new | — |
| Q-ARCH-073 | Offline-first / optimistic UI — базовые принципы. | — | new | — |
| Q-BROWSER-038 | Critical Rendering Path: DOM, CSSOM, render tree, layout, paint, composite. | — | new | — |
| Q-BROWSER-036 | Reflow vs repaint — что дороже, как минимизировать? | — | new | — |
| Q-BROWSER-037 | Core Web Vitals: LCP, INP, CLS — как улучшить на фронте? | — | new | — |
| Q-BROWSER-039 | Virtual scrolling — зачем, принцип. | — | new | — |
| Q-BROWSER-040 | Code splitting + lazy routes — impact на загрузку. | — | new | — |
| Q-BROWSER-041 | will-change, transform/opacity для анимаций. | — | new | — |
| Q-BROWSER-042 | Memory leaks на SPA: listeners, intervals, closures — примеры. | — | new | — |
| Q-BROWSER-043 | Lighthouse vs RUM — разница. | — | new | — |
| Q-CSS-079 | Специфичность: посчитать победителя (конфликт селекторов). | — | new | — |
| Q-CSS-080 | Flex vs Grid — критерии выбора для page layout. | — | new | — |
| Q-CSS-063 | position: sticky — почему ломается overflow:hidden у предка? | — | new | — |
| Q-CSS-081 | Центрирование: flex, grid, absolute — 3 способа. | — | new | — |
| Q-CSS-082 | Stacking context и z-index — типичная ловушка. | — | new | — |
| Q-CSS-083 | Container queries vs media queries. | — | new | — |
| Q-TEST-021 | Unit vs integration vs e2e — что когда на фронте. | — | new | — |
| Q-REACT-089 | Как тестировать async fetch (MSW)? | — | new | — |
| Q-REACT-090 | Что мокать, что не мокать? | — | new | — |
| Q-REACT-119 | Snapshot tests — когда полезны, когда вредны. | — | new | — |
| Q-BEHAV-004 | Самая сложная техническая задача: проблема → твоё решение → результат. | — | new | — |
| Q-BEHAV-002 | Конфликт в code review — как решал? | — | new | — |
| Q-BEHAV-005 | Legacy без тестов — стратегия изменений. | — | new | — |
| Q-BEHAV-003 | Как оцениваешь задачу, которая «плывёт»? | — | new | — |
| Q-BEHAV-006 | Пример, когда сознательно выбрал простое решение вместо «красивого». | — | new | — |
| Q-ALGO-LC-004 | Two Sum: массив nums, target — индексы двух чисел с суммой target. | 2026-06-25 | passed | Map O(n) time/space |
| Q-ALGO-LC-005 | Valid Parentheses: строка ()[]{} — валидны ли скобки. | — | new | — |
| Q-ALGO-LC-006 | Longest Substring Without Repeating Characters: длина longest подстроки без повторов. | — | new | — |
| Q-ALGO-LC-007 | Merge Intervals: массив [start,end] — объединить пересекающиеся. | — | new | — |
| Q-ALGO-LC-008 | Maximum Subarray: максимальная сумма непрерывного подмассива. | — | new | — |
| Q-ALGO-LC-009 | Group Anagrams: сгруппировать анаграммы. | — | new | — |
| Q-ALGO-LC-010 | Binary Search: найти target в отсортированном массиве. | — | new | — |
| Q-ALGO-LC-011 | Number of Islands: сетка 1/0 — количество островов (BFS/DFS). | — | new | — |
| Q-ALGO-LC-012 | Reverse Linked List: развернуть односвязный список. | — | new | — |
| Q-ALGO-LC-013 | Climbing Stairs: n ступенек, 1 или 2 за шаг — сколько способов. | — | new | — |
| Q-ALGO-LC-014 | Product of Array Except Self: произведение всех кроме i без деления. | — | new | — |
| Q-ALGO-LC-015 | Top K Frequent Elements: k самых частых элементов. | — | new | — |
| Q-ALGO-LC-016 | Meeting Rooms II: минимум комнат для интервалов. | — | new | — |
| Q-ALGO-LC-021 | Implement debounce / throttle with cancel. | — | new | — |
| Q-ALGO-LC-022 | Flatten nested array — one level / deep, с оценкой сложности. | — | new | — |
| Q-REACT-091 | Почему `setState` в `useEffect` без deps может зациклить рендер? | — | new | — |
| Q-REACT-092 | Чем опасен `useEffect(() => { setCount(c => c + 1) }, [count])`? | — | new | — |
| Q-REACT-093 | Когда `useLayoutEffect` нужен для измерения DOM до paint? | — | new | — |
| Q-REACT-094 | Почему `ref.current` не триггерит ререндер? | — | new | — |
| Q-REACT-095 | Как передать ref через несколько уровней без prop drilling? | — | new | — |
| Q-REACT-096 | Что сломается, если в `memo` child передать inline object `{ a: 1 }`? | — | new | — |
| Q-REACT-097 | Почему `useMemo(() => heavy(arr), [arr])` бесполезен при новом массиве каждый рендер? | — | new | — |
| Q-REACT-098 | Как разделить context на «данные» и «действия», чтобы реже ререндерить? | — | new | — |
| Q-REACT-099 | Когда `useReducer` лучше нескольких `useState` в форме из 10+ полей? | — | new | — |
| Q-REACT-100 | Почему нельзя вызывать хуки внутри `if`? | — | new | — |
| Q-REACT-101 | Что делает `useId` в SSR и зачем для accessibility? | — | new | — |
| Q-REACT-102 | Как `StrictMode` в dev влияет на двойной вызов effects? | — | new | — |
| Q-REACT-103 | Почему список с `key={item.id}` всё равно «мигает» при optimistic update? | — | new | — |
| Q-REACT-104 | Controlled input: что если `value={undefined}`? | — | new | — |
| Q-REACT-105 | Кочему `defaultValue` + `value` одновременно — антипаттерн? | — | new | — |
| Q-REACT-106 | Как Error Boundary не ловит ошибки в event handler? | — | new | — |
| Q-REACT-107 | Почему `setState` в unmounted компоненте — проблема (React 18)? | — | new | — |
| Q-REACT-108 | Что такое hydration mismatch и типичные причины? | — | new | — |
| Q-REACT-109 | Когда `flushSync` уместен и чем опасен? | — | new | — |
| Q-REACT-110 | `useDeferredValue` vs debounce — разница по UX? | — | new | — |
| Q-REACT-111 | `startTransition` — что помечается как низкий приоритет? | — | new | — |
| Q-REACT-112 | Почему `children` как prop может ломать memoization? | — | new | — |
| Q-REACT-113 | Как тестировать custom hook без обёртки компонента? | — | new | — |
| Q-REACT-114 | Чем `forwardRef` отличается от обычного ref prop? | — | new | — |
| Q-REACT-115 | Когда портал не решает проблему z-index? | — | new | — |
| Q-TS-061 | Чем `satisfies` отличается от `as const`? | — | new | — |
| Q-TS-062 | Когда `enum` хуже union литералов? | — | new | — |
| Q-TS-063 | Как типизировать `reduce` с аккумулятором generic? | — | new | — |
| Q-TS-064 | Почему `Record<string, unknown>` не заменяет валидацию API? | — | new | — |
| Q-TS-065 | Как сделать discriminated union из ответа `{ ok: true } \| { ok: false, code }`? | { ok: false, code }`? | — | new |
| Q-TS-066 | Что даёт `asserts value is T` в type guard? | — | new | — |
| Q-TS-067 | Как типизировать event handler с union target? | — | new | — |
| Q-TS-068 | `Parameters<typeof fn>[0]` — практический кейс? | — | new | — |
| Q-TS-069 | `Awaited<ReturnType<typeof fetchData>>` — зачем? | — | new | — |
| Q-TS-070 | Branded type для UserId vs number — пример? | — | new | — |
| Q-TS-071 | Почему `as User` опасен после `JSON.parse`? | — | new | — |
| Q-TS-072 | Как типизировать `useRef<HTMLInputElement \| null>`? | null>`? | — | new |
| Q-TS-073 | `React.ComponentProps<'button'>` — когда использовать? | — | new | — |
| Q-TS-074 | Template literal types для route paths? | — | new | — |
| Q-TS-075 | Чем `interface` удобнее для declaration merging в `.d.ts`? | — | new | — |
| Q-TS-076 | Как типизировать generic `Table<T extends { id: string }>`? | — | new | — |
| Q-TS-077 | `Exclude` vs `Omit` — разница на примере? | — | new | — |
| Q-TS-078 | `NonNullable<T>` — когда нужен? | — | new | — |
| Q-TS-079 | Почему `keyof any` ведёт себя странно? | — | new | — |
| Q-TS-080 | Как сузить `unknown` из `catch (e)`? | — | new | — |
| Q-JS-083 | Что выведет: `[] + {}` и `{} + []`? Почему? | — | new | — |
| Q-JS-084 | Почему `typeof null === 'object'`? | — | new | — |
| Q-JS-085 | Разница `Object.freeze` vs `Object.seal`? | — | new | — |
| Q-JS-086 | Как работает `structuredClone` и что не клонирует? | — | new | — |
| Q-JS-087 | Почему `JSON.parse(JSON.stringify(obj))` ломает Date/Map? | — | new | — |
| Q-JS-088 | Что такое temporal dead zone для `let`? | — | new | — |
| Q-JS-089 | Разница `for...in` vs `for...of` для массива? | — | new | — |
| Q-JS-090 | Почему `arr.sort()` без compare ломает числа? | — | new | — |
| Q-JS-091 | Как `sort((a,b) => a-b)` влияет на stability? | — | new | — |
| Q-JS-092 | Что такое optional chaining с вызовом `obj?.fn?.()`? | — | new | — |
| Q-JS-093 | Nullish coalescing `??` vs `\|\|` — практический пример? | \ | ` — практический пример? | — |
| Q-JS-094 | Почему `async function` всегда возвращает Promise? | — | new | — |
| Q-JS-095 | Что в microtask queue кладёт `queueMicrotask` vs `Promise.resolve()`? | — | new | — |
| Q-JS-096 | Как `AbortSignal.timeout(ms)` работает в fetch? | — | new | — |
| Q-JS-097 | Почему `addEventListener` с `{ once: true }` полезен? | — | new | — |
| Q-JS-098 | Event capture vs bubble — порядок на вложенных div? | — | new | — |
| Q-JS-099 | `stopPropagation` vs `preventDefault`? | — | new | — |
| Q-JS-100 | Почему `delete obj.prop` не всегда удаляет configurable:false? | — | new | — |
| Q-JS-101 | Proxy для валидации объекта — идея? | — | new | — |
| Q-JS-102 | Symbol.toStringTag — зачем? | — | new | — |
| Q-JS-103 | BigInt — когда нужен на фронте? | — | new | — |
| Q-JS-104 | Почему `==` с объектами сравнивает ссылки? | — | new | — |
| Q-JS-105 | Как работает `??=` и `&&=`? | — | new | — |
| Q-JS-106 | Что такое module namespace object? | — | new | — |
| Q-JS-107 | Dynamic `import()` — когда вместо static import? | — | new | — |
| Q-HTTP-052 | Чем 301 отличается от 302 для SEO и кэша? | — | new | — |
| Q-HTTP-053 | Почему 204 No Content без body? | — | new | — |
| Q-HTTP-054 | Что такое 429 и как фронт должен реагировать? | — | new | — |
| Q-HTTP-055 | Retry-After header — как использовать? | — | new | — |
| Q-HTTP-056 | Чем PUT отличается от PATCH на практике API? | — | new | — |
| Q-HTTP-057 | Idempotency-Key — зачем в POST? | — | new | — |
| Q-HTTP-058 | Почему preflight не нужен для GET без custom headers? | — | new | — |
| Q-HTTP-059 | Что блокирует `connect-src` в CSP для WebSocket? | — | new | — |
| Q-HTTP-060 | Разница XSS reflected vs stored — кто исполняет код? | — | new | — |
| Q-HTTP-061 | Почему innerHTML опаснее textContent? | — | new | — |
| Q-HTTP-062 | HttpOnly cookie — видит ли JS? | — | new | — |
| Q-HTTP-063 | SameSite=Lax vs Strict — типичный сценарий? | — | new | — |
| Q-HTTP-064 | Почему JWT в memory лучше localStorage, но сложнее? | — | new | — |
| Q-HTTP-065 | Refresh token rotation — базовая идея? | — | new | — |
| Q-HTTP-066 | Что такое HSTS? | — | new | — |
| Q-HTTP-067 | DNS prefetch vs preconnect? | — | new | — |
| Q-HTTP-068 | Service Worker cache-first vs network-first? | — | new | — |
| Q-HTTP-069 | Почему `document.write` блокирует парсинг? | — | new | — |
| Q-HTTP-070 | Что такое render-blocking CSS? | — | new | — |
| Q-HTTP-071 | Как `defer` и `async` у script влияют на порядок? | — | new | — |
| Q-CSS-064 | Почему `height: 100%` не работает без height у родителя? | — | new | — |
| Q-CSS-065 | `min-height: 100vh` vs `100dvh` на мобилке? | — | new | — |
| Q-CSS-066 | Что ломает `margin collapse`? | — | new | — |
| Q-CSS-067 | Почему flex item не сжимается ниже min-content? | — | new | — |
| Q-CSS-068 | `flex: 1` shorthand — что внутри? | — | new | — |
| Q-CSS-069 | Grid `auto-fit` vs `auto-fill`? | — | new | — |
| Q-CSS-070 | `subgrid` — зачем? | — | new | — |
| Q-CSS-071 | `clamp()` для fluid typography? | — | new | — |
| Q-CSS-072 | `aspect-ratio` без фиксированной высоты? | — | new | — |
| Q-CSS-073 | Почему `transform` не вызывает reflow? | — | new | — |
| Q-CSS-074 | `contain: layout` — когда помогает? | — | new | — |
| Q-CSS-075 | `:is()` и `:where()` — разница для специфичности? | — | new | — |
| Q-CSS-076 | `@layer` в CSS — зачем? | — | new | — |
| Q-CSS-077 | Dark mode через `prefers-color-scheme` vs class? | — | new | — |
| Q-CSS-078 | Почему `z-index` не работает без stacking context? | — | new | — |
| Q-ARCH-053 | Как спроектировать notification center (read/unread, realtime)? | — | new | — |
| Q-ARCH-054 | Как хранить draft формы при уходе со страницы? | — | new | — |
| Q-ARCH-055 | Feature toggle на фронте — риски? | — | new | — |
| Q-ARCH-056 | Как версионировать API на клиенте (v1/v2)? | — | new | — |
| Q-ARCH-057 | Retry с exponential backoff — параметры? | — | new | — |
| Q-ARCH-058 | Circuit breaker на фронте — нужен ли? | — | new | — |
| Q-ARCH-059 | Как организовать error boundary + global toast? | — | new | — |
| Q-ARCH-060 | Pagination cursor vs offset — trade-offs? | — | new | — |
| Q-ARCH-061 | Как кэшировать список в memory vs SWR/React Query? | — | new | — |
| Q-ARCH-062 | Optimistic delete в списке — rollback при ошибке? | — | new | — |
| Q-ARCH-063 | Как разделить UI state и server state? | — | new | — |
| Q-ARCH-064 | Когда Redux избыточен для корзины? | — | new | — |
| Q-ARCH-065 | Как проектировать модалку с focus trap? | — | new | — |
| Q-ARCH-066 | Multi-step wizard state — machine vs useState? | — | new | — |
| Q-ARCH-067 | Как логировать ошибки на клиенте (Sentry) без PII? | — | new | — |
| CR-R01 | Search с гонкой | — | new | — |
| CR-R02 | Список с index key | — | new | — |
| CR-R03 | useEffect с missing deps | — | new | — |
| CR-R04 | Stale interval | — | new | — |
| CR-R05 | Context без мемоизации value | — | new | — |
| CR-R06 | memo бесполезен | — | new | — |
| CR-R07 | Controlled без onChange | — | new | — |
| CR-R08 | Fetch в render | — | new | — |
| CR-R09 | setState после unmount | — | new | — |
| CR-R10 | Двойной state для формы | — | new | — |
| Q-SCEN-ASYNC-001 | Что выведет: sync, 2x microtask, 2x setTimeout(0) — порядок? | — | new | — |
| Q-SCEN-ASYNC-002 | Если microtask создаёт новый microtask бесконечно — что с macrotasks? | — | new | — |
| Q-SCEN-ASYNC-003 | `await Promise.resolve()` — microtask или sync? | — | new | — |
| Q-SCEN-ASYNC-004 | `async function f() { return 1 }` — что возвращает вызов f()? | — | new | — |
| Q-SCEN-ASYNC-005 | Параллельно 5 fetch — как ограничить concurrency до 2? | — | new | — |
| Q-SCEN-ASYNC-006 | Почему `Promise.all` с пустым массивом? | — | new | — |
| Q-SCEN-ASYNC-007 | `allSettled` vs `all` при partial failure в dashboard? | — | new | — |
| Q-SCEN-ASYNC-008 | `race` для timeout fetch — как отменить сам fetch? | — | new | — |
| Q-SCEN-ASYNC-009 | Почему забытый `await` в `if (check())` опасен? | — | new | — |
| Q-SCEN-ASYNC-010 | Unhandled rejection — кто ловит? | — | new | — |
| Q-SCEN-REACT-001 | Два быстрых клика по Submit — двойной POST? | — | new | — |
| Q-SCEN-REACT-002 | `key` сменился с 1 на 2 — remount или update? | — | new | — |
| Q-SCEN-REACT-003 | Parent unmount во время Suspense loading? | — | new | — |
| Q-SCEN-REACT-004 | Context value изменился — кто ререндерится? | — | new | — |
| Q-SCEN-REACT-005 | `useState` initializer `useState(expensive())` — когда вызывается? | — | new | — |
| Q-SCEN-REACT-006 | Два `useEffect` с одним dep — порядок cleanup? | — | new | — |
| Q-SCEN-REACT-007 | `ref` на input + `value` controlled — конфликт? | — | new | — |
| Q-SCEN-REACT-008 | `React.memo` на list item 1000 элементов — всегда ли win? | — | new | — |
| Q-SCEN-REACT-009 | Portal modal в `document.body` — event bubbling куда? | — | new | — |
| Q-SCEN-REACT-010 | StrictMode double mount — почему два fetch в dev? | — | new | — |
| Q-SCEN-NET-001 | CORS ok, но CSP `connect-src 'self'` — что в консоли? | — | new | — |
| Q-SCEN-NET-002 | Cookie Secure без HTTPS на localhost? | — | new | — |
| Q-SCEN-NET-003 | JWT expired во время активной сессии — UX? | — | new | — |
| Q-SCEN-NET-004 | POST form cross-site без CSRF token? | — | new | — |
| Q-SCEN-NET-005 | `target="_blank"` без `rel=noopener` — риск? | — | new | — |
| Q-SCEN-NET-006 | Mixed content: HTTPS page, HTTP image? | — | new | — |
| Q-SCEN-NET-007 | API 401 — refresh ok, retry original request pattern? | — | new | — |
| Q-SCEN-NET-008 | WebSocket reconnect storm — как ограничить? | — | new | — |
| Q-SCEN-NET-009 | Rate limit 429 — exponential backoff на клиенте? | — | new | — |
| Q-SCEN-NET-010 | Preflight failed — кто виноват, фронт или бэк? | — | new | — |
| Q-SCEN-PERF-001 | LCP плохой из-за hero image 4MB — 3 шага фикса? | — | new | — |
| Q-SCEN-PERF-002 | CLS из-за баннера без размеров — fix? | — | new | — |
| Q-SCEN-PERF-003 | INP высокий из-за тяжёлого handler на click? | — | new | — |
| Q-SCEN-PERF-004 | 1000 DOM nodes в таблице — virtual scroll или pagination? | — | new | — |
| Q-SCEN-PERF-005 | Bundle 2MB — как найти виновника? | — | new | — |
| Q-SCEN-PERF-006 | Tree shaking не убрал lodash — почему? | — | new | — |
| Q-SCEN-PERF-007 | HMR работает, prod build падает — куда смотреть? | — | new | — |
| Q-SCEN-PERF-008 | Memory leak: addEventListener без remove — как найти? | — | new | — |
| Q-SCEN-PERF-009 | Long task 300ms в main thread — как разбить? | — | new | — |
| Q-SCEN-PERF-010 | Prefetch route vs lazy route — trade-off? | — | new | — |
| Q-SCEN-ALGO-001 | Two Sum: дубликаты в массиве — можно ли один индекс дважды? | — | new | — |
| Q-SCEN-ALGO-002 | Valid Parentheses: только `(` — false? | — | new | — |
| Q-SCEN-ALGO-003 | Binary search: массив с дубликатами — leftmost index? | — | new | — |
| Q-SCEN-ALGO-004 | Merge intervals: [[1,4],[2,3]] — результат? | — | new | — |
| Q-SCEN-ALGO-005 | Max subarray: все отрицательные — ответ? | — | new | — |
| Q-SCEN-ALGO-006 | BFS: цикл в графе — как не зациклить visited? | — | new | — |
| Q-SCEN-ALGO-007 | DFS на матрице: выход за границу — guard? | — | new | — |
| Q-SCEN-ALGO-008 | Top K frequent: k > unique count? | — | new | — |
| Q-SCEN-ALGO-009 | Product except self: нули в массиве? | — | new | — |
| Q-SCEN-ALGO-010 | Sliding window: пустая строка — длина? | — | new | — |
| Q-SCEN-TRADE-001 | Redux vs Zustand vs Context для theme only? | — | new | — |
| Q-SCEN-TRADE-002 | SSR vs CSR для личного кабинета? | — | new | — |
| Q-SCEN-TRADE-003 | CSS Modules vs Tailwind в большой команде? | — | new | — |
| Q-SCEN-TRADE-004 | E2E vs integration для checkout? | — | new | — |
| Q-SCEN-TRADE-005 | Monorepo vs multirepo для 3 фронтов? | — | new | — |
| Q-SCEN-TRADE-006 | REST vs GraphQL для mobile+web одного API? | — | new | — |
| Q-SCEN-TRADE-007 | Web Worker для PDF parse — когда да? | — | new | — |
| Q-SCEN-TRADE-008 | IndexedDB vs localStorage для offline cart? | — | new | — |
| Q-SCEN-TRADE-009 | SWR vs React Query — критерий выбора? | — | new | — |
| Q-SCEN-TRADE-010 | Feature-based vs layer-based folder structure? | — | new | — |
| Q-PRACT-001 | Реализуй `EventEmitter` с методами `on`, `off`, `emit`, `once`; обработай удаление listener во время `emit`. | — | new | — |
| Q-PRACT-002 | Реализуй `debounce(fn, delay)` с методами `cancel` и `flush`; объясни, где использовать в React. | 2026-07-03 | passed | useDebounce hook: setTimeout+cleanup; App+useEffect |
| Q-PRACT-003 | Реализуй `throttle(fn, delay)` с leading/trailing options и методом `cancel`. | — | new | — |
| Q-PRACT-004 | Напиши `memoize(fn, { maxSize, ttl })` с кэшированием по аргументам и очисткой устаревших значений. | — | new | — |
| Q-PRACT-005 | Реализуй `retry(fn, { retries, delay, backoff })` для async-функции; добавь остановку по `AbortSignal`. | — | new | — |
| Q-PRACT-006 | Реализуй `promisePool(tasks, limit)`: запуск async-задач с ограничением concurrency и сохранением порядка результатов. | — | new | — |
| Q-PRACT-007 | Реализуй `fetchWithTimeout(url, options, timeoutMs)` через `AbortController`. | — | new | — |
| Q-PRACT-008 | Напиши маленький API-клиент с refresh-token retry: при `401` один раз обновить токен и повторить исходный запрос. | — | new | — |
| Q-PRACT-009 | Реализуй in-memory cache для `fetchJson(url)` с дедупликацией одновременных запросов на один URL. | — | new | — |
| Q-PRACT-010 | Реализуй `createStore(initialState)` с `getState`, `setState`, `subscribe`, shallow merge и unsubscribe. | — | new | — |
| Q-PRACT-011 | Напиши `useLocalStorageState(key, initialValue)` с lazy init, сериализацией, обработкой битого JSON и синхронизацией между вкладками. | — | new | — |
| Q-PRACT-012 | Напиши `useDebouncedValue(value, delay)` и покажи, как избежать stale closure. | — | new | — |
| Q-PRACT-013 | Напиши `usePrevious(value)` и пример, где он полезен. | — | new | — |
| Q-PRACT-014 | Напиши `useOnClickOutside(ref, handler)` с корректной подпиской и cleanup. | — | new | — |
| Q-PRACT-015 | Напиши `useIntersectionObserver(ref, options)` для lazy loading / infinite scroll. | — | new | — |
| Q-PRACT-016 | Реализуй React-компонент `Modal` с portal, закрытием по Escape, backdrop click и focus trap на базовом уровне. | — | new | — |
| Q-PRACT-017 | Реализуй `Tabs` компонент с keyboard navigation: ArrowLeft/ArrowRight, Home/End, ARIA roles. | — | new | — |
| Q-PRACT-018 | Реализуй controlled `Autocomplete` с debounce, отменой старого запроса и состояниями loading/error/empty. | — | new | — |
| Q-PRACT-019 | Реализуй `ToastProvider`: очередь уведомлений, auto-dismiss, ручное закрытие, лимит видимых toast. | — | new | — |
| Q-PRACT-020 | Реализуй `VirtualList` для фиксированной высоты строк: расчёт видимого диапазона и spacer elements. | — | new | — |
| Q-PRACT-021 | Напиши форму логина с валидацией полей, disabled submit, отображением server error и защитой от double submit. | — | new | — |
| Q-PRACT-022 | Реализуй upload одного файла с preview, проверкой размера/типа и отменой загрузки через `AbortController`. | — | new | — |
| Q-PRACT-023 | Напиши `serializeQuery(obj)` и `parseQuery(search)` с массивами, boolean/null и encode/decode. | — | new | — |
| Q-PRACT-024 | Реализуй `deepMerge` для plain objects без мутации входных объектов; проговори ограничения. | — | new | — |
| Q-PRACT-025 | Реализуй `classnames(...args)` как в `clsx`: строки, массивы, объекты, falsy values. | — | new | — |
| Q-PRACT-026 | Реализуй `getByPath(obj, path, defaultValue)` и `setByPath(obj, path, value)` без мутации. | — | new | — |
| Q-PRACT-027 | Реализуй маленький `Router` для SPA: `push`, `replace`, обработка `popstate`, подписка на изменение route. | — | new | — |
| Q-PRACT-028 | Реализуй drag-and-drop сортировку списка на уровне состояния: `onDragStart`, `onDragOver`, `onDrop`, сохранение порядка. | — | new | — |
| Q-PRACT-029 | Реализуй `copyToClipboard(text)` с fallback и отображением статуса success/error. | — | new | — |
| Q-PRACT-030 | Дай большой React-компонент с несколькими багами state/effect/memoization и попроси переписать его на более устойчивую структуру. | — | new | — |
