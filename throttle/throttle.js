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

function throttleMini(func, delay) {
	let lastCall = 0;

	return function (...args) {
		const now = new Date().getTime();

		if (now - lastCall >= delay) {
			lastCall = now;
			return func.apply(this, args);
		}
	};
}

const logScroll = throttleMini(() => {
	console.log('Прокрутка страницы throttle mini!');
}, 0);

window.addEventListener('resize', logScroll);
