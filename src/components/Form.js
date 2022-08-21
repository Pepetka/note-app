import React from "react"
import { AlertContext } from "../context/alert/alertContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const Form = () => {
	const [value, setValue] = React.useState("")
	const { showAlert } = React.useContext(AlertContext)
	const { addNote } = React.useContext(FirebaseContext)

	const onValueChange = (value) => {
		setValue(value)
	}

	const submitHandler = (e) => {
		e.preventDefault()

		if (value.trim()) {
			addNote(value.trim())
				.then(() => showAlert("Note created", "success"))
				.catch(() => showAlert("Note wasn't created", "danger"))
			onValueChange("")
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
					className='form-control p-2'
					placeholder='Enter note title'
				/>
			</div>
		</form>
	)
}

export default Form
