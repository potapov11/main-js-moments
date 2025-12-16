const digits = [9, 1, 0];

var plusOne = function (digits) {
	digits[digits.length - 1] = digits[digits.length - 1] + 1;
	let str = String(digits);
	str = str.split('');
	const filteredStr = str.filter((item) => item !== ',').map((item) => parseInt(item, 10));

	return filteredStr;
};

console.log(plusOne(digits));
