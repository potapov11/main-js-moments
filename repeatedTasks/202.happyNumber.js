// Счастливое число — это число, которое определяется следующим процессом:

// Начиная с любого положительного целого числа, замените число суммой квадратов его цифр.

// Повторяйте процесс до тех пор, пока число не станет равным 1
// (где оно и останется), или пока оно не войдет в бесконечный цикл, который не включает 1.

// Числа, для которых этот процесс заканчивается на 1, являются счастливыми.

// Верните true (истина), если n является счастливым числом, и false (ложь), если нет.

// Пример 1:
// Входные данные: n = 19
// Выходные данные: true
// Объяснение:
// 1² + 9² = 82
// 8² + 2² = 68
// 6² + 8² = 100
// 1² + 0² + 0² = 1

// Пример 2:
// Входные данные: n = 2
// Выходные данные: false

var isHappy = function(n) {

    function helperSum(n) {
        const splittedString = String(n).split('');
        const resultSum = splittedString.reduce((acc, item)=> item * item + acc, 0)
        return resultSum
    }

    let currentResult = n;
    const resultSet = new Set();

    while(true) {
        currentResult = helperSum(currentResult);
        if(!resultSet.has(currentResult)) {
            resultSet.add(currentResult);
        } else {
            return false;
        }

        if(currentResult === 1) {
            return true
        }

    }
};

console.log(isHappy(19))
