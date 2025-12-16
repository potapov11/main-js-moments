// Дан массив arr из положительных целых чисел, отсортированных в строго возрастающем порядке, и целое число k.

// Верните k-й положительный целочисленный элемент, который отсутствует в этом массиве.

// Пример:
// Input: arr = [2,3,4,7,11], k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

const arr = [2, 3, 4, 7, 11];

function returnPositive(arr, num) {
	const missingArr = [];

	for (let i = 0; i < arr.length; i++) {
		if (i !== arr[i]) {
			missingArr.push(i);
		}
	}

	console.log(missingArr, 'missingArr');
}

returnPositive(arr);
