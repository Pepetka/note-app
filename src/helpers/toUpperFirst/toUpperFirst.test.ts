import {describe, expect, test} from '@jest/globals';
import {toUpperFirs} from './toUpperFirst';

describe('toUpperFirst', () => {
	test('to uppercase first letter', () => {
		expect(toUpperFirs('string')).toBe('String');
	});
});
