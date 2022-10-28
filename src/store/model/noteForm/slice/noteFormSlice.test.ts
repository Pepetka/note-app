import {describe, expect, test} from '@jest/globals';
import {noteFormActions, noteFormReducer} from './noteFormSlice';
import {NoteFormSchema} from '../types/NoteFormSchema';

describe('noteFormSlice', () => {
	const state: NoteFormSchema = {
		error: 'some error',
		noteContent: 'some content',
		noteTitle: 'some title',
	};

	test('set title', () => {
		expect(noteFormReducer(state, noteFormActions.setTitle('title'))).toEqual({
			...state,
			noteTitle: 'title',
			error: undefined,
		});
	});

	test('set content', () => {
		expect(noteFormReducer(state, noteFormActions.setContent('content'))).toEqual({
			...state,
			noteContent: 'content',
			error: undefined,
		});
	});

	test('set error', () => {
		expect(noteFormReducer(state, noteFormActions.setError('error'))).toEqual({
			...state,
			error: 'error',
		});
	});

	test('undefined state', () => {
		const state: NoteFormSchema = {
			error: undefined,
			noteContent: '',
			noteTitle: '',
		};

		expect(noteFormReducer(undefined, noteFormActions.setTitle('title'))).toEqual({
			...state,
			noteTitle: 'title',
		});
		expect(noteFormReducer(undefined, noteFormActions.setContent('content'))).toEqual({
			...state,
			noteContent: 'content',
		});
		expect(noteFormReducer(undefined, noteFormActions.setError('error'))).toEqual({
			...state,
			error: 'error',
		});
	});
});
