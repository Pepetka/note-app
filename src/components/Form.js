import React from "react"
import { AlertContext } from "../context/alert/alertContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const Form = () => {
	const [value, setValue] = React.useState("")
	const [isChecked, setIsChecked] = React.useState(false)
	const { showAlert } = React.useContext(AlertContext)
	const { addNote } = React.useContext(FirebaseContext)

	const onValueChange = (value) => {
		setValue(value)
	}

	const onChacked = () => {
		setIsChecked((isChecked) => !isChecked)
	}

	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") onChacked()
	}

	const submitHandler = (e) => {
		e.preventDefault()

		if (value.trim()) {
			addNote(value.trim(), isChecked)
				.then(() => showAlert("Note created", "success"))
				.catch(() => showAlert("Note wasn't created", "danger"))
			onValueChange("")
			setIsChecked(false)
		} else {
			showAlert("Enter note title", "warning")
		}
	}

	return (
		<form onSubmit={(e) => submitHandler(e)}>
			<div className='input-group'>
				<input
					value={value}
					onChange={(e) => onValueChange(e.target.value)}
					type='text'
					className='form-control border border-primary p-2'
					placeholder='Enter note title'
				/>
				<div
					className={
						isChecked
							? "input-group-text bg-primary text-white border border-primary"
							: "input-group-text bg-white text-primary border border-primary"
					}
				>
					<label htmlFor='checkbox' tabIndex={0} onKeyDown={(e) => onKeyDown(e)}>
						Important
					</label>
					<input
						checked={isChecked}
						onChange={onChacked}
						id='checkbox'
						className='form-check-input d-none'
						type='checkbox'
					/>
				</div>
			</div>
		</form>
	)
}

export default Form
