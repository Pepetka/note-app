export const classNames = (classes: Array<string | undefined>, addClasses: Record<string, boolean | undefined> = {}) => {
	return [
		...classes,
		...Object.entries(addClasses).filter(([_, value]) => value).map(([key, _]) => key),
	].join(' ');
};
