const nums = [0, 1, 0, 3, 12];

var moveZeroes = function (nums) {
	let start = 0;
	let end = nums.length - 1;

	while (start < end) {
		while (nums[start] !== 0 && start < end) {
			start++;
		}
		console.log(start);

		if (nums[start] === 0) {
			[nums[start], nums[end]] = [nums[end], nums[start]];
			start++;
			end--;
		}
	}

	console.log(nums, 'nums');
};

moveZeroes(nums);
