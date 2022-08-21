import React from "react"
import { AlertContext } from "../context/alert/alertContext"

const Alert = () => {
	const { alert, hideAlert } = React.useContext(AlertContext)

	if (!alert.visible) return null

	return (
		<div className={`alert alert-${alert.type} alert-dismissible`}>
			<strong>Attention!</strong>
			<br />
			{alert.text}
			<button onClick={hideAlert} type='button' className='btn-close'></button>
		</div>
	)
}

export default Alert
