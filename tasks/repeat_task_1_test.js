// Часть 2 — алгоритмическая задача
// Условие

// Дан массив целых чисел nums и число k. Вернуть индексы двух чисел, сумма которых равна k. 
// Ровно одно решение, каждый элемент — один раз. Порядок индексов в ответе не важен.

// twoSum([2, 7, 11, 15], 9)  // → [0, 1]
// twoSum([3, 2, 4], 6)   

function twoSum(arr, target) {
  const map = new Map();
  const result = [];

  for(let i = 0; i < arr.length; i++) {
    const diff = target - arr[i];

    if(map.has(diff)) {
      result.push(map.get(diff), i)
    }

    map.set(arr[i], i)
  }

  return result
}

console.log(twoSum([3, 2, 4], 6))


