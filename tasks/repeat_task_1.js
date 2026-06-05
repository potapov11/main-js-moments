// LeetCode 392 — Is Subsequence
// Условие: строки s и t. Проверь, является ли s подпоследовательностью t 
// (символы s встречаются в t в том же порядке, не обязательно подряд).

// s = "abc",  t = "ahbgdc"  → true   (a…b…c в t)
// s = "ax",   t = "ahbgdc"  → false
// s = "",     t = "ahbgdc"  → true   (пустая всегда subsequence)

function isSubsequence(s, t) {
	if(!s.length) return true;

	let startS = 0;
	let count = 0;

	for(let startT = 0; startT < t.length; startT++) {
		if(t[startT] === s[startS]) {
			count++;
			startS++;
		}
	}
	
	return  count === s.length
}

console.log(isSubsequence("abc", "ahbgdc"))
console.log(isSubsequence("ax", "ahbgdc"))
