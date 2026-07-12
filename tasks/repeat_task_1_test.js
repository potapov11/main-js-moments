//на вход даны данные '-', '1', '2', '3', '4', '5'
//необходимо написать функцию разделитель чтобы итог был
//'1-2-3-4-5'

function dividestring(...args) {
	if (!args.length || args.length === 0) return;

	const divider = args[0];
	const rest = args.slice(1);

	return rest.join(divider);
}

console.log(dividestring('-', '1', '2', '3', '4', '5'));
