// Задача 10. «Повторный запрос с таймаутом» (Retry + Timeout)
// Дана асинхронная функция fetchData(url),
// которая возвращает промис с данными или может упасть с ошибкой.

// Нужно реализовать функцию fetchWithRetry(url, maxRetries, timeout), которая:

// Пытается выполнить fetchData(url).

// Если запрос упал или не успел выполниться за timeout мс — 
// делает повторную попытку (до maxRetries раз).

// Если после всех попыток ни одна не удалась — возвращает ошибку.

// Примерная структура:

// Требования:

// Используй промисы, setTimeout, рекурсию или цикл.

// Таймаут должен срабатывать для каждой попытки.

// Если fetchData упала или таймаут сработал — это считается неудачной попыткой.

// Промис должен завершиться с ошибкой после исчерпания всех попыток.

async function fetchData(url) {
  //return promise or error
}

function fetchWithTimeOut(url, timeout = 1000) {
  const dataPromise = fetchData(url);

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error('timeout error')),
      // () => reject('timeout error'),
    timeout)
  })

  return Promise.race([dataPromise, timeoutPromise])
}

async function fetchWithRetry(url, maxRetries, timeout) {
  let lastError = null;

  for(let attempt = 0; attempt < maxRetries; attempt += 1) {
    try{
        let result = await fetchWithTimeOut(url, timeout);
        return result;
      } catch(e) {
        lastError = e;
    }
  }

  throw lastError;
}

