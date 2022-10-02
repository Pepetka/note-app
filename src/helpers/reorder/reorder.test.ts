import {describe, expect, test} from '@jest/globals';
import {reorder} from './reorder';

describe('reorder', () => {
	const testArray = [
		0, 1, 2, 3, 4, 5,
	];

	test('swap elements', () => {
		expect(reorder(testArray, 0, 5)).toEqual([
			1, 2, 3, 4, 5, 0,
		]);
		expect(reorder(testArray, 5, 0)).toEqual([
			5, 0, 1, 2, 3, 4,
		]);
	});
});
