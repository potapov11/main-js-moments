const brackets = ['(', ')', '[', ']', '{', '}'];

var isValid = function (brackets) {
	const stack = [];

	const obj = {
		')': '(',
		'}': '{',
		']': '{',
	};

	const condition = (b) => {
		return b === '(' || b === '{' || b === '[';
	};

	for (let bracket of brackets) {
		if (condition(bracket)) {
			stack.push(bracket);
		} else {
      if
    }

	}
};
