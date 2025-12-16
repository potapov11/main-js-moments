// Example 1:

const s = 'A man, a plan, a canal: Panama';
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.
// Example 2:

// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.
// Example 3:

// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.

/**
 * @param {string} s
 * @return {boolean}
 */

// "A man, a plan, a canal: Panama"
var isPalindrome = function (s) {
	let start = 0;
	let end = s.length - 1;

	function isLetter(letter) {
		return letter.toLowerCase() !== letter.toUpperCase() || (letter >= '0' && letter <= '9');
	}

	while (start < end) {
		while (start < end && !isLetter(s[start])) {
			start++;
		}

		while (end > start && !isLetter(s[end])) {
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
