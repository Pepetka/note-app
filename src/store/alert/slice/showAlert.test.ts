import {describe, expect, test} from '@jest/globals';
import alertReducer, {alertActions} from './alertSlice';
import {AlertSchema} from '../types/AlertSchema';

describe('showAlert', () => {
	test('show alert', () => {
		const state: AlertSchema = {
			text: '',
			visible: false,
			type: 'warning',
		};

		expect(alertReducer(state, alertActions.showAlert({
			text: 'alert text',
			type: 'success',
		}))).toEqual({
			text: 'alert text',
			visible: true,
			type: 'success',
		});
	});

	test('hide alert', () => {
		const state: AlertSchema = {
			text: 'alert text',
			visible: true,
			type: 'success',
		};

		expect(alertReducer(state, alertActions.hideAlert())).toEqual({
			text: 'alert text',
			visible: false,
			type: 'success',
		});
	});

	test('undefined state', () => {
		expect(alertReducer(undefined, alertActions.showAlert({
			text: 'alert text',
			type: 'success',
		}))).toEqual({
			text: 'alert text',
			visible: true,
			type: 'success',
		});
		expect(alertReducer(undefined, alertActions.hideAlert())).toEqual({
			text: '',
			visible: false,
			type: 'danger',
		});
	});
});
