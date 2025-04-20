function throttle(func, limit) {
	//здесь будет лежать последняя вызванная функция
	let lastFunc = null;
	//здесь будет лежать последний вызванный флаг
	let lastRanTime = null;

	return function () {
		const context = this;
		const args = arguments;

		if (!lastRanTime) {
			lastRanTime = Date.now();
			return func.apply(context, args);
		} else {
			clearTimeout(lastFunc);

			lastFunc = setTimeout(function () {
				if (Date.now() - lastRanTime > limit) {
					lastRanTime = Date.now();
					return func.apply(context, args);
				}
			}, limit - (Date.now() - lastRanTime));
		}
	};
}

console.log('hello');

const logScroll = throttle(() => {
	console.log('Прокрутка страницы!');
}, 10000);

window.addEventListener('resize', logScroll);
