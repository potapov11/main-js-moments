function debounce(fn, delay) {
	// Объявляем функцию debounce, принимающую функцию fn и задержку delay
	let timeout; // Инициализируем переменную timeout для хранения идентификатора таймера

	return (...args) => {
		// Возвращаем анонимную стрелочную функцию, принимающую любое количество аргументов
		clearTimeout(timeout); // Очищаем предыдущий таймер, если он существует, чтобы предотвратить преждевременный вызов fn
		// Устанавливаем новый таймер, который вызовет функцию fn с переданными аргументами через delay миллисекунд
		timeout = setTimeout(() => fn(...args), delay);
	};
}

const search = debounce((value) => {
	console.log('Запрос на сервер:', value);
}, 500);

input.addEventListener('input', (e) => search(e.target.value));
