const nums = [2, 7, 11, 15];
const target = 9;

var twoSum = function (numbers, target) {
	let start = 0;
	let end = numbers.length - 1;

	while (start < end) {
		if (numbers[end] + numbers[start] > target) {
			end--;
		} else if (numbers[end] + numbers[start] < target) {
			start++;
		} else {
			return [start + 1, end + 1];
		}
	}
};

console.log(twoSum(nums, target));
