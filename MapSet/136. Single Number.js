const nums = [4, 1, 2, 1, 2];

var singleNumber = function (nums) {
	const numsMap = new Map();

	for (let num of nums) {
		if (!numsMap.has(num)) {
			numsMap.set(num, 1);
		} else {
			numsMap.set(num, numsMap.get(num) + 1);
		}
	}

	for (let [key, value] of numsMap) {
		if (value === 1) {
			return key;
		}
	}
};

console.log(singleNumber(nums));
