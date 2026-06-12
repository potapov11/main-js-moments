// Implement the MinStack class:

// MinStack() initializes the stack object.
// void push(int val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.
// You must implement a solution with O(1) time complexity for each function.

class MinStack {
	constructor() {
		this.stack = [];
	}

	push(element) {
		const object = {
			val: element,
			minValue: null,
		};
		if (!this.stack.length) {
			object.minValue = element;
		} else {
			const lastInStack = this.stack[this.stack.length - 1];
			if (lastInStack.minValue > element) {
				object.minValue = element;
			} else {
				object.minValue = lastInStack.minValue;
			}
		}
		this.stack.push(object);
	}

	pop() {
		this.stack.pop();
	}

	top() {
		const topElement = this.stack.pop();
		return topElement;
	}

	getMin() {
		const lastInStack = this.stack[this.stack.length - 1];
		return lastInStack.minValue;
	}

	consoleLog() {
		console.log(this.stack, 'currentStack');
	}
}

const newStack = new MinStack();
newStack.push(1);
newStack.push(3);
newStack.push(2);
newStack.push(5);
newStack.push(7);
newStack.push(2);
newStack.push(18);
newStack.push(114);

newStack.consoleLog();
