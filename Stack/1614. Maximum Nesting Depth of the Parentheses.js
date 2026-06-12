const bracketsString = '()(())((()()))';

var maxDepth = function (s) {
	let maxDepth = 0;
	let currentValue = 0;

	for (let char of s) {
		if (char === '(') {
			currentValue += 1;
		} else if (char === ')') {
			currentValue -= 1;
		}

		maxDepth = Math.max(maxDepth, currentValue);
	}

	return maxDepth;
};

maxDepth(bracketsString);
