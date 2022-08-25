import React from "react"
import { ChangeEvent } from "react"
import axios from "axios"
import { showAlert, hideAlert } from "../store/slices/alertSlice"
import { addNote } from "../store/slices/firebaseSlice"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"

const url = process.env.REACT_APP_DB_URL

interface Note {
	id: string
	title: string
	date: string
	isImportant: boolean
	isDisable: boolean
	order: number
}

function getMaxOrder(notes: Note[]) {
	let max = 0
	notes.forEach((note) => {
		max = Math.max(max, note.order)
	})
	return max
}

const Form = () => {
	const [value, setValue] = React.useState("")
	const dispatch = useAppDispatch()
	const { notes } = useAppSelector((state) => state.firebase)
	const [isChecked, setIsChecked] = React.useState(false)

	const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	const onChecked = () => {
		setIsChecked((isChecked) => !isChecked)
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		if (e.key === "Enter" || e.key === " ") onChecked()
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
			order: getMaxOrder(notes) + 1,
		}

		try {
			const response = await axios.post(`${url}/notes.json`, note)

			const user = {
				id: response.data.name,
				...note,
			}

			dispatch(addNote({ user }))
		} catch (error) {
			throw new Error((error as Error).message)
		}
	}

	const submitHandler = (e: React.FormEvent) => {
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
		<form onSubmit={(e) => submitHandler(e)}>
			<div className='input-group'>
				<input
					value={value}
					onChange={(e) => onValueChange(e)}
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
				<button onClick={(e) => submitHandler(e)} className='btn btn-primary' type='button'>
					Add Note
				</button>
			</div>
		</form>
	)
}

export default Form
