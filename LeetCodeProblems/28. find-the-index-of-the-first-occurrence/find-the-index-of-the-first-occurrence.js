var strStr = function (hayStack, needle) {
	const haystackLentgh = hayStack.length;
	const needleLength = needle.length;

	for (let i = 0; i < haystackLentgh - needleLength; i++) {
		let j = 0;
		for (j = 0; j < needleLength; j++) {
			if (hayStack[i + j] !== needle[j]) {
				break;
			}
		}

		if (j === needleLength) {
			return i;
		}
	}

	return -1;
};
