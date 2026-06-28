const matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

for (let i = 0; i < matrix.length; i++) {
	for (let k = 0; k < matrix[0].length; k++) {
		console.log(matrix[i][k]);
	}
}

const grid = [
	[1, 2, 3],
	[4, 5, 6],
];

const m = grid.length;
const n1 = grid[0].length;

console.log(m, '--строки  ', n, '--столбцы', m * n, '--всего');

const rows = 4;
const columns = 4;

const myMatrix = Array.from({ length: rows }, () => Array(columns).fill(0));
console.log(myMatrix, '--наполненная матрица через Array.from');

const copyMyMatrix = myMatrix.map((row) => [...row]);
console.log(copyMyMatrix, '---copyMatrix');
copyMyMatrix[3][3] = 100;
console.log(copyMyMatrix, '---copyMatrix 100');

for (let i = 0; i < grid.length; i++) {
	for (let k = 0; k < grid[0].length; k++) {
		console.log(grid[i][k]);
	}
}

//уровень 2

//1.1

const nums = [
	[1, -2, 3],
	[4, 5, 6],
];

let sum = 0;

for (let i = 0; i < nums.length; i++) {
	for (let k = 0; k < nums[i].length; k++) {
		sum += nums[i][k];
	}
}

// console.log(sum)

//1.2

const numbers = [
	[1, -2, 3],
	[4, -5, 6],
	[-7, 8, 9],
];

let max = numbers[0][0];

for (let i = 0; i < numbers.length; i++) {
	for (let k = 0; k < numbers[i].length; k++) {
		max = Math.max(numbers[i][k], max);
	}
}

console.log(max, 'max');

//1.3

const numbersNegativs = [
	[1, -2, 3],
	[4, -5, 6],
	[-7, 8, 9],
];

let countNegative = 0;

for (let i = 0; i < numbersNegativs.length; i++) {
	for (let k = 0; k < numbersNegativs[i].length; k++) {
		if (numbersNegativs[i][k] < 0) {
			countNegative += 1;
		}
	}
}

console.log(countNegative, 'countNegative');

//1.4

const numsGrid = [
	[1, -2, 3],
	[-7, 8, 9],
];

let sumRow = 0;

for (let i = 0; i < numsGrid[0].length; i++) {
	sumRow += numsGrid[0][i];
}

console.log(sumRow, 'sumRow');

//1.5

const numsGridCols = [
	[1, -2, 3],
	[-17, 8, 9],
	[7, 38, 9],
	[23, 44, 9],
	[4, 24, 19],
];

let sumCol = 0;

for (let i = 0; i < numsGridCols.length; i++) {
	sumCol += numsGridCols[i][1];
}

console.log(sumCol, 'sumCol');

//1.6 думаю есть более изящное решение

const numsNew = [
	[1, -2, 3],
	[-17, 8, 9],
];

const matrixNumsNew = numsNew.map((elem) => elem.map((elemInner) => elemInner * 2));
console.log(matrixNumsNew, 'matrixNumsNew');

//1.7 не уверен что правильно именно с точки зрения матриц

const numsSumArray = [
	[1, -2, 3],
	[-17, 8, 9],
];

const sumArray = numsSumArray.map((row) => {
	return row.reduce((acc, item) => acc + item, 0);
});

console.log(sumArray);

//| 2.1 | Вернуть массив 4 углов |

// const matrixNums = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

// const n = matrixNums.length; // квадрат 3×3
// const corners = [
//   matrixNums[0][0],           // левый верх
//   matrixNums[0][n - 1],       // правый верх
//   matrixNums[n - 1][0],       // левый низ
//   matrixNums[n - 1][n - 1],   // правый низ
// ];

// console.log(corners)

//2.2

const matrixNums = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

function getNeighbors(matrix, i, j) {
	const rows = matrix.length;
	const columns = matrix[0].length;
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	];
	const result = [];

	for (const [di, dj] of directions) {
		const ni = i + di;
		const nj = j + dj;

		if (ni >= 0 && ni < rows && nj >= 0 && nj < columns) {
			result.push(matrix[ni][nj]); // значения соседей
			// result.push([ni, nj]);    // если нужны координаты
		}
	}

	return result;
}

console.log(getNeighbors(matrixNums, 0, 0)); // [4, 2]
// console.log(getNeighbors(matrixNums, 1, 1)); // [2, 8, 4, 6]
// console.log(getNeighbors(matrixNums, 0, 1)); // [5, 1, 3]
// console.log(getNeighbors(matrixNums, 2, 2)); // [8, 6]

const matrixNumbers = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

function countDiagonalsMatrix(matrix) {
	const matrixRows = matrix.length;
	const matrixColumns = matrix[0].length;

	if (matrixRows !== matrixColumns) {
		return 'Матрица не квадратная';
	}

	let sumMainDiagonal = 0;
	let sumSecondaryDiagonal = 0;

	for (let i = 0; i < matrixRows; i++) {
		sumMainDiagonal += matrix[i][i];
	}
	for (let i = 0; i < matrixRows; i++) {
		console.log(matrix[i][matrixColumns - 1 - i]);
	}
}

countDiagonalsMatrix(matrixNumbers);
