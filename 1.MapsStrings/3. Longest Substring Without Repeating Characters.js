/**
 * @param {string} s
 * @return {number}
 */

// Example 1:

// Input: s = "abc abc bb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

let s = 'aab';

var lengthOfLongestSubstring = function (s) {
	let maxCount = 0;
	let maxSubString = '';

	for (let i = 0; i < s.length; i++) {
		let currentIndex = maxSubString.indexOf(s[i]);

		if (currentIndex !== -1) {
			console.log('here');
			maxSubString = maxSubString.slice(currentIndex + 1);
		}

		maxSubString += s[i];
		maxCount = Math.max(maxCount, maxSubString.length);
	}

	return maxCount;
};

console.log(lengthOfLongestSubstring(s));
