// Дан массив строк strs.
// Нужно сгруппировать анаграммы вместе и вернуть массив групп.

// Примеры:

// ["eat","tea","tan","ate","nat","bat"] -> [["eat","tea","ate"],["tan","nat"],["bat"]]
// [""] -> [[""]]
// ["a"] -> [["a"]]

function groupAnagam(arr = ["eat","tea","tan","ate","nat","bat"]) {
	const hashMap = new Map();

	function sortEl(el) {
		return el.split('').sort().join('');
	}

	for(let i = 0; i < arr.length; i++) {
		const key = sortEl(arr[i]);

		if(!hashMap.has(key)) {
			hashMap.set(key, [arr[i]])
		} else {
			hashMap.get(key).push(arr[i]);
		}
	}

	return [...hashMap.values()]
}

groupAnagam();
