import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { CSSTransition } from "react-transition-group"
import { hideAlert } from "../store/slices/alertSlice"

const Alert = () => {
	const dispatch = useDispatch()
	const { type, visible, text } = useSelector((store) => store.alert)

	return (
		<CSSTransition
			mountOnEnter
			unmountOnExit
			in={visible}
			timeout={{
				enter: 500,
				exit: 200,
			}}
			classNames='animate-alert'
		>
			<div className={`alert alert-${type} alert-dismissible`}>
				<strong>Attention!</strong>
				<br />
				{text}
				<button onClick={() => dispatch(hideAlert())} type='button' className='btn-close'></button>
			</div>
		</CSSTransition>
	)
}

export default Alert
