var isPerfectSquare = function (num) {
	let start = 1;
	let end = num;

	while (start <= end) {
		let middle = Math.floor((start + end) / 2);
		const squaredNum = middle * middle;

		if (squaredNum === num) {
			return true;
		}

		if (squaredNum > num) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
	}

	return false;
};
