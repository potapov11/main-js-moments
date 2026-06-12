// 225. Implement Stack using Queues
// Реализуйте стек (LIFO) с помощью двух очередей.
// Пример:
// Операции:
// const myStack = new MyStack();
// myStack.push(1);
// myStack.push(2);
// console.log(myStack.top());   // 2
// console.log(myStack.pop());   // 2
// console.log(myStack.empty()); // false

/**
 * Идея: реализовать стек, используя только операции очереди.
 * Разрешено:
 *  - enqueue (добавить в конец)
 *  - dequeue (удалить из начала)
 *  - peek/front (получить первый элемент)
 *  - size (размер)
 *  - isEmpty (пустая ли)
 */

class MyStack {
	constructor() {
		// здесь инициализируйте две очереди (например, через массивы)
	}

	/**
	 * @param {number} x
	 * @return {void}
	 */
	push(x) {
		// ...
	}

	/**
	 * @return {number}
	 */
	pop() {
		// ...
	}

	/**
	 * @return {number}
	 */
	top() {
		// ...
	}

	/**
	 * @return {boolean}
	 */
	empty() {
		// ...
	}
}

// пример использования:
const myStack = new MyStack();
myStack.push(1);
myStack.push(2);
console.log(myStack.top()); // ожидается 2
console.log(myStack.pop()); // ожидается 2
console.log(myStack.empty()); // ожидается false
