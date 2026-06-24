// Задача
// Верни массив квадратов каждого числа, тоже отсортированный по неубыванию.

// Примеры
// Пример 1

// Вход:  nums = [-4, -1, 0, 3, 10]
// Выход: [0, 1, 9, 16, 100]
// Квадраты: 16, 1, 0, 9, 100 → после сортировки: 0, 1, 9, 16, 100

// Пример 2

// Вход:  nums = [-7, -3, 2, 3, 11]
// Выход: [4, 9, 9, 49, 121]
// Пример 3

// Вход:  nums = [-5, -3, -2, -1]
// Выход: [1, 4, 9, 25]
// Ограничения
// 1 <= nums.length <= 10⁴
// -10⁴ <= nums[i] <= 10⁴
// nums отсортирован по неубыванию

//[-4, -1, 0, 3, 10]

function resultSquaredArray(nums) {
  const resultArray = new Array(nums.length);
  let start = 0;
  let end  = nums.length - 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    let squaredStart = nums[start] * nums[start];
    let squaredEnd = nums[end] * nums[end];

    if(squaredStart > squaredEnd) {
      resultArray[i] = squaredStart;
      start++
    } else {
      resultArray[i] = squaredEnd;
      end--;
    }
  }
}


