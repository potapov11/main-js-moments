// "Создайте функцию memoize, которая принимает другую функцию и возвращает её мемоизированную версию. Мемоизация кэширует результаты вызовов на основе аргументов, чтобы при повторном вызове с теми же аргументами результат брался из кэша, а не вычислялся заново. Учтите, что аргументами могут быть не только примитивы, но и объекты. Как будете сравнивать аргументы?"

const slowFunction = (num) => {
	return num * 2;
};

function memoize(fn) {
	const cachedMap = new Map();

	return function (...args) {
		const key = JSON.stringify(args);
		if (cachedMap.has(key)) {
			console.log('из кеша');
			return cachedMap.get(key);
		} else {
			const result = fn(...args);
			cachedMap.set(key, result);
			return result;
		}
	};
}

const cachedFunction = memoize(slowFunction);
console.log(cachedFunction(5)); // вычисляет
console.log(cachedFunction(5)); // берет из кэша
console.log(cachedFunction(10)); // вычисляет
