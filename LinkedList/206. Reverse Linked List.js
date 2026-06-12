/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

const node3 = ListNode(3, null);
const node2 = ListNode(2, node3);
const node1 = ListNode(1, node2);

var reverseList = function (head) {
	// Инициализируем два указателя:
	// prev - будет хранить предыдущий узел (начинаем с null)
	// curr - текущий узел (начинаем с head)

	let prev = null;
	let curr = head;

	// Пока текущий узел существует (не дошли до конца)
	while (curr !== null) {
		// 1. СОХРАНИ следующий узел во временную переменную
		//    (иначе потеряешь доступ к остатку списка)
		let nextTemp = curr.next;

		// 2. РАЗВЕРНИ ссылку: текущий узел должен указывать на предыдущий
		//    (вместо следующего)
		curr.next = prev;

		// 3. СДВИНЬ указатели для следующей итерации:
		//    - prev становится текущим узлом
		//    - curr становится сохраненным следующим узлом
		prev = curr;
		curr = nextTemp;

		// Повторяем, пока не дойдем до конца
	}

	// В конце prev указывает на новый первый узел (последний в исходном списке)
	return prev;
};

// 1 -> 2 -> 3 -> null
//На первой итерации  заносим в nextTemp - 1
// curr.next = null;
// prev = null;
