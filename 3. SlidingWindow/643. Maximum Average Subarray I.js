// 2. Maximum Average Subarray I (LeetCode 643)
// Условие:
// Дан массив nums и число k.
// Найти подмассив длины k с максимальным средним значением и вернуть это среднее.
// Примеры входных данных:

// nums = [1, 12, -5, -6, 50, 3], k = 4
// nums = [5], k = 1
// nums = [-1], k = 1
// nums = [0, 1, 1, 3, 3], k = 4
// nums = [1, 2, 3, 4, 5], k = 3

const maxAverageSubArray = (nums, k) => {
	if (k > nums.length) {
		const sum = nums.reduce((acc, num) => {
			return acc + num;
		}, 0);

		return sum / 4;
	}

	let maxSumAverage = 0;

	for (let i = 0; i < k; i++) {
		maxSumAverage += nums[i];
	}

	let maxSum = maxSumAverage;

	for (let i = k; i < nums.length; i++) {
		maxSum = maxSum + nums[i];
		maxSum = maxSum - nums[i - k];

		maxSumAverage = Math.max(maxSumAverage, maxSum);
	}

	return maxSumAverage / k; // исправить: k вместо 4
};

console.log(maxAverageSubArray([1, 12, -5, -6, 50, 3], 4));
console.log(maxAverageSubArray([5], 4));
console.log(maxAverageSubArray([-1], 4));
console.log(maxAverageSubArray([0, 1, 1, 3, 3], 4));
