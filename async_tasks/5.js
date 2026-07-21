// Задача: Реализовать функцию retry с экспоненциальной задержкой.
// Документация: docs/articles/async-tasks/retry-exponential-backoff.md

function wait(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry(fn, attempts, baseDelay) {
	let lastError;

	for (let attempt = 0; attempt < attempts; attempt++) {
		try {
			return await fn();
		} catch (e) {
			lastError = e;
			const isLast = attempt === attempts - 1;
			if (isLast) break;

			await wait(baseDelay * 2 ** attempt);
		}
	}

	throw lastError;
}
