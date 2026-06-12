const s = 'a#c';
const t = 'b';

var backspaceCompare = function (s, t) {
	const firstStack = [];
	const secondStack = [];

	const backSpace = '#';

	for (let i = 0; i < s.length; i++) {
		if (s[i] !== backSpace) {
			firstStack.push(s[i]);
		} else {
			if (firstStack.length) {
				firstStack.pop();
			}
		}
	}

	for (let i = 0; i < t.length; i++) {
		if (t[i] !== backSpace) {
			secondStack.push(t[i]);
		} else {
			if (secondStack.length) {
				secondStack.pop();
			}
		}
	}

	const stringFirst = firstStack.join('');
	const stringSecond = secondStack.join('');

	return stringFirst === stringSecond;
};

backspaceCompare(s, t);

//2 вариант

const m = 'a#cd';
const n = 'a#cd';

var backspaceCompare = function (s, t) {
	let i = s.length - 1;
	let j = t.length - 1;

	let skipS = 0;
	let skipT = 0;

	while (i >= 0 || j >= 0) {
		while (i >= 0) {
			if (s[i] == '#') {
				skipS++;
				i--;
			} else if (skipS > 0) {
				i--;
			} else {
				break;
			}
		}
	}

	while (j >= 0) {
		if (t[j] == '#') {
			skipT++;
			j--;
		} else if (skipT > 0) {
			j--;
		} else {
			break;
		}
	}

	const charS = i >= 0 ? s[i] : null;
	const charT = j >= 0 ? t[j] : null;

	if (charS !== charT) {
		return false;
	}

	i--;
	j--;
};
