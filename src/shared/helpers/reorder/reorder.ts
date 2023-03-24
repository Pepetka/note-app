/**
 * Функция, перемещающая элемент массива с startIndex позиции в endIndex позицию
 * @param list - массив, элемент которого перемещается
 * @param startIndex - позиция, перемещаемого элемента
 * @param endIndex - позиция, в которую перемещается элемент
 */
export const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};
