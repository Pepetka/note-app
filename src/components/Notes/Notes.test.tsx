import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Notes} from './Notes';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';
import {DeepPartial} from '@reduxjs/toolkit';
import {StateSchema} from 'store/model/types/StateSchema';
import {FilterTypes, Note} from 'store/model/notes/types/NotesSchema';

describe('Notes', () => {
	test('be in the document', () => {
		const notes: Array<Note> = [
			{
				order: 0,
				isImportant: false,
				title: 'some title',
				isDisable: false,
				date: 'some date',
				id: '',
			},
		];

		const state: DeepPartial<StateSchema> = {
			notes: {
				notes,
				filter: FilterTypes.ALL,
				loading: false,
				error: {},
			},
		};

		componentTestRender(<Notes handleSort={false}/>, {initialState: state as StateSchema});
		expect(screen.getByTestId('Notes')).toBeInTheDocument();
		expect(screen.getByTestId('NotesList')).toBeInTheDocument();
		expect(screen.getByTestId('NotesItem')).toBeInTheDocument();
		expect(screen.getByText('some title')).toBeInTheDocument();
		expect(screen.getByText('some date')).toBeInTheDocument();
	});

	test('without notes', () => {
		componentTestRender(<Notes handleSort={false}/>);
		expect(screen.getByText('There are no notes')).toBeInTheDocument();
	});
});
