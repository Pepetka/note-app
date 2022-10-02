import {describe, expect, test} from '@jest/globals';
import {withoutId} from './withoutId';

describe('withoutId', () => {
	const testObject = {
		firstKey: 'firstValue',
		id: 'idValue',
		secondKey: 'secondValue',
	};

	test('some object with id field', () => {
		expect(withoutId(testObject)).toEqual({
			firstKey: 'firstValue',
			secondKey: 'secondValue',
		});
	});
});
