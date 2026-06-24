// Условие задачи 167. Two Sum II — Input Array Is Sorted (на русском)
// Дано:

// Массив целых чисел numbers, отсортированный по неубыванию (каждый следующий элемент ≥ предыдущего)

// Индексация массива начинается с 1 (не с 0, как обычно в программировании)

// Целое число target

// Задача:
// Найти два различных числа в массиве, сумма которых равна target. Вернуть их индексы (с учётом индексации с 1) в виде массива [index1, index2], где index1 < index2.

// Гарантируется:

// Существует ровно одно решение

// Нельзя использовать один и тот же элемент дважды

// Дополнительное требование:
// Решение должно использовать только константную дополнительную память (O(1), нельзя создавать хеш-таблицы/словари).

// Пример 1:

// text
// Вход: numbers = [2, 7, 11, 15], target = 9
// Выход: [1, 2]
// Пояснение: 2 (индекс 1) + 7 (индекс 2) = 9
// Пример 2:

// text
// Вход: numbers = [2, 3, 4], target = 6
// Выход: [1, 3]
// Пояснение: 2 (индекс 1) + 4 (индекс 3) = 6
// Пример 3:

// text
// Вход: numbers = [-1, 0], target = -1
// Выход: [1, 2]
// Пояснение: -1 (индекс 1) + 0 (индекс 2) = -1
// Ограничения:

// Длина массива от 2 до 30 000

// Значения элементов от -1000 до 1000

// target от -1000 до 1000

// Массив отсортирован по неубыванию

// Решение всегда существует и единственно

// Вход: numbers = [2, 4, 7, 8, 10, 11, 15], target = 11
// Выход: [2, 3]

function getIndexesArray(numbers, target) {
  let start = 0;
  let end = numbers.length - 1;

  while(start < end) {
    const sum = numbers[start] + numbers[end];

    if (sum === target) {
      return [start + 1, end + 1];
    } else if (sum < target) {
      start++;
    } else {
      end--;
    }
  }
}

const tests = [
  // примеры из условия
  { numbers: [2, 3, 4], target: 6, expected: [1, 3] },
  { numbers: [-1, 0], target: -1, expected: [1, 2] },

  // только правый указатель (сумма слишком большая)
  { numbers: [2, 7, 11, 15], target: 9, expected: [1, 2], note: 'end--' },

  // только левый указатель (сумма слишком маленькая)
  { numbers: [1, 2, 3, 4, 5], target: 9, expected: [4, 5], note: 'start++' },

  // ответ сразу, указатели не двигаются
  { numbers: [1, 3, 4, 5, 7], target: 8, expected: [1, 5], note: 'сразу' },

  // чередование: правый → правый → левый → правый
  { numbers: [2, 4, 7, 8, 10, 11, 15], target: 11, expected: [2, 3], note: 'оба' },

  // чередование: правый → левый
  { numbers: [1, 2, 4, 6, 8, 10], target: 10, expected: [2, 5], note: 'end-- → start++' },

  // минимальный массив
  { numbers: [3, 5], target: 8, expected: [1, 2] },

  // отрицательные числа
  { numbers: [-10, -5, -2, 0, 3], target: -7, expected: [1, 5] },
];

let passed = 0;

for (const { numbers, target, expected, note } of tests) {
  const result = getIndexesArray(numbers, target);
  const ok =
    result[0] === expected[0] &&
    result[1] === expected[1];

  console.log(
    ok ? '✓' : '✗',
    note ? `[${note}]` : '',
    `numbers=${JSON.stringify(numbers)}, target=${target}`,
    `→ expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`
  );

  if (ok) passed++;
}

console.log(`\n${passed}/${tests.length} passed`);
