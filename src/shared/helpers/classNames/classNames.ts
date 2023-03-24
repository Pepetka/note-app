/**
 * Функция, возвращающая классы в виде строки
 * @param classes - массив классов, применяемых всегда
 * @param addClasses - объект в виде {дополнительный класс: условие, по которому добавляется класс}
 */
export const classNames = (classes: Array<string | undefined>, addClasses: Record<string, boolean | undefined> = {}) => {
	return [
		...classes,
		...Object.entries(addClasses).filter(([_, value]) => value).map(([key, _]) => key),
	].join(' ');
};
