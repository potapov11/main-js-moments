/**
 * @param {string} s
 * @return {string}
 */

const s = "(()())(())";

var removeOuterParentheses = function(s) {
  const stack = [];
  let start = 0;
  let result = '';
  const openBracket = '(';

  for(let i = 0; i < s.length; i++) {
    if(s[i] === openBracket) {
      stack.push(s[i])
    } else {
      stack.pop();
    }

    if(stack.length === 0) {
      result += s.substring(start + 1, i);
      start = i + 1; 
    }
  }

  return result
};

console.log(removeOuterParentheses(s))
