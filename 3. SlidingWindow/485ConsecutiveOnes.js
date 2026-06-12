// 2. 485. Max Consecutive Ones (Easy)
// Условие:
// Дан бинарный массив nums. Вернуть максимальное количество подряд идущих единиц.
// Примеры входных данных:

// nums = [1, 1, 1, 0, 1, 1]
// nums = [1, 0, 1, 1, 0, 1]
// nums = [0]nums = [1]
// nums = [1, 1, 1, 1, 1]
// nums = [0, 0, 0, 0]
// nums = [1, 0, 1, 0, 1, 0]
// nums = [1, 1, 0, 1, 1, 1, 0, 1, 1]
// Что вернуть: число (максимальное количество подряд идущих единиц).

const maxConsecutiveOnes = (nums) => {
	let maxCount = 0;
	let left = 0;
	let targetElement = 0;

	for (let right = 0; right < nums.length; right++) {
		if (nums[right] === targetElement) {
			left = right + 1;
		} else {
			maxCount = Math.max(maxCount, right - left + 1);
		}
	}

	console.log(maxCount);
};

maxConsecutiveOnes([1, 1, 0, 1, 1, 1, 0, 1, 1]);
