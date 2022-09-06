import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import Form from "../components/Form"
import Loader from "../components/Loader"
import Notes from "../components/Notes"
import { fetchNotes } from "../store/slices/firebaseSlice"
import Filters from "components/Filters"
import { useNavigate } from "react-router-dom"
import { useAuth } from "hooks/use-auth"
import { setUser } from "store/slices/userSlice"

function Home() {
	const [handleSort, setHandleSort] = useState(false)
	const dispatch = useAppDispatch()
	const { loading, notes, error } = useAppSelector((state) => state.firebase)
	const userId = useAppSelector((state) => state.user.user.id)
	const navigate = useNavigate()
	const { isAuth } = useAuth()

	React.useEffect(() => {
		if (isAuth) {
			dispatch(fetchNotes(userId!))
		} else if (localStorage.getItem("user") !== null) {
			const user = localStorage.getItem("user") || ""
			dispatch(setUser(JSON.parse(user)))
		} else {
			navigate("/login", { replace: true })
		}
		// eslint-disable-next-line
	}, [isAuth])

	const onHandleSort = () => {
		setHandleSort((handleSort) => !handleSort)
	}

	const onReload = () => {
		dispatch(fetchNotes(userId!))
	}

	return (
		<div className='pb-5'>
			<h1>Home Page</h1>
			<Form />
			<div className='d-flex justify-content-between align-items-center controller-wrapper'>
				<div className='num-notes text-primary'>Number of notes: {notes.length}</div>
				<div className='form-check form-switch sort-controller text-primary'>
					<input
						className='form-check-input'
						type='checkbox'
						checked={handleSort}
						onChange={onHandleSort}
					/>
				</div>
			</div>
			<Filters />
			{loading ? <Loader /> : <Notes handleSort={handleSort} />}
			{error.get ? (
				<div className='d-flex justify-content-center align-items-center flex-column'>
					<h1>{error.get}</h1>
					<button className='btn btn-primary' onClick={onReload}>
						Click to reload notes
					</button>
				</div>
			) : null}
		</div>
	)
}

export default Home
