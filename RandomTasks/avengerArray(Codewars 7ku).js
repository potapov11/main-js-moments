function avg(a) {
	const sum = a.reduce((k, i) => k + i);
	return sum / a.length;
}

console.log(avg([0, 1, 2]));
console.log(avg([1, 2, 3, 4]));
