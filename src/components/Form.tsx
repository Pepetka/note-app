import React from "react"
import { ChangeEvent } from "react"
import axios from "axios"
import { showAlert, hideAlert } from "../store/slices/alertSlice"
import { addNote } from "../store/slices/firebaseSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"

const url = process.env.REACT_APP_DB_URL

const Form = () => {
	const [value, setValue] = React.useState("")
	const dispatch = useAppDispatch()
	const { notes } = useAppSelector((state) => state.firebase)
	const { id } = useAppSelector((state) => state.user)
	const [isChecked, setIsChecked] = React.useState(false)

	const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const onChecked = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		event.stopPropagation()
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

	const onAddNote = async (title: string, isImportant: boolean) => {
		const note = {
			title,
			date: new Date().toLocaleString(),
			isImportant,
			isDisable: false,
			order: notes.length,
		}

		try {
			const response = await axios.post(`${url}/${id}/notes.json`, note)

			const user = {
				id: response.data.name,
				...note,
			}

			dispatch(addNote({ user }))
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}

	const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (value.trim()) {
			onAddNote(value.trim(), isChecked)
				.then(() => onShowAlert("Note created", "success"))
				.catch(() => onShowAlert("Note wasn't created", "danger"))
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
					className='form-control border border-primary p-2'
					placeholder='Enter note title'
				/>
				<button
					onClick={(e) => onChecked(e)}
					className={
						isChecked
							? "input-group-text bg-primary text-white border border-primary"
							: "input-group-text bg-white text-primary border border-primary"
					}
					type='button'
				>
					!
				</button>
				<button onClick={(e) => submitHandler(e)} className='btn btn-primary' type='submit'>
					Add Note
				</button>
			</div>
		</form>
	)
}

export default Form
