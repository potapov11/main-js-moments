// Дано:

// Целочисленный массив nums, отсортированный по неубыванию (каждый следующий элемент ≥ предыдущего)

// Длина массива от 1 до 10⁴

// Значения элементов от -10⁴ до 10⁴

// Задача:
// Вернуть массив квадратов каждого числа, также отсортированный по неубыванию.

// Пример 1:

// text
// Вход: nums = [-4, -1, 0, 3, 10]
// Выход: [0, 1, 9, 16, 100]
// Пояснение: Квадраты: [16, 1, 0, 9, 100], после сортировки: [0, 1, 9, 16, 100]
// Пример 2:

// text
// Вход: nums = [-7, -3, 2, 3, 11]
// Выход: [4, 9, 9, 49, 121]

function squaresArray(nums) {
  let start = 0;
  let end = nums.length - 1;
  let resultArr = [];
  resultArr.length = nums.length;

  for(let i = nums.length - 1; i >= 0; i--) {
    const squaredLeft = nums[start] * nums[start];
    const squaredRight = nums[end] * nums[end];

    if(squaredLeft > squaredRight) {
      resultArr[i] = squaredLeft;
      start++;
    } else {
      resultArr[i] = squaredRight;
      end--
    }

  }

  return resultArr;
  
}
console.log(squaresArray([-7, -3, 2, 3, 11]))
