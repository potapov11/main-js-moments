// Напишите функцию, которая переворачивает строку. Входная строка задана как массив символов s.

// Вы должны сделать это, изменяя входной массив на месте с использованием O(1) дополнительной памяти.

// Пример 1
// Вход: s = ["h","e","l","l","o"]
// Выход: ["o","l","l","e","h"]

// Пример 2
// Вход: s = ["H","a","n","n","a","h"]
// Выход: ["h","a","n","n","a","H"]

// Ограничения
// 1 <= s.length <= 10⁵

// s[i] — печатный ASCII-символ

function reverseString(arrayString) {
	let start = 0;
	let end = arrayString.length - 1;

	while(start < end) {
		[arrayString[start], arrayString[end]] = [arrayString[end], arrayString[start]]
		start += 1;
		end -= 1;
	}
}

reverseString(["h","e","l","l","o"])

// function reverse(s, left = 0, right = s.length - 1) {
//   if (left >= right) return;
//   [s[left], s[right]] = [s[right], s[left]];
//   reverse(s, left + 1, right - 1);
// }
