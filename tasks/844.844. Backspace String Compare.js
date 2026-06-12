const s = 'ab#c',
	t = 'ab#d#c';

var backspaceCompare = function (s, t) {
	let sEnd = s.length - 1;
	let tEnd = t.length - 1;

	function getNextChar(str, index) {
		let skip = 0;
		while (index >= 0) {
			if (str[index] === '#') {
				skip++;
				index--;
			} else if (skip > 0) {
				skip--;
				index--;
			} else {
				return index;
			}
		}
		return -1;
	}

	while (sEnd >= 0 || tEnd >= 0) {
		sEnd = getNextChar(s, sEnd);
		tEnd = getNextChar(t, tEnd);

		console.log(sEnd, 'sEnd');
		console.log(tEnd, 'tEnd');

		if (sEnd === -1 && tEnd === -1) return true;
		if (sEnd === -1 || tEnd === -1) return false;
		if (s[sEnd] !== t[tEnd]) return false;

		sEnd--;
		tEnd--;
	}

	return true;
};

console.log(backspaceCompare(s, t));

// var backspaceCompare = function (s, t) {
// 	let sEnd = s.length - 1;
// 	let tEnd = t.length - 1;

// 	function getNextChar(str, index) {
// 		let skip = 0;
// 		while (str[index] === '#') {
// 			skip++;
// 		}

// 		while (skip > 0) {
// 			index--;
// 			skip--;
// 		}

// 		return index;
// 	}

// 	while (sEnd >= 0 || tEnd >= 0) {
// 		sEnd = getNextChar(s, sEnd);
// 		tEnd = getNextChar(t, tEnd);

// 		if (s[sEnd] === t[tEnd]) {
// 			sEnd--;
// 			tEnd--;
// 		} else {
// 			return false;
// 		}
// 	}

// 	return true;
// };
