/**
 * ЗАДАЧА 2: Valid Parentheses
 *
 * Условие:
 * Дана строка s, содержащая только символы '(', ')', '{', '}', '[' и ']',
 * определите, является ли входная строка валидной.
 *
 * Входная строка является валидной, если:
 * 1. Открывающие скобки должны быть закрыты скобками того же типа.
 * 2. Открывающие скобки должны быть закрыты в правильном порядке.
 * 3. Каждая закрывающая скобка имеет соответствующую открывающую скобку того же типа.
 *
 * Примеры:
 *
 * Пример 1:
 * Input: s = "()"
 * Output: true
 *
 * Пример 2:
 * Input: s = "()[]{}"
 * Output: true
 *
 * Пример 3:
 * Input: s = "(]"
 * Output: false
 *
 * Пример 4:
 * Input: s = "([)]"
 * Output: false
 *
 * Пример 5:
 * Input: s = "{[]}"
 * Output: true
 *
 * Ограничения:
 * - 1 <= s.length <= 10^4
 * - s состоит только из символов '(', ')', '{', '}', '[' и ']'.
 *
 * Реализуйте функцию:
 */

var isValid = function (s) {
	const newMap = {
		')': '(',
		'}': '{',
		']': '[',
	};

	let stack = [];

	for (let char of s) {
		if (['(', '{', '['].includes(char)) {
			stack.push(char);
		} else {
			const lastChar = stack.pop();

			if (newMap[char] !== lastChar) return false;
		}
	}

	return true;
};

// Тестовые случаи:
console.log(isValid('()')); // Ожидается: true
console.log(isValid('()[]{}')); // Ожидается: true
console.log(isValid('(]')); // Ожидается: false
console.log(isValid('([)]')); // Ожидается: false
console.log(isValid('{[]}')); // Ожидается: true
console.log(isValid('')); // Ожидается: true (пустая строка валидна)
console.log(isValid('(((')); // Ожидается: false

// ЗАДАЧА 1: Contains Duplicate (217)
// Условие:
// Дан массив целых чисел nums. Определите, содержит ли массив дубликаты. Верните true, если хотя бы одно значение встречается в массиве минимум дважды, и false, если все элементы различны.

// Input: nums = [1,2,3,1]
// Output: true

const nums = [1, 2, 3, 4];

const containsDuplicates = (arr) => {
	const newArr = new Set();

	for (let i = 0; i < arr.length; i++) {
		if (!newArr.has(arr[i])) {
			newArr.add(arr[i]);
		} else {
			return false;
		}
	}

	return true;
};

console.log(containsDuplicates(nums));

// ЗАДАЧА 2: First Unique Character in a String (387)
// Условие:
// Дана строка s. Найдите первый неповторяющийся символ в ней и верните его индекс. Если такого символа нет, верните -1.
// Примеры:
// Пример 1:

// Input: s = "leetcode"
// Output: 0
// Input: s = "leetcode"
// Output: 0
// Explanation: The first unique character is 'l' and is at index 0.

const firstUniqCharacter
