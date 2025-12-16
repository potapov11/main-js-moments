const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const nums2 = [0, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

var removeDuplicates = function (nums) {
	let start = 0;

	for (let end = 1; end < nums.length; end++) {
		if (nums[start] !== nums[end]) {
			start++;
			nums[start] = nums[end];
		}
	}

	return start + 1;
};

console.log(removeDuplicates(nums));
