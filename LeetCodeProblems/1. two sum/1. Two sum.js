const nums = [2, 7, 11, 15];
const target = 18;

var twoSum = function (nums, target) {
	for (let i = 0; i < nums.length; i++) {
		for (let k = i + 1; k < nums.length; k++) {
			if (nums[i] + nums[k] === target) {
				return [i, k];
			}
		}
	}
};

console.log(twoSum(nums, target));
