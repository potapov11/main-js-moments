const s = '(()())(())';
// Output: "()()()"
// Output: "121210 1210"

var removeOuterParentheses = function (brackets) {
	let depth = 0;
	let stack = [];

	for (const bracket of brackets) {
		if (bracket === '(') {
			if (depth > 0) {
				stack.push(bracket);
			}
			depth += 1;
		} else {
			depth -= 1;
			if (depth > 0) {
				stack.push(bracket);
			}
		}
	}

	console.log(stack.join(), 'stack');
};

removeOuterParentheses(s);
