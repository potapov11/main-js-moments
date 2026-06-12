var solution = function (isBadVersion) {
	/**
	 * @param {integer} n Total versions
	 * @return {integer} The first bad version
	 */

	return function (n) {
		let start = 1;
		let end = n;

		while (start < end) {
			let middle = Math.floor((start + end) / 2);

			if (isBadVersion(middle)) {
				end = middle - 1;
			}

			if (!isBadVersion(middle)) {
				start = middle + 1;
			}
		}

		return start;
	};
};
