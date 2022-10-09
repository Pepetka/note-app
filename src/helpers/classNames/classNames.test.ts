import {describe, expect, test} from '@jest/globals';
import {classNames} from './classNames';

describe('classNames', () => {
	test('with first argument only', () => {
		expect(classNames([])).toBe('');
		expect(classNames(['first class'])).toBe('first class');
		expect(classNames(['first_class', 'second_class'])).toBe('first_class second_class');
	});

	test('with second argument only', () => {
		expect(classNames([], {true_class: true})).toBe('true_class');
		expect(classNames([], {false_class: false})).toBe('');
		expect(classNames([], {true_class: true, false_class: false})).toBe('true_class');
		expect(classNames([], {true_class: true, false_class: false, true_class_second: true})).toBe('true_class true_class_second');
	});
});
