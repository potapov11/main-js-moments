// 1. Константное время O(1);
// Пример:

const array = [1, 2, 3, 4];
function returnLastElement() {
	return array[array.length - 1];
}

returnLastElement(array);
// Вне зависимости от того какой длины будет приходить массив
// в функцию он всегда будет выполняться за константное время

// 2. Линейная сложность O(n);
// Пример:

const array1000 = [...Array(1000)].map((_, index) => index + 1);
function getSumOfArray(array) {
	let sum = 0;
	for (let i = 0; i < array.length; i++) {
		sum += array[i];
	}

	return sum;
}

getSumOfArray(array1000);

// Вне зависимости от того какой длины будет приходить массив в функцию
// он всегда будет выполняться за линейное время так как необходимо
// пройти по каждому элементу массива

// 3. Логарифмичная сложность O(log N)
// Пример:

const arrayBinary = [1, 4, 5, 6, 7, 8, 9, 99, 199, 299, 399];

function binarySearch(array, target) {
	let left = 0;
	let right = array.length - 1;
	let step = 0;

	while (left <= right) {
		const middle = Math.floor((left + right) / 2);

		if (target === array[middle]) return middle;

		if (target > array[middle]) {
			left = middle + 1;
		}

		if (target < array[middle]) {
			right = middle - 1;
		}

		step++;
	}

	return -1;
}

binarySearch(arrayBinary, 9);

//4. Квадратичная сложность.
// Взять пример из папки LeetCodeProblems two sum
