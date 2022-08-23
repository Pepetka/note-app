import React from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { showAlert, hideAlert } from "../store/slices/alertSlice"
import { addNote } from "../store/slices/firebaseSlice"

const url = process.env.REACT_APP_DB_URL

const Form = () => {
	const [value, setValue] = React.useState("")
	const dispatch = useDispatch()
	const [isChecked, setIsChecked] = React.useState(false)

	const onValueChange = (value) => {
		setValue(value)
	}

	const onChecked = () => {
		setIsChecked((isChecked) => !isChecked)
	}

	const onKeyDown = (event) => {
		if (event.key === "Enter" || event.key === " ") onChecked()
	}

	const onShowAlert = (text, type) => {
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

	const onAddNote = async (title, isImportant) => {
		const note = { title, date: new Date().toJSON(), isImportant }

		try {
			const response = await axios.post(`${url}/notes.json`, note)

			const user = {
				id: response.data.name,
				...note,
			}

			dispatch(addNote({ user }))
		} catch (error) {
			throw new Error(error.message)
		}
	}

	const submitHandler = (e) => {
		e.preventDefault()

		if (value.trim()) {
			onAddNote(value.trim(), isChecked)
				.then(() => onShowAlert("Note created", "success"))
				.catch(() => onShowAlert("Note wasn't created", "danger"))
			onValueChange("")
			setIsChecked(false)
		} else {
			onShowAlert("Enter note title", "warning")
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
						onChange={onChecked}
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
