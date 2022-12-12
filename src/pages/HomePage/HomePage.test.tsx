import {act, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {HomePage} from './HomePage';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';
import {StateSchema} from 'store/model/types/StateSchema';
import userEvent from '@testing-library/user-event';

describe('HomePage', () => {
	test('be in the document', () => {
		componentTestRender(<HomePage/>);
		expect(screen.getByTestId('HomePage')).toBeInTheDocument();
		expect(screen.getByTestId('NoteAddForm')).toBeInTheDocument();
		expect(screen.getByTestId('NotesControlPanel')).toBeInTheDocument();
		expect(screen.getByTestId('Filters')).toBeInTheDocument();
	});

	test('with notes', () => {
		const state: DeepPartial<StateSchema> = {
			notes: {
				loading: false,
				notes: [{
					id: '10101',
					title: 'Note title 1',
					date: '30.03.2000, 21:00:00',
					isImportant: false,
					isDisable: false,
					order: 0,
				}],
				error: {},
			},
		};

		componentTestRender(<HomePage/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('Notes')).toBeInTheDocument();
	});

	test('loading', () => {
		const state: DeepPartial<StateSchema> = {
			notes: {
				loading: true,
				notes: [],
				error: {},
			},
		};

		componentTestRender(<HomePage/>, {initialState: state as StateSchema});
		expect(screen.queryByTestId('Notes')).not.toBeInTheDocument();
		expect(screen.getByTestId('NoteSkeleton')).toBeInTheDocument();
	});

	test('fetch error', () => {
		const state: DeepPartial<StateSchema> = {
			notes: {
				loading: false,
				notes: [],
				error: {
					update: undefined,
					get: 'fetch error',
				},
			},
		};

		componentTestRender(<HomePage/>, {initialState: state as StateSchema});
		expect(screen.queryByTestId('Notes')).not.toBeInTheDocument();
		expect(screen.getByTestId('ReloadTemplate')).toBeInTheDocument();
	});

	test('open modal', async () => {
		const state: DeepPartial<StateSchema> = {
			notes: {
				loading: false,
				notes: [],
				error: {},
			},
		};

		componentTestRender(<HomePage/>, {initialState: state as StateSchema});

		expect(screen.queryByTestId('Modal')).not.toBeInTheDocument();
		await act(() => {
			userEvent.click(screen.getByTestId('NoteAddButton'));
		});

		expect(screen.getByTestId('Modal')).toBeInTheDocument();
		expect(screen.getByTestId('NoteAddFormWithContent')).toBeInTheDocument();
	});
});
