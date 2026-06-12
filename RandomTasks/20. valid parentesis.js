/**
 * @param {string} s
 * @return {boolean}
 */

const s = '()[]{}';
var isValid = function (s) {
	const bracketObj = {
		')': '(',
		']': '[',
		'}': '{',
	};

	const stackBracket = [];

	for (let char of s) {
		if (char === '(' || char === '{' || char === '[') {
			stackBracket.push(char);
		} else {
			const last = stackBracket.pop();
			if (bracketObj[char] !== last) {
				return false;
			}
		}
	}

	console.log(stackBracket);

	return stackBracket.length === 0;
};

console.log(isValid(s));
