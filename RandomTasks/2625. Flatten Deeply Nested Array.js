const array = [1, [2, 3], [4, [5, 6]]];

function ArrayFlattening(array) {
	if (!array.length) return;
	const resultArray = [];

	function recursive(element) {
		if (!Array.isArray) {
			resultArray.push(element);
		} else {
			for (let el of element) {
				recursive(el);
			}
		}
	}

	for (let element of array) {
		recursive(element);
	}
}

ArrayFlattening(array);
