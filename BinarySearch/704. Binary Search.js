const arr = [-1, 0, 3, 5, 9, 12];
const target = 9;

var search = function (nums, target) {
	let start = 0;
	let end = nums.length - 1;

	while (start <= end) {
		let middle = Math.floor((start + end) / 2);

		if (nums[middle] === target) {
			return middle;
		}

		if (target > nums[middle]) {
			start = middle + 1;
		}

		if (target < nums[middle]) {
			end = middle - 1;
		}
	}

	return -1;
};

console.log(search(arr, target));
