import { CSSTransition } from "react-transition-group"
import { hideAlert } from "../store/slices/alertSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"

const Alert = () => {
	const dispatch = useAppDispatch()
	const { type, visible, text } = useAppSelector((store) => store.alert)

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
