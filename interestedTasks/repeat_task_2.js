// Задача 9. «Поиск максимального числа в массиве»
// Дан массив целых чисел. Найди максимальное число.

// Примеры:

// javascript

function findMax(arr) {
  if(!arr.length) return null;

  let max = arr[0];

  for(let i = 1; i < arr.length; i++) {
    if(arr[i] > max) {
      max = arr[i]
    }
  }

  return max
}

console.log(findMax([1, 5, 3, 9, 2])); // 9
console.log(findMax([-10, -5, -3, -1])); // -1
console.log(findMax([7])); // 7
console.log(findMax([])); // null (или undefined)