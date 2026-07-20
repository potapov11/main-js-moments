/**
 * FetchWithTimeout.js
 * Две задачи: (A) минимальный вариант → (B) полный с внешним signal.
 * У каждой: условие → ответ → разбор.
 */

// =============================================================================
// ЗАДАЧА A — МИНИМУМ (Junior+ / нижний Middle)
// =============================================================================
//
// УСЛОВИЕ
// -------
 // Реализуй fetchWithTimeoutMin(url, options?, timeoutMs):
 //
 // 1. Запусти fetch с AbortController (signal в fetch).
 // 2. Через timeoutMs вызови controller.abort().
 // 3. Если fetch успел раньше — clearTimeout и верни Response.
 // 4. При abort не глотай ошибку: fetch сам reject'ит AbortError.
 //
 // Внешний options.signal МОЖНО ИГНОРИРОВАТЬ (перезаписываем своим signal).
 // Этого хватает на большинстве собесов как «таймаут для fetch».
 //
 // Примеры:
 //   await fetchWithTimeoutMin('/api', {}, 1000)
 //   // ответ < 1s → Response
 //   // дольше 1s → reject AbortError
 //
 // ---------------------------------------------------------------------------
 // ОТВЕТ (минимум)
 // ---------------------------------------------------------------------------

async function fetchWithTimeoutMin(url, options = {}, timeoutMs = 1000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

// ---------------------------------------------------------------------------
 // РАЗБОР (минимум)
 // ---------------------------------------------------------------------------
 //
 // Одна фраза: «Запусти fetch. Не успел за N мс — отмени. Успел — выключи таймер.»
 //
 // AbortController  = пульт: abort() → fetch останавливается.
 // setTimeout       = будильник: через N мс нажать abort.
 // clearTimeout     = выключить будильник, если ответ уже пришёл (или запрос упал).
 //
 // Почему не обязательно Promise.race:
 // race говорит «кто первый», но сам по себе не останавливает fetch.
 // abort() — реальное «стоп» на уровне запроса.
 //
 // Почему finally:
 // таймер гасим всегда — и при успехе, и при AbortError / сети — иначе
 // setTimeout может стрельнуть позже впустую.
 //
 // Сценарии:
 // A. Быстрый ответ: await вернул Response → finally → clearTimeout → abort не нужен.
 // B. Медленный: timeout → abort() → fetch reject AbortError → finally → clearTimeout.
 //
 // Ограничение минимума:
 // если в options уже был signal (React cleanup / отмена снаружи), мы его
 // перезаписываем своим. Для учёбы и большинства задач — ок. Для продакшена
 // API-клиента — смотри задачу B.
 //

// =============================================================================
 // ЗАДАЧА B — ПОЛНЫЙ ВАРИАНТ (Middle)
 // =============================================================================
 //
 // УСЛОВИЕ
 // -------
 // Реализуй fetchWithTimeoutFull(url, options?, timeoutMs):
 //
 // Всё из задачи A, плюс:
 //
 // 5. Если в options уже есть signal (внешний):
 //    - отмена снаружи ИЛИ таймаут должны прервать запрос;
 //    - если externalSignal уже aborted к старту — сразу abort нашего controller.
 //
 // В fetch уходит ОДИН signal — нашего controller.
 // Внешний signal «подписан» на наш abort (не прокидываем два signal в fetch —
 // у fetch один signal).
 //
 // ---------------------------------------------------------------------------
 // ОТВЕТ (полный)
 // ---------------------------------------------------------------------------

async function fetchWithTimeoutFull(url, options = {}, timeoutMs = 1000) {
  const controller = new AbortController();
  const { signal: externalSignal, ...rest } = options;

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort(externalSignal.reason);
    } else {
      externalSignal.addEventListener(
        'abort',
        () => controller.abort(externalSignal.reason),
        { once: true },
      );
    }
  }

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, { ...rest, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

// ---------------------------------------------------------------------------
 // РАЗБОР (полный)
 // ---------------------------------------------------------------------------
 //
 // Зачем это нужно:
 // В React useEffect cleanup часто делают controller.abort().
 // Если хелпер просто сделает { ...options, signal: свой }, чужой signal
 // пропадёт — unmount не отменит запрос. Полный вариант это чинит.
 //
 // Схема:
 //   externalSignal ──abort──► наш controller.abort()
 //   setTimeout     ──abort──► наш controller.abort()
 //                                    │
 //                                    ▼
 //                          fetch(..., { signal: наш })
 //
 // Один «пульт» у fetch, два триггера (таймаут и снаружи).
 //
 // Уже aborted до старта:
 //   if (externalSignal.aborted) controller.abort(...) —
 //   иначе fetch мог бы стартовать, хотя отмена уже была.
 //
 // { once: true } на addEventListener — подписка одноразовая, без утечек.
 //
 // reason пробрасываем — чтобы снаружи и у нас была одна причина отмены.
 //
 // Порядок изучения:
 // 1) Задача A до автоматизма.
 // 2) Потом B — только когда A пишешь не глядя.
 //

// =============================================================================
 // ДЕМО (раскомментируй нужное)
 // =============================================================================
 // delay/2 ≈ ~2с; timeout 500 → ожидаем AbortError

async function demoMin() {
  try {
    const res = await fetchWithTimeoutMin('https://httpbin.org/delay/2', {}, 500);
    console.log('min ok', res.status);
  } catch (e) {
    console.log('min error:', e?.name, e);
  }
}

async function demoFull() {
  try {
    const res = await fetchWithTimeoutFull('https://httpbin.org/delay/2', {}, 500);
    console.log('full ok', res.status);
  } catch (e) {
    console.log('full error:', e?.name, e);
  }
}

 // demoMin();
 // demoFull();

export { fetchWithTimeoutMin, fetchWithTimeoutFull };
