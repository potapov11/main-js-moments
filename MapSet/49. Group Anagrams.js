//Leetcode medium 49. Group Anagrams

const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

var groupAnagrams = function (strs) {
	const anagramsMap = new Map();

	for (let i = 0; i < strs.length; i++) {
		const currentWord = strs[i];
		const sortedWord = currentWord.split('').sort().join('');

		if (!anagramsMap.has(sortedWord)) {
			anagramsMap.set(sortedWord, [currentWord]);
		} else {
			const anagramArray = anagramsMap.get(sortedWord);
			anagramArray.push(currentWord);
		}
	}

	return [...anagramsMap.values()];
};

groupAnagrams(strs);
