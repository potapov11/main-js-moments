const nums = [1, 3, 5, 4, 7];

var findLengthOfLCIS = function (nums) {
	let currentLength = 1;
	let maxlength = 1;

	for (let i = 1; i < nums.length; i++) {
		if (nums[i] > nums[i - 1]) {
			currentLength += 1;
			maxlength = Math.max(currentLength, maxlength);
		} else {
			currentLength = 1;
		}
	}

	console.log(maxlength);
};

findLengthOfLCIS(nums);
