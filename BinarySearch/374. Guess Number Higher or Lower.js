// используя только вызовы функции guess(num).
// Пример:
// Input: n = 10, pick = 6
// Output: 6

/**
 * Это API уже реализовано где-то снаружи.
 * @param {number} num
 * @return {-1 | 0 | 1}
 * -1: num > pick
 *  1: num < pick
 *  0: num == pick
 */
function guess(num) {
	// реализовано в тестовой системе, тут только заглушка для понимания
}

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
	const start = 1;
	const end = n;

	while (start < end) {
		const middle = Math.floor((start + end) / 2);

		const resGuess = guess(middle);

		if (resGuess === 0) {
			return middle;
		} else if (resGuess === -1) {
			end = middle - 1;
		} else {
			start = middle + 1;
		}
	}
};
