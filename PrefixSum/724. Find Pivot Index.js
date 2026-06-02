const nums = [1, 7, 3, 6, 5, 6];

var pivotIndex = function (nums) {
	const allSumArray = nums.reduce((acc, item) => {
		return item + acc;
	}, 0);

	let sumLeft = 0;

	for (let i = 0; i < nums.length; i++) {
		const sumRight = allSumArray - sumLeft - nums[i];

		if (sumLeft === sumRight) {
			return i;
		}

		sumLeft += nums[i];
	}

	return -1;
};

console.log(pivotIndex(nums));
