// Задача 2. «Обработка пачки запросов с задержкой»
// Напиши функцию fetchWithDelay(urls, delay), которая принимает массив URL-адресов и задержку в миллисекундах.

// Функция должна последовательно выполнять запросы по очереди, с задержкой delay между ними, и возвращать массив результатов в том же порядке, что и URL. Если один запрос падает — вся операция останавливается и возвращает ошибку.

// Пример вызова:

// javascript
const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2', 'https://jsonplaceholder.typicode.com/posts/3'];

async function fetchWithDelay(urls, delay) {
	const result = [];

	async function request(url) {
		try {
			const res = await fetch(url);

			if (!res.ok) throw new Error('fail');
			const data = await res.json();
			result.push(data);
		} catch (e) {
			throw new Error(e, 'error');
		}
	}

	function wait(ms) {
		return new Promise((resolve, reject) => {
			if (ms >= 5000) {
				reject(new Error('Слишком большая задержка'));
			} else {
				setTimeout(resolve, ms);
			}
		});
	}

	try {
		for (const url of urls) {
			await request(url);
			await wait(delay);
		}

		return result;
	} catch (e) {
		throw new Error(e);
	}
}

fetchWithDelay(urls, 1000)
	.then((results) => console.log(results))
	.catch((err) => console.error('❌ Ошибка:', err.message));
