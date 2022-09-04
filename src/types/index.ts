export interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

export interface FirebaseState {
	notes: Note[]
	loading: boolean
	filter: string
}
