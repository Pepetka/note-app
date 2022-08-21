import React from "react"
import { CSSTransition } from "react-transition-group"
import { AlertContext } from "../context/alert/alertContext"

const Alert = () => {
	const { alert, hideAlert } = React.useContext(AlertContext)

	return (
		<CSSTransition
			mountOnEnter
			unmountOnExit
			in={alert.visible}
			timeout={{
				enter: 500,
				exit: 200,
			}}
			classNames='animate-alert'
		>
			<div className={`alert alert-${alert.type} alert-dismissible`}>
				<strong>Attention!</strong>
				<br />
				{alert.text}
				<button onClick={hideAlert} type='button' className='btn-close'></button>
			</div>
		</CSSTransition>
	)
}

export default Alert
