const s = 'abbaca';
var removeDuplicates = function (string) {
	const stack = [];

	for (const letter of string) {
		if (stack.length && stack[stack.length - 1] === letter) {
			stack.pop();
		} else {
			stack.push(letter);
		}
	}

	return stack.join('');
};

removeDuplicates(s);

const globalObj = {
	a: 'randomString',
	b: 123,
	c: {
		name: 'John',
		getParent: function () {
			// Обычная функция, которая имеет доступ к this
			return () => this; // Стрелочная функция наследует this от внешней функции
		},
	},
};

const parent = globalObj.c.getParent();
console.log(parent);
