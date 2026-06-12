//Leetcode 242 Valid anagram
const s = 'anagram';
t = 'nagaram';

var isAnagram = function (s, t) {
	if (s.length !== t.length) return false;

	const charMap = new Map();

	for (let char of s) {
		if (!charMap.has(char)) {
			charMap.set(char, 1);
		} else {
			charMap.set(char, charMap.get(char) + 1);
		}
	}

	for (let charT of t) {
		if (charMap.has(charT)) {
			charMap.set(charT, charMap.get(charT) - 1);
		}
	}

	for (let count of charMap.values()) {
		if (count !== 0) return false;
	}

	return true;
};

console.log(isAnagram(s, t));
