var maxProduct = function (nums) {
	let maxCount = nums[0];
	let maxMin = nums[0];
	let maxGlobal = nums[0];

	for (let i = 1; i < nums.length; i++) {
		let tempMin = maxMin;
		let tempMax = maxCount;

		// Три варианта для нового максимального произведения:
		// 1. Начать новый подмассив с текущего элемента
		// 2. Продолжить предыдущий максимум, умножив на текущий элемент
		// 3. Продолжить предыдущий минимум, умножив на текущий элемент
		//    (это важно для отрицательных чисел: (-6) * (-4) = 24)

		maxCount = Math.max(nums[i], tempMax * nums[i], tempMin * nums[i]);
		maxMin = Math.min(nums[i], tempMax * nums[i], tempMin * nums[i]);

		maxGlobal = Math.max(maxCount, maxGlobal);
	}

	return maxGlobal;
};
