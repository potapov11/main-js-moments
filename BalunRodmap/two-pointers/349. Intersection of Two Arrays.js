// Дано:

// Два целочисленных массива nums1 и nums2

// Задача:
// Найти пересечение массивов — то есть множество элементов,
// которые встречаются в обоих массивах.

// Требования:

// Каждый элемент в результате должен быть уникальным (без дубликатов)

// Порядок элементов в ответе не важен

// Пример 1:

// text
// Вход: nums1 = [1,2,2,1], nums2 = [2,2]
// Выход: [2]
// Пояснение: число 2 есть в обоих массивах. Остальные числа не пересекаются.

// Пример 2:

// text
// Вход: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// Выход: [9,4]
// Пояснение: 4 и 9 есть в обоих массивах. Ответ [4,9] тоже принимается.

// function intersectionArray(nums1, nums2) {
//   const setArray = new Set(nums1);
//   const resultArr = new Set();

//   for(let i = 0; i < nums2.length; i++) {
//     if(setArray.has(nums2[i])) {
//       resultArr.add(nums2[i])
//     }
//   }

//   console.log(...resultArr, 'resultArr')
//   return [...resultArr];
// }

// intersectionArray([4,9,5], [9,4,9,8,4])

// Вход: nums1 = [4,9,5], nums2 = [9,4,9,8,4]

function intersection(nums1, nums2) {
  nums1.sort((a, b) => a - b); //[4,5,9]
  nums2.sort((a, b) => a - b); //[4,4,8,9,10]

  let i = 0;
  let j = 0;
  const result = [];

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++;
    } else if (nums1[i] > nums2[j]) {
      j++;
    } else {
      result.push(nums1[i]);
      i++;
      j++;
    }
  }

  return result;
}
