class MinStack {
	constructor() {
		this.stack = [];
	}

	push(arg) {
		const prevMin = this.stack.length ? this.stack[this.stack.length - 1].minValue : arg;
		const minValue = Math.min(prevMin, arg);

		const object = {
			value: arg,
			minValue: minValue,
		};

		this.stack.push(object);
	}

	pop() {
		this.stack.pop();
	}

	peek() {
		if (!this.stack.length) {
			return -1;
		}

		return this.stack[this.stack.length - 1].value;
	}

	getMin() {
		if (!this.stack.length) {
			return -1;
		}

		return this.stack[this.stack.length - 1].minValue;
	}
}
