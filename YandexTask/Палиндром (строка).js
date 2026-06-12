/**
 * @param {string} s
 * @return {boolean}
 */

// Вход:  "A man a plan a canal: Panama"
// Выход: true   (буквы: amanaplanacanalpanama — палиндром)

// Вход:  "race a car"
// Выход: false  (буквы: raceacar — не палиндром)

// Вход:  "0P"
// Выход: false  ('0' и 'P' после приведения к одному регистру различаются)

// Вход:  " "
// Выход: true   (нет символов для сравнения — часто считают палиндромом)

// Какой алгоритм используешь и почему?

// Зачем два цикла while внутри основного?

// Что будет, если в строке вообще нет букв?

// Почему сравниваешь через toLowerCase(), а не сразу по кодам?

const isAlphaLetter = (c) => {
	const code = c.charCodeAt(0);

	return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
};

function isPalindrome(s) {
	let start = 0;
	let end = s.length - 1;

	if (s.length === 1) {
		return true;
	}

	while (start < end) {
		while (start < end && !isAlphaLetter(s[start])) {
			start += 1;
		}

		while (start < end && !isAlphaLetter(s[end])) {
			end -= 1;
		}

		if (s[start].toLowerCase() !== s[end].toLowerCase()) {
			return false;
		}

		start += 1;
		end -= 1;
	}

	return true;
}

console.log(isPalindrome('!!!'));
