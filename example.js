const nums = [1, 1, 2, 2, 3, 4, 4, 5];

function moveDuplicates(nums) {
	let start = 0;

	for (let end = 1; end < nums.length; end++) {
		if (nums[start] !== nums[end]) {
			start++;
			nums[start] = nums[end];
			console.log(nums);
		}
	}

	return start + 1;
}

console.log(moveDuplicates(nums));
