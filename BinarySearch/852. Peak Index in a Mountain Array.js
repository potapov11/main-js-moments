const arr = [0, 2, 5, 7, 10, 8, 6, 4, 1];

var peakIndexInMountainArray = function (arr) {
	let start = 0;
	let end = arr.length - 1;

	while (start <= end) {
		const middle = Math.floor((start + end) / 2);

		console.log(middle, 'middle');

		if (arr[middle] > arr[middle + 1] && arr[middle] > arr[middle - 1]) {
			return middle;
		}

		if (middle > arr[middle - 1]) {
			start = middle + 1;
		} else {
			end = middle - 1;
		}
	}
};

console.log(peakIndexInMountainArray(arr));
