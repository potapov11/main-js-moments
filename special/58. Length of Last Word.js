var lengthOfLastWord = function (s) {
	const strTrim = s.trim();
	const lastIndex = strTrim.split(' ').length - 1;
	return strTrim.split(' ')[lastIndex].length;
};

console.log(lengthOfLastWord('   fly me   to   the moon  '));
