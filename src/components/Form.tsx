import React from "react"
import { showAlert, hideAlert } from "../store/slices/alertSlice"
import { addNote } from "../store/slices/firebaseSlice"
import { useAppDispatch } from "hooks/redux-hooks"

const Form = () => {
	const [value, setValue] = React.useState("")
	const dispatch = useAppDispatch()
	const [isChecked, setIsChecked] = React.useState(false)

	const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const onChecked = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setIsChecked((isChecked) => !isChecked)
	}

	const onShowAlert = (text: string, type: string) => {
		dispatch(
			showAlert({
				text,
				type,
			})
		)

		setTimeout(() => {
			dispatch(hideAlert())
		}, 3000)
	}

	const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (value.trim()) {
			dispatch(addNote({ title: value.trim(), isImportant: isChecked }))
			setValue("")
			setIsChecked(false)
		} else {
			onShowAlert("Enter note title", "warning")
		}
	}

	return (
		<form>
			<div className='input-group'>
				<input
					value={value}
					onChange={(e) => onValueChange(e)}
					type='text'
					className='form-control border border-primary p-2 secondary-bg primary-text'
					placeholder='Enter note title'
				/>
				<button
					onClick={(e) => onChecked(e)}
					className={`input-group-text border border-primary primary-text ${
						!isChecked ? " secondary-bg" : " primary-bg"
					}`}
					type='button'
				>
					!
				</button>
				<button
					onClick={(e) => submitHandler(e)}
					className='btn btn-outline-primary primary-bg primary-text'
					type='submit'
				>
					Add Note
				</button>
			</div>
		</form>
	)
}

export default Form
