// Задача 1: compose
// Напиши функцию compose, которая склеивает функции справа налево.

// Условие
// fn(3); // 7
// Почему 7:

// сначала double(3) → 6
// потом add1(6) → 7
// То есть: compose(f, g)(x) === f(g(x))

// Требования
// compose принимает несколько функций: compose(f, g, h, ...)
// Возвращает одну новую функцию
// Эта функция принимает один аргумент x
// Функции применяются справа налево

const add1 = (x) => x + 1;
const double = (x) => x * 2;
const fn = compose(add1, double);

function compose(...fns) {
	return function(x) {
		let result = x; 

		for(let i = fns.length - 1; i >= 0; i--) {
			result = fns[i](result)
		}

		return result
	}
}

console.log(fn(3))


