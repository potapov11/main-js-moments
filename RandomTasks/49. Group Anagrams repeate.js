// 49. Group Anagrams
// Условие:
// Дан массив строк strs. Нужно сгруппировать строки, которые являются анаграммами друг друга.
// Анаграммы — строки из одинакового набора букв с одинаковой частотой, но в разном порядке.
//
// Вход:
//   - strs: string[] — массив строк из строчных латинских букв.
// Выход:
//   - string[][] — массив групп, где каждая группа содержит строки-анаграммы.
// Порядок групп и порядок элементов внутри группы не важен.
//
// Примеры:
// Input:  ["eat","tea","tan","ate","nat","bat"]
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]
//
// Input:  [""]
// Output: [[""]]
//
// Input:  ["a"]
// Output: [["a"]]

/**
 * @param {string[]} strs
 * @return {string[][]}
 */

const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

var groupAnagrams = function (strs) {
	const sortedWord = (w) => w.split('').sort().join('');

	const wordMap = new Map();

	for (let i = 0; i < strs.length; i++) {
		const currentSorted = sortedWord(strs[i]);

		console.log(currentSorted, 'currentSorted');

		if (!wordMap.has(currentSorted)) {
			wordMap.set(currentSorted, [strs[i]]);
		} else {
			const arr = wordMap.get(currentSorted);
			arr.push(currentSorted);
		}
	}

	return Array.from(wordMap.values());
};

// пример вызова:
console.log(groupAnagrams(strs));
