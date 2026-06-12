const sFalse = ')(())({}{})()[]'
const sTrue = '(){}[][]'

var isValid = function(s) {
  const stack = [];
  const bracketsMap = {
    ')': '(',
    '}': '{',
    ']': '[',
  }

  for(let char of s) {
    if(!bracketsMap[char]) {
      stack.push(char);
    } else {
      console.log(bracketsMap[char])
      if(stack.pop() !== bracketsMap[char]) {
        return false
      }
    }
  }

  return stack.length === 0
};

console.log(isValid(sFalse))
console.log(isValid(sTrue))
