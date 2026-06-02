const s = 'abbaca';
const s2 = 'aababaab';

var removeDuplicates = function (string) {
	if (string.length === 1) return string;

	const stack = [];

	for (let char of string) {
		stack[stack.length - 1] === char ? stack.pop() : stack.push(char);
	}

	return stack.join('');
};

console.log(removeDuplicates(s2));
