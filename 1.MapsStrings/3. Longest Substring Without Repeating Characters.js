// 1. Longest Substring Without Repeating Characters (LeetCode 3)
// Условие:
// Найти длину самой длинной подстроки без повторяющихся символов.
// Примеры входных данных:

// s = "abcabcbb"
// s = "bbbbb"
// s = "pwwkew"
// s = "acddbadnmbghj"
// s = "dvdf"

const retMaxSubString = (string) => {
	let maxCountLetter = 0;
	let uniqSubStr = '';

	for (let i = 0; i < string.length; i++) {
		let currentElement = string[i];
		let currentIndexInUniq = uniqSubStr.indexOf(currentElement);

		if (currentIndexInUniq !== -1) {
			uniqSubStr = uniqSubStr.slice(currentIndexInUniq + 1);
		}

		uniqSubStr += currentElement;

		maxCountLetter = Math.max(maxCountLetter, uniqSubStr.length);
	}

	return maxCountLetter;
};

console.log(retMaxSubString('abcabcbb'));
console.log(retMaxSubString('bbbbb'));
console.log(retMaxSubString('pwwkew'));
console.log(retMaxSubString('acddbadnmbghj'));
console.log(retMaxSubString('dvdf'));
