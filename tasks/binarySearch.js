const arrNums = [2, 5, 8, 12, 16, 23, 38, 45, 67, 89];

function binarySearch(arr, item) {
	let left = 0;
	let right = arr.length - 1;

	while (left <= right) {
		let middle = Math.floor((left + right) / 2);
		if (item === arr[middle]) {
			return middle;
		}

		if (item > arr[middle]) {
			left = middle + 1;
		} else if (item < arr[middle]) {
			right = middle - 1;
		}
	}

	return 'не найдено';
}

console.log(binarySearch(arrNums, 338));
