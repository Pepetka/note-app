import React from "react"
import { HIDE_ALERT, SHOW_ALERT } from "../types"
import { AlertContext } from "./alertContext"
import { alertReducer } from "./alertReducer"

const AlertState = ({ children }) => {
	const [state, dispatch] = React.useReducer(alertReducer, { visible: false })

	const showAlert = (text, type = "warning") =>
		dispatch({
			type: SHOW_ALERT,
			payload: { text, type },
		})

	const hideAlert = () =>
		dispatch({
			type: HIDE_ALERT,
		})

	return (
		<AlertContext.Provider
			value={{
				showAlert,
				hideAlert,
				alert: state,
			}}
		>
			{children}
		</AlertContext.Provider>
	)
}

export default AlertState
