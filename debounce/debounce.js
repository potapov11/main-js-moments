function debounce(fn, delay) {
	let timerId = null;

	const debounced = function (...args) {
		const context = this;

		clearTimeout(timerId);

		timerId = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};

	debounced.cancel = function () {
		console.log('отмена');
		clearTimeout(timerId);
		timerId = null;
	};

	return debounced;
}

function consoleLog(arg) {
	console.log(arg, 'вызов arg');
}

const debouncedConsole = debounce(consoleLog, 10000);
debouncedConsole('Привет1');
setTimeout(() => {
	debouncedConsole.cancel(); // через 5 сек — таймер ещё не сработал (10 сек), вызов отменится
}, 5000);
