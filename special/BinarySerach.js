let arr = [1, 4, 5, 6, 7, 8, 23, 56, 88, 184, 503];

const binarySearch = (arr, target) => {
	let start = 0;
	let end = arr.length - 1;

	while (start <= end) {
		let middle = Math.floor((start + end) / 2);
		console.log(`Searching: start=${start}, end=${end}, middle=${middle}, value=${arr[middle]}`);
		if (arr[middle] === target) return middle;

		if (target > arr[middle]) {
			start = middle + 1;
		}

		if (target < arr[middle]) {
			end = middle - 1;
		}
	}
};

console.log(binarySearch(arr, 503));
