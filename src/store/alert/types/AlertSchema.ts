export type AlertType = 'success' | 'warning' | 'danger'

export interface AlertSchema {
	text: string
	type: AlertType
	visible: boolean
}
