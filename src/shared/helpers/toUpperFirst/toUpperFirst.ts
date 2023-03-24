/**
 * Функция возвращающая строку с заглавной первой буквой
 * @param string - строка, первую букву которой необходимо сделать заглавной
 */
export const toUpperFirs = (string: string): string => {
	return string[0].toUpperCase() + string.slice(1);
};
