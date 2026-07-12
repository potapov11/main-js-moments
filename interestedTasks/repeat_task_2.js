const multiply = (a,b,c,d) => a * b * c * d;
const sum = (x, z) => x + z;

// carry(multiply)(1)(2)(3)(4) // 24
// carry(sum)(3)(4) // 7

function carry(fn) {
	return function carried(...args) {
		console.log('[carried] аргументы args:', args)

		if (args.length >= fn.length) {
			const result = fn(...args) 
			console.log('[carried] аргументов достаточно → результат:', result)
			return result
		}

		console.log('[carried] аргументов мало → возвращаем funcWaitMore')
		return (...next) => {
			console.log('[funcWaitMore] следующая порция next:', next)
			return carried(...args, ...next)
		}
	}
}


console.log(carry(sum)(3)(4))
console.log(carry(multiply)(1)(2)(3)(4))
