// Задача 11. «Композиция функций (pipe)»
// Напиши функцию pipe, которая принимает массив функций и возвращает новую функцию. 
// Эта новая функция должна применить переданные функции последовательно (слева направо), передавая результат каждой следующей.

// Пример:

// Требования:

// Функции могут быть любыми (синхронными).

// Если массив функций пуст — возвращай функцию, которая возвращает переданный аргумент (identity).

// javascript
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

function pipe(...fns) {
  return function (x) {
    let result = x;

    for (let i = 0; i < fns.length; i++) {
      result = fns[i](result);
    }

    return result;
  };
}

const compute = pipe(addOne, double, square);
console.log(compute(2)); // (2 + 1) * 2 = 6; 6^2 = 36 → 36

