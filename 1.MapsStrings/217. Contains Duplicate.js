const nums = [1, 2, 3, 1];

var containsDuplicate = function (nums) {
	let arr = new Set();

	for (let i = 0; i < nums.length; i++) {
		if (!arr.has(nums[i])) {
			arr.add(nums[i]);
		} else {
			return true;
		}
	}

	return false;
};

console.log(containsDuplicate(nums));
