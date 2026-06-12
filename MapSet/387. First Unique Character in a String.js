//Leetcode 387. First Unique Character in a String
const s = 'leetcode';

var firstUniqChar = function (s) {
	const lettersMap = new Map();

	for (const letter of s) {
		if (!lettersMap.has(letter)) {
			lettersMap.set(letter, 1);
		} else {
			lettersMap.set(letter, lettersMap.get(letter) + 1);
		}
	}

	for (let [char, count] of lettersMap) {
		if (count === 1) {
			return char;
		}
	}

	return -1;
};

console.log(firstUniqChar(s));
