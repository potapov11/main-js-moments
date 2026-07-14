# Interview feedback — 14.07.2026

Сессия: #03 узкий блок async/Promise (Junior → Middle).

---

### Q-JS-026 | — | passed
- **Тема:** async/await под капотом
- **Сильное:** сахар над Promise; return→fulfill / throw→reject; await ждёт, reject→catch
- **Пробел:** microtask-продолжение не назвал (мелочь)
- **Coverage:** passed

### Q-JS-025 | — | passed
- **Тема:** all / allSettled / race / any
- **Сильное:** all с первого раза; race после дожима (settle с reject)
- **Пробел:** allSettled shape и any — с подсказкой
- **Coverage:** passed

### Q-TS-007 | — | passed
- **Тема:** any / unknown / never
- **Сильное:** any vs unknown+guards; never при throw без return
- **Пробел:** exhaustiveness в switch не трогали
- **Coverage:** passed

### Q-REACT-006 | — | passed
- **Тема:** keys vs index
- **Сильное:** stable id; при delete+index — съехавший state в inputs
- **Пробел:** —
- **Coverage:** passed

### Q-HTTP-010 | — | passed
- **Тема:** XSS
- **Сильное:** после дожима: browser, cookies/storage, JSX escape, dangerouslySetInnerHTML
- **Пробел:** sanitize/CSP не раскрыл сам
- **Coverage:** passed

### Q-HTTP-008 | — | weak
- **Тема:** CORS / preflight
- **Сильное:** cross-origin + Allow-Origin идея; OPTIONS после подсказки
- **Пробел:** цель preflight / simple request детали; restatement skip
- **Coverage:** weak

### CR-R01 | — | passed
- **Тема:** Search race in useEffect
- **Сильное:** после дожима race+abort/flag; .catch; debounce как UX
- **Пробел:** сам сначала не назвал race
- **Coverage:** passed

### Q-SCEN-TRADE-001 | — | passed
- **Тема:** Redux vs Zustand vs Context для theme
- **Сильное:** Context; Redux overkill для одной theme
- **Пробел:** Zustand как лёгкая альтернатива не назвал
- **Coverage:** passed

### Q-SCEN-ASYNC-008 | — | passed
- **Тема:** race timeout + отмена fetch
- **Сильное:** после дожима: signal + abort() на таймере; race сам не стопает
- **Пробел:** сначала думал отменить нельзя
- **Coverage:** passed

### Q-JS-035 | — | passed
- **Тема:** AbortController
- **Сильное:** abort → reject; AbortError после подсказки
- **Пробел:** имя ошибки сам не вспомнил
- **Coverage:** passed

### Q-PRACT-007 | — | weak
- **Тема:** fetchWithTimeout + AbortController
- **Сильное:** —
- **Пробел:** незачёт по запросу кандидата — задачу самостоятельно не закрыл
- **Coverage:** weak → повторить wiring timeout + abort

---

## Итог сессии | —
- **Блок:** 10 вопросов (узкий async-focused) + practical Q-PRACT-007
- **Уровень:** Junior+ / тянет к Middle на async+React базе; HTTP/CORS ещё дыры
- **Закрыто:** Q-JS-026, Q-JS-025, Q-TS-007, Q-REACT-006, Q-HTTP-010, CR-R01, Q-SCEN-TRADE-001, Q-SCEN-ASYNC-008, Q-JS-035 (passed); Q-HTTP-008, Q-PRACT-007 (weak)
- **На повтор:** CORS; AbortError; Promise.any; fetchWithTimeout своими руками


