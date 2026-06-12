/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

const nums1 = [4, 1, 2];
const nums2 = [1, 3, 4, 2];

var nextGreaterElement = function (nums1, nums2) {
	const result = [];

	for (let i = 0; i < nums1.length; i++) {
		const currentElement = nums1[i];
		const indexOfCurrent = nums2.indexOf(currentElement);
		const splicedArray = [...nums2].splice(indexOfCurrent + 1);

		let found = false;

		for (let k = 0; k < splicedArray.length; k++) {
			const currentInnerElement = splicedArray[k];
			if (currentInnerElement > currentElement) {
				result.push(currentInnerElement);
				found = true;
				break;
			}
		}

		if (!found) {
			result.push(-1);
		}
	}

	return result;
};

// nextGreaterElement(nums1, nums2);

var nextGreaterElement = function (nums1, nums2) {
	const nextGreaterMap = new Map();
	const stack = [];

	//nums1 = [4,1,2], nums2 = [1,3,4,2]
	for (const num of nums2) {
		if (stack.length > 0 && stack[stack.length - 1] < num) {
			nextGreaterMap.set(stack.pop(), num);
		}
		stack.push(num);
	}

	//проходим по nums, берем элемент и пушим его в стэк

	//1. stack = [1]; nextGreaterMap = {}
	//2. stack = [1]; nextGreaterMap = {1: 3} , stack = [3];
	//3. stack = [3], nextGreaterMap = {1: 3, 3: 4}, stack = [4]
	//4. stack = [4], nextGreaterMap = {1: 3, 3: 4}, stack = [2]
	console.log(nextGreaterMap, 'nextGreaterMap');
	while (stack.length > 0) {
		nextGreaterMap.set(stack.pop(), -1);
	}

	console.log(nextGreaterMap, 'nextGreaterMap after');

	console.log(nums1.map((num) => nextGreaterMap.get(num)));
	//nums1 = [4,1,2], nums2 = [1,3,4,2]
};

nextGreaterElement(nums1, nums2);
