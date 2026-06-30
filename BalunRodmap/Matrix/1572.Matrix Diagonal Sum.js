// Условие задачи 1572. Matrix Diagonal Sum (на русском)
// Дано:
// Квадратная матрица mat размером n × n (целые числа).

// Задача:
// Вернуть сумму элементов на обеих диагоналях матрицы. При этом центральный элемент (если он есть) должен быть посчитан только один раз.

// Пример 1:

// text
// Вход: mat = [[1,2,3],
//               [4,5,6],
//               [7,8,9]]
// Выход: 25
// Пояснение:
// Главная диагональ: 1 + 5 + 9 = 15
// Побочная диагональ: 3 + 5 + 7 = 15
// Центральный элемент (5) посчитан дважды → вычитаем его
// Итого: 15 + 15 - 5 = 25
// Пример 2:

// text
// Вход: mat = [
// 	[1, 1, 1, 1],
// 	[1, 1, 1, 1],
// 	[1, 1, 1, 1],
// 	[1, 1, 1, 1],
// ];
// Выход: 8
// Пояснение:
// Главная: 1+1+1+1 = 4
// Побочная: 1+1+1+1 = 4
// Центрального элемента нет (матрица 4×4)
// Итого: 4 + 4 = 8

const mat = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

const mat2 = [
	[1, 1, 1, 1],
	[1, 1, 1, 1],
	[1, 1, 1, 1],
	[1, 1, 1, 1],
];

function diagonalSum(mat) {
	const n = mat.length;
	let sum = 0;

	for (let i = 0; i < n; i++) {
		sum += mat[i][i] + mat[n - 1 - i][i];
	}

	if (n % 2 !== 0) {
		const middle = Math.floor(n / 2);
		sum -= mat[middle][middle];
	}

	return sum;
}

console.log(diagonalSum(mat));

function checkNeighbors(matrix, a, b) {
	const rowLength = matrix.length;
	const colLength = matrix[0].length;
	let result = [];

	const directions = [
		[1, 0],
		[-1, 0],
		[0, -1],
		[0, 1],
	];

	for (const [dRow, dCol] of directions) {
		const directionRow = a + dRow;
		const directionCol = b + dCol;

		if (directionRow >= 0 && directionRow < rowLength && directionCol >= 0 && directionCol < colLength) {
			result.push(matrix[directionRow][directionCol]);
		}
	}

	return result;
}

console.log(checkNeighbors(mat, 0, 0), 'res');
