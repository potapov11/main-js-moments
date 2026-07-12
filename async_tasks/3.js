// Задача: «Гонка с запасным вариантом» (Race with Fallback)
// Напиши функцию raceWithFallback(promise1, promise2, ms), которая принимает:

// promise1 — основной промис
// promise2 — запасной промис
// ms — время в миллисекундах

// Функция должна вернуть новый промис, который ведёт себя так:
// Если promise1 успевает выполниться за ms миллисекунд — возвращается его результат.
// Если promise1 не успевает за ms миллисекунд —
// возвращается результат promise2 (независимо от того, сколько он выполняется).

// Пример
// javascript
const fast = new Promise((resolve) => setTimeout(resolve, 100, 'Быстрый'));
const slow = new Promise((resolve) => setTimeout(resolve, 500, 'Медленный'));

function raceWithFallback(promise1, promise2, ms) {
	const timeoutPromise = new Promise((resolve) => {
		setTimeout(() => {
			promise2.then(resolve);
		}, ms);
	});

	return Promise.race([promise1, timeoutPromise]);
}

raceWithFallback(fast, slow, 200).then((result) => console.log(result)); // 'Быстрый' (fast успел за 200 мс)
raceWithFallback(slow, fast, 600).then((result) => console.log(result)); // 'Быстрый' (slow не успел за 200 мс, вернулся fast)
