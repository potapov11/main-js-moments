// Условие задачи 3Sum (на русском)
// Дано:

// Целочисленный массив nums

// Длина массива от 3 до 3000

// Значения элементов от -10⁵ до 10⁵

// Задача:
// Найти все уникальные триплеты [nums[i], nums[j], nums[k]], такие что:

// Индексы i, j, k — различны (нельзя использовать один элемент дважды)

// Сумма элементов триплета равна 0

// Требование к ответу:

// В результирующем наборе не должно быть повторяющихся триплетов (даже в разном порядке)

// Порядок триплетов в ответе и порядок чисел внутри триплета не важны

// Пример 1:

// text
// Вход: nums = [-1, 0, 1, 2, -1, -4]
// Выход: [[-1, -1, 2], [-1, 0, 1]]
// Пояснение: 
// - (-1) + 0 + 1 = 0
// - (-1) + 2 + (-1) = 0
// Уникальные триплеты: [-1, -1, 2] и [-1, 0, 1]
// Пример 2:

// text
// Вход: nums = [0, 1, 1]
// Выход: []
// Пояснение: Ни один триплет не даёт сумму 0
// Пример 3:

// text
// Вход: nums = [0, 0, 0]
// Выход: [[0, 0, 0]]
// Пояснение: Только один триплет — все нули
// Ключевые сложности задачи:

// Нужно избежать дубликатов в ответе

// Требуется эффективное решение (полный перебор за O(n³) не пройдёт)

// Ограничения:

// 3 <= nums.length <= 3000

// -10⁵ <= nums[i] <= 10⁵

// Вход: nums = [-1, 0, 1, 2, -1, -4]
// Выход: [[-1, -1, 2], [-1, 0, 1]]

function getArrayTriplet(array, target = 0, debug = true) {
  const sortedArray = array.sort((a, b) => a - b);
  const result = [];
  const log = (...args) => debug && console.log(...args);

  log('═'.repeat(60));
  log(`Вход: [${array}]  →  после сортировки: [${sortedArray}], target = ${target}`);
  log('═'.repeat(60));

  for (let i = 0; i < sortedArray.length - 2; i++) {
    log('');
    log(`┌─ ВНЕШНИЙ ЦИКЛ: i = ${i}, nums[i] = ${sortedArray[i]}`);
    log(`│  Массив: [${sortedArray.map((v, idx) => idx === i ? `*${v}*` : v).join(', ')}]`);
    log(`│  (* — фиксированное первое число триплета)`);

    // пропуск дубликатов для первого числа
    if (i > 0 && sortedArray[i] === sortedArray[i - 1]) {
      log(`│  ⏭  ПРОПУСК: nums[${i}] === nums[${i - 1}] (${sortedArray[i]}) — дубликат первого числа, continue`);
      log('└─ конец итерации i');
      continue;
    }

    // дальше все числа > target — сумма не может быть target
    if (sortedArray[i] > target) {
      log(`│  ⛔ BREAK: nums[${i}] = ${sortedArray[i]} > target (${target}) — дальше только больше, выход`);
      log('└─ конец внешнего цикла');
      break;
    }

    let left = i + 1;
    let right = sortedArray.length - 1;
    log(`│  Запуск two pointers: left = ${left} (${sortedArray[left]}), right = ${right} (${sortedArray[right]})`);

    // Two Sum II на отрезке [i+1 ... end]
    while (left < right) {
      const sum = sortedArray[i] + sortedArray[left] + sortedArray[right];
      const triplet = `[${sortedArray[i]}, ${sortedArray[left]}, ${sortedArray[right]}]`;

      log(`│  ├─ ВНУТРЕННИЙ: left=${left}(${sortedArray[left]}), right=${right}(${sortedArray[right]}) → ${triplet} = ${sum}`);

      if (sum === target) {
        result.push([sortedArray[i], sortedArray[left], sortedArray[right]]);
        log(`│  │  ✅ НАЙДЕНО! добавляем ${triplet}`);
        left++;
        right--;
        log(`│  │  сдвиг: left → ${left}, right → ${right}`);

        // пропуск дубликатов для второго и третьего числа
        const leftBefore = left;
        while (left < right && sortedArray[left] === sortedArray[left - 1]) left++;
        if (left !== leftBefore) {
          log(`│  │  ⏭  пропуск дубликатов left: ${leftBefore} → ${left} (значение ${sortedArray[leftBefore]})`);
        }

        const rightBefore = right;
        while (left < right && sortedArray[right] === sortedArray[right + 1]) right--;
        if (right !== rightBefore) {
          log(`│  │  ⏭  пропуск дубликатов right: ${rightBefore} → ${right} (значение ${sortedArray[rightBefore]})`);
        }

      } else if (sum < target) {
        log(`│  │  sum < target → left++ (${left} → ${left + 1}), нужно больше`);
        left++;

      } else {
        log(`│  │  sum > target → right-- (${right} → ${right - 1}), нужно меньше`);
        right--;
      }
    }

    log(`│  while завершён: left=${left}, right=${right} (left >= right)`);
    log('└─ конец итерации i');
  }

  log('');
  log('═'.repeat(60));
  log('Результат:', JSON.stringify(result));
  log('═'.repeat(60));

  return result;
}

console.log(getArrayTriplet([-1, 0, 1, 2, -1, -4], 0)); // [[-1, -1, 2], [-1, 0, 1]]


