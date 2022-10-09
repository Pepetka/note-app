import {FilterTypes} from '../slice/notesSlice';

export interface Note {
	id?: string
	title: string
	content?: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

export interface NotesSchema {
	notes: Note[]
	loading: boolean
	filter: FilterTypes
	error: {
		get: string | null
		update: string | null
	}
}
