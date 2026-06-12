// Дан массив nums и число k. Вернуть true,
// если есть два одинаковых элемента с разницей индексов ≤ k.
// Иначе вернуть false.
// Примеры входных данных:

// nums = [1, 2, 3, 1], k = 3
// nums = [1, 0, 1, 1], k = 1
// nums = [1, 2, 3, 1, 2, 3], k = 2
// nums = [1, 2, 3, 4, 5], k = 3
// nums = [1], k = 1
// nums = [1, 2], k = 1
// nums = [99, 99], k = 2

const containsDuplicate = (nums, k) => {
	const set = new Set();

	for (let i = 0; i < nums.length; i++) {
		// Если текущий элемент уже есть в Set → он встречался в пределах k
		if (set.has(nums[i])) {
			return true;
		}

		// Добавляем текущий элемент в окно
		set.add(nums[i]);

		// Если окно стало больше k, удаляем элемент, который вышел за пределы
		if (i >= k) {
			set.delete(nums[i - k]);
		}
	}

	return false;
};

console.log(containsDuplicate([1, 0, 1, 1], 1));
