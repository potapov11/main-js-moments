const numberFirst = 121;
const numberSecond = -121;

var isPalindrome = function (x) {
	const reversedNum = String(x).split('').reverse().join('');

	return Number(reversedNum) === x;
};

console.log(isPalindrome(numberFirst));
console.log(isPalindrome(numberSecond));
