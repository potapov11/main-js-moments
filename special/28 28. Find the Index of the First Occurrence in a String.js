const haystack = 'sadbutsbutad';
const needle = 'but';

var strStr = function (haystack, needle) {
	let start = 0;
	let currentIndex = 0;

	for (let i = 0; i < haystack.length; i++) {
		if (haystack[i] === needle[currentIndex]) {
			if (currentIndex === 0) {
				start = i;
			}

			if (currentIndex === needle.length - 1) {
				return start;
			}

			currentIndex += 1;
		} else {
			start = -1;
			currentIndex = 0;
		}
	}

	return -1;
};

console.log(strStr(haystack, needle));
