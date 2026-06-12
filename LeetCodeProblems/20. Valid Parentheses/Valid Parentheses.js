var isValid = function (s) {
	const pairs = {
		')': '(',
		']': '[',
		'}': '{',
	};

	const array = [];

	for (let char of s) {
		if (char === '(' || char === '{' || char === '[') {
			array.push(char);
		} else {
			const last = array.pop();
			console.log(last);

			if (pairs[char] !== last) return false;
		}
	}

	return array.length === 0;
};

console.log(isValid('()[]{}'));
