// Фраза является палиндромом, если после преобразования всех заглавных букв в строчные и удаления всех небуквенно-цифровых символов она читается одинаково как слева направо, так и справа налево. К буквенно-цифровым символам относятся буквы и цифры.

// Дана строка s. Верните true, если она является палиндромом, или false в противном случае.

// Пример 1
// Вход: s = "A man, a plan, a canal: Panama"
// Выход: true
// Пояснение: "amanaplanacanalpanama" — это палиндром.

// Пример 2
// Вход: s = "race a car"
// Выход: false
// Пояснение: "raceacar" — не палиндром.

// Пример 3
// Вход: s = " " (пробел)
// Выход: true
// Пояснение: После удаления небуквенно-цифровых символов получается пустая строка "". Поскольку пустая строка читается одинаково в прямом и обратном порядке, она является палиндромом.

// Ограничения
// 1 <= s.length <= 2 * 10⁵

// s состоит только из печатных ASCII-символов

// Вход: s = "A1 man, a plan, a canal: Panam1a"

function isPallindrome(s) {
  let start = 0;
  let end = s.length - 1;

  function isLetterAndIsNum(char) {
    const isChar = char.toLowerCase() !== char.toUpperCase();
    const code = char.charCodeAt(0);
    const isNum = code >= 48 && code <= 57;

    return isChar || isNum;
  }

  while(start < end) {
    while(start < end && !isLetterAndIsNum(s[start])) {
      start += 1;
    }
    while(start < end && !isLetterAndIsNum(s[end])) {
      end -= 1;
    }

    if(s[start].toLowerCase() !== s[end].toLowerCase()) {
      return false
    }

    start += 1;
    end -= 1;
  }

  return true
}

console.log(isPallindrome("A man, a p1lan, a canal: Panama"))
console.log(isPallindrome("raceacar"))


