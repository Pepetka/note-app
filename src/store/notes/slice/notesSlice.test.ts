import {describe, expect, test} from '@jest/globals';
import notesReducer, {FilterTypes, notesActions} from './notesSlice';
import {NotesSchema} from '../types/NotesSchema';

describe('notesSlice', () => {
	test('set notes', () => {
		const state: NotesSchema = {
			notes: [
				{
					date: 'date',
					id: 'id',
					isDisable: false,
					order: 0,
					title: 'title',
					isImportant: true,
				},
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.ALL,
		};

		expect(notesReducer(state, notesActions.setNotes({notes: [
			{
				date: 'date',
				id: 'id 0',
				isDisable: false,
				order: 0,
				title: 'title 0',
				isImportant: true,
			},
			{
				date: 'date',
				id: 'id 1',
				isDisable: true,
				order: 1,
				title: 'title 1',
				isImportant: false,
			},
		]}))).toEqual({
			notes: [
				{
					date: 'date',
					id: 'id 0',
					isDisable: false,
					order: 0,
					title: 'title 0',
					isImportant: true,
				},
				{
					date: 'date',
					id: 'id 1',
					isDisable: true,
					order: 1,
					title: 'title 1',
					isImportant: false,
				},
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.ALL,
		});
	});

	test('clear notes', () => {
		const state: NotesSchema = {
			notes: [
				{
					date: 'date',
					id: 'id',
					isDisable: false,
					order: 0,
					title: 'title',
					isImportant: true,
				},
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.ALL,
		};

		expect(notesReducer(state, notesActions.clearNotes())).toEqual({
			notes: [
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.ALL,
		});
	});

	test('change notes filter', () => {
		const state: NotesSchema = {
			notes: [
				{
					date: 'date',
					id: 'id',
					isDisable: false,
					order: 0,
					title: 'title',
					isImportant: true,
				},
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.ALL,
		};

		expect(notesReducer(state, notesActions.changeFilter({filter: FilterTypes.DISABLE}))).toEqual({
			notes: [
				{
					date: 'date',
					id: 'id',
					isDisable: false,
					order: 0,
					title: 'title',
					isImportant: true,
				},
			],
			error: {
				get: 'get error',
				update: 'update error',
			},
			loading: false,
			filter: FilterTypes.DISABLE,
		});
	});

	test('undefined state', () => {
		expect(notesReducer(undefined, notesActions.setNotes({notes: [
			{
				date: 'date',
				id: 'id',
				isDisable: false,
				order: 0,
				title: 'title',
				isImportant: true,
			},
		]}))).toEqual({
			notes: [
				{
					date: 'date',
					id: 'id',
					isDisable: false,
					order: 0,
					title: 'title',
					isImportant: true,
				},
			],
			loading: false,
			filter: FilterTypes.ACTIVE,
			error: {
				get: null,
				update: null,
			},
		});
		expect(notesReducer(undefined, notesActions.clearNotes())).toEqual({
			notes: [],
			loading: false,
			filter: FilterTypes.ACTIVE,
			error: {
				get: null,
				update: null,
			},
		});
		expect(notesReducer(undefined, notesActions.changeFilter({filter: FilterTypes.DISABLE}))).toEqual({
			notes: [],
			loading: false,
			filter: FilterTypes.DISABLE,
			error: {
				get: null,
				update: null,
			},
		});
	});
});
