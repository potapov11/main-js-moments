//Использовался подход со стеком, создавался объект при push,
//который имел сигнатуру value, minValue. Если в стэке уже был элемент,
//то сравнивалось value и если value в стеке было меньше чем в добавляемом элементе, то добавляемый элемент записывал в свою сигнатуру
// minValue предыдущего элемента, иначе брал свою. Таким образом посмледний элемент в стеке всегда имел minValue в сигнатуре.

class MinStack {
	constructor() {
		this.stack = [];
	}

	push(val) {
		const objMin = {
			value: val,
			minValue: null,
		};
		if (!this.stack.length) {
			objMin.minValue = val;
			this.stack.push(objMin);
		} else {
			const lastEl = this.stack[this.stack.length - 1];

			if (lastEl.minValue > val) {
				objMin.minValue = val;
			} else {
				objMin.minValue = lastEl.minValue;
			}

			this.stack.push(objMin);
		}
	}

	pop() {
		this.stack.pop();
	}

	top() {
		return this.stack[this.stack.length - 1].value;
	}

	getMin() {
		return this.stack[this.stack.length - 1].minValue;
	}
}

const newStack = new MinStack();
newStack.push(3);
newStack.push(5);
newStack.push(7);
newStack.push(1);

const min = newStack.getMin();
console.log(min);
