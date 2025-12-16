//1. Создай функцию createMapFromArray(arr),
// которая принимает массив пар вида [ключ, значение] и возвращает новый Map.

const address = {
	street: 'nevsky',
	house: 21,
};

const pairs = [
	['person', 'john'],
	['age', 21],
	[address, address],
];

const createMapFromArray = (pairs) => {
	if (pairs.length === 0) return;

	const returnedMap = new Map(pairs);
	return returnedMap;
};

//2. Задание 2: Преобразование объекта в Map и обратно
// Напиши две функции:

// objToMap(obj) — преобразует обычный объект в Map.
// mapToObj(map) — преобразует Map обратно в обычный объект.

const address2 = {
	street: 'nevsky',
	house: 21,
};

const map = new Map([
	['street', 'nevsky'],
	['house', 21],
]);

console.log(Object.fromEntries(map.entries()));

const objToMap = (obj) => {
	if (typeof obj !== 'object') return;

	return new Map(Object.entries(obj));
};

const mapToObj = (map) => {
	if (typeof map !== 'object') return;

	return Object.fromEntries(map.entries());
};

console.log(mapToObj(map), 'map');

// Задание 4: Map с объектами как ключами
// Создай Map, где ключами будут объекты пользователей, а значениями — их роли ('admin', 'user' и т.д.).
// Затем напиши функцию getUserRole(map, user), которая возвращает роль по объекту-пользователю.

const John = {
	name: 'John',
	age: 44,
	sayHello: function () {
		console.log(`${this.name} say hello`);
	},
};

const Ann = {
	name: 'Ann',
	location: 'Roma',
	setAge: function (age) {
		this.age = age;
		console.log(this.age);
	},
};

const rolesMap = new Map([
	[John, 'admin'],
	[Ann, 'director'],
]);

const getUserRole = (key) => {
	const role = rolesMap.get(key);
	console.log(role, 'role');
};

console.log(getUserRole(John));
console.log(getUserRole(Ann));

//  Задание 5: Объединение двух Map
// Напиши функцию mergeMaps(map1, map2), которая объединяет два Map в один.
// Если ключ есть в обоих — значение из map2 перезаписывает значение из map1

const getName = () => {
	return 'name';
};

console.log(typeof getName);

const map1 = new Map([
	['1', 4],
	['2', '3'],
]);
const map2 = new Map([
	['2', 3],
	['4', '4'],
	[getName, '3'],
]);
console.log(map2);

const mergeMaps = (m1, m2) => {
	for (const [key, value] of m2) {
		m1.set(key, value);
	}

	return m1;
};

console.log(mergeMaps(map1, map2));

const nums = [1, 1, 2];
var removeDuplicates = function (nums) {
	const k = [...new Set(nums)].length;
	return k;
};

console.log(removeDuplicates(nums));
