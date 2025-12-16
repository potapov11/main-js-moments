// const nums = [1, 3, 5, 6];
// target = 5;
// Output: 2
// Example 2:

// const nums3 = [1001];
0;
// target = 2;
// Output: 1
// Example 3:

// Input: (nums = [1, 3, 5, 6]), (target = 7);
// Input: (nums = [1000]), (target = 5);
// Output: 4;

const nums2 = [1, 3, 5, 6];
//target = 5

var searchInsert = function (nums, target) {
	let start = 0;
	let end = nums.length - 1;

	while (start <= end) {
		let middle = Math.floor(start + (end - start) / 2);
		console.log(middle, 'middle');

		if (nums[middle] === target) return middle;

		if (target > nums[middle]) {
			start = middle + 1;
		} else {
			end = middle - 1;
		}
	}

	return start;
};

console.log(searchInsert(nums2, 5));

// Почему возвращаем start, если элемент не найден?

// Рассмотрим nums = [1, 3, 5, 6], target = 2:
// Итерация 1:
// start=0, end=3, middle=1
// nums[1]=3

// 2 < 3 → end = 0

// Итерация 2:

// start=0, end=0, middle=0

// nums[0]=1

// 2 > 1 → start = 1

// Итерация 3:

// start=1, end=0 → цикл завершается

// Возвращаем start = 1

// Почему именно start?

// После завершения цикла:

// end указывает на последний элемент, меньший чем target

// start указывает на первый элемент, больший чем target

// Чтобы вставить target и сохранить порядок, нужно вставить его между end и start

// В массиве это позиция start

// Математически:

// Если target меньше всех → start = 0 (в начало)
// Если target больше всех → start = nums.length (в конец)
// Если target между элементами → start указывает на первый больший элемент

// Это свойство бинарного поиска: start всегда становится индексом вставки, когда элемент не найден.
