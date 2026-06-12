const input = '1212#';
const output = 'abl';

const decodeStr = (input) => {
	function getChar(num) {
		const base = 'a'.charCodeAt(0);
		const code = base + (num - 1);
		const char = String.fromCharCode(code);
		return char;
	}

	let currentString = '';

	for (let i = input.length - 1; i >= 0; i--) {
		if (input[i] === '#') {
			const currentChar = input[i - 2] + input[i - 1];
			currentString = getChar(currentChar) + currentString;
			i -= 2;
		} else {
			currentString = getChar(input[i]) + currentString;
		}
	}

	return currentString;
};

console.log(decodeStr(input));
