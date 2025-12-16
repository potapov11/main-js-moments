var majorityElement = function (nums) {
	let candidate = null;
	let count = 0;

	// Алгоритм Бойера-Мура для нахождения кандидата
	for (let num of nums) {
		if (count === 0) {
			candidate = num;
			count = 1;
		} else if (num === candidate) {
			count++;
		} else {
			count--;
		}
	}
	return candidate;
};

console.log(majorityElement([3, 3, 4]));
