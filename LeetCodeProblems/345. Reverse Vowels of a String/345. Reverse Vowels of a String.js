const s = 'IceCreAm';
// AceCreIm

var reverseVowels = function (s) {
	const englishVowels = ['a', 'e', 'i', 'o', 'u'];
	let start = 0;
	let end = s.length - 1;
	s = s.split('');

	while (start < end) {
		while (start < end && !englishVowels.includes(s[start].toLowerCase())) {
			start++;
		}
		while (start < end && !englishVowels.includes(s[end].toLowerCase())) {
			end--;
		}

		if (englishVowels.includes(s[start].toLowerCase()) && englishVowels.includes(s[end].toLowerCase())) {
			[s[start], s[end]] = [s[end], s[start]];
			start++;
			end--;
		}
	}

	return s.join('');
};

console.log(reverseVowels(s));
