const s = 'A man, a plan, a canal: Panama';

var isPalindrome = function (s) {
	let start = 0;
	let end = s.length - 1;

	function checkIsLetter(letter) {
		if (letter.toLowerCase() !== letter.toUpperCase() || (letter >= '0' && letter <= '9')) {
			return true;
		}
	}

	while (start < end) {
		while (!checkIsLetter(s[start]) && start < end) {
			start++;
		}

		while (!checkIsLetter(s[end]) && end > start) {
			end--;
		}

		if (s[start].toLowerCase() !== s[end].toLowerCase()) {
			return false;
		}

		start++;
		end--;
	}

	return true;
};

console.log(isPalindrome(s));
