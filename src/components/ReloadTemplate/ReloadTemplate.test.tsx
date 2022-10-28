import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {ReloadTemplate} from './ReloadTemplate';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';
import {StateSchema} from 'store/model/types/StateSchema';

describe('ReloadTemplate', () => {
	test('be in the document', () => {
		const state: DeepPartial<StateSchema> = {
			notes: {
				error: {
					update: undefined,
					get: 'Some get error',
				},
			},
		};

		componentTestRender(<ReloadTemplate onReload={() => {}}/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('ReloadTemplate')).toBeInTheDocument();
		expect(screen.getByText('Some get error')).toBeInTheDocument();
	});
});
