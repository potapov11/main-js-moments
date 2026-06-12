function sequenceClassifier(arr) {
	let growth = false;
	let decline = false;
	let equality = false;

	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[i - 1]) decline = true;
		if (arr[i] > arr[i - 1]) growth = true;
		if (arr[i] === arr[i - 1]) equality = true;
	}

	if (growth && decline) return 0;
	if (!growth && !decline) return 5;
	if (growth && !decline && !equality) return 1;
	if (growth && !decline && equality) return 2;
	if (!growth && decline && !equality) return 3;
	if (!growth && decline && equality) return 4;

	return 0;
}

console.log(sequenceClassifier([3, 5, 8, 1, 14, 3]));
console.log(sequenceClassifier([3, 5, 8, 9, 14, 23]));
console.log(sequenceClassifier([3, 5, 8, 8, 14, 14]));
