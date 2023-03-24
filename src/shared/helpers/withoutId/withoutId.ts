/**
 * Функция, возвращающая объект без поля 'id'
 * @param obj - объект, из которого необходимо убрать поле 'id'
 */
export const withoutId = (obj: Record<string, any>): Record<string, any> => {
	const result: Record<string, any> = {};
	for (const key of Object.keys(obj)) {
		if ('id' !== key) {
			result[key] = obj[key];
		}
	}
	return result;
};
