const nums1 = [1, 2, 3];
const nums2 = [2, 4, 6];

var findDifference = function (nums1, nums2) {
	const first = new Set();
	const second = new Set();

	const nums1Set = new Set(nums1);
	const nums2Set = new Set(nums2);

	for (let i = 0; i < nums1.length; i++) {
		if (!nums2Set.has(nums1[i])) {
			first.add(nums1[i]);
		}
	}
	for (let i = 0; i < nums2.length; i++) {
		if (!nums1Set.has(nums2[i])) {
			second.add(nums2[i]);
		}
	}

	return [Array.from(first), Array.from(second)];
};

console.log(findDifference(nums1, nums2));
