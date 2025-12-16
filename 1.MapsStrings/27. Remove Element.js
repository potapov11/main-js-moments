const nums = [0, 1, 2, 2, 3, 0, 4, 2];

var removeElement = function (nums, val) {
	let start = 0;

	for (let i = 0; i < nums.length; i++) {
		if (nums[i] !== val) {
			nums[start] = nums[i];
			start++;
		}
	}

	return nums;
};

console.log(removeElement(nums, 2));
