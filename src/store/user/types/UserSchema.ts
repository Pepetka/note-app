export interface User {
	email: string
	token: string
	id: string
}

export interface UserSchema {
	user?: User
	error?: string
	loading: boolean
}
