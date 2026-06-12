const n = 19;

var isHappy = function (n) {
	function toPow(n) {
		const strNumber = String(n).split('');
		const toSquaredNum = strNumber.reduce((acc, item) => {
			return acc + Number(item) ** 2;
		}, 0);

		return toSquaredNum;
	}

	const numbers = new Set();

	let current = n;

	while (true) {
		const res = toPow(current);

		if (res === 1) return true;
		if (numbers.has(res)) return false;

		numbers.add(res);
		current = res;
	}
};

console.log(isHappy(n));
