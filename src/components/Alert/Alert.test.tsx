import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Alert} from './Alert';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';
import {DeepPartial} from '@reduxjs/toolkit';
import {StateSchema} from 'store/model/types/StateSchema';

describe('Alert', () => {
	test('be in the document', async () => {
		const state: DeepPartial<StateSchema> = {
			alert: {
				type: 'success',
				visible: true,
				text: 'Some alert text',
			},
		};

		componentTestRender(<Alert/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('Alert')).toBeInTheDocument();
		expect(screen.getByText('Some alert text')).toBeInTheDocument();
	});

	test('success alert', async () => {
		const state: DeepPartial<StateSchema> = {
			alert: {
				type: 'success',
				visible: true,
				text: '',
			},
		};

		componentTestRender(<Alert/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('Alert')).toHaveClass('success');
	});

	test('warning alert', async () => {
		const state: DeepPartial<StateSchema> = {
			alert: {
				type: 'warning',
				visible: true,
				text: '',
			},
		};

		componentTestRender(<Alert/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('Alert')).toHaveClass('warning');
	});

	test('danger alert', async () => {
		const state: DeepPartial<StateSchema> = {
			alert: {
				type: 'danger',
				visible: true,
				text: '',
			},
		};

		componentTestRender(<Alert/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('Alert')).toHaveClass('danger');
	});
});
