import React from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import Form from "../components/Form"
import Loader from "../components/Loader"
import Notes from "../components/Notes"
import { changeHand, fetchNotes, setHand } from "../store/slices/firebaseSlice"
import Filters from "components/Filters"
import { useNavigate } from "react-router-dom"
import { useAuth } from "hooks/use-auth"
import { setUser } from "store/slices/userSlice"

const url = process.env.REACT_APP_DB_URL

function Home() {
	const dispatch = useAppDispatch()
	const { loading, notes, leftHand } = useAppSelector((state) => state.firebase)
	const { id } = useAppSelector((state) => state.user)
	const navigate = useNavigate()
	const { isAuth } = useAuth()

	const onChangeHand = () => {
		localStorage.setItem("leftHand", String(!leftHand))
		dispatch(changeHand())
	}

	React.useEffect(() => {
		if (localStorage.getItem("leftHand")) {
			dispatch(setHand({ leftHand: localStorage.getItem("leftHand") === "true" }))
		}

		if (isAuth) {
			axios
				.get(`${url}/${id}/notes.json`)
				.then((response) =>
					response.data
						? Object.keys(response.data)
								.map((key) => ({
									...response.data[key],
									id: key,
								}))
								.sort((a, b) => {
									if (!a.hasOwnProperty("order")) return 1

									return a.order - b.order
								})
						: []
				)
				.then((response) => dispatch(fetchNotes({ users: response })))
		} else if (localStorage.getItem("user") !== null) {
			const user = localStorage.getItem("user") || ""
			dispatch(setUser(JSON.parse(user)))
		} else {
			navigate("/login", { replace: true })
		}
		// eslint-disable-next-line
	}, [isAuth])

	return (
		<div className='pb-5'>
			<h1>Home Page</h1>
			<Form />
			<div className='d-flex justify-content-between align-items-center controller-wrapper'>
				<div className='num-notes text-primary'>Number of notes: {notes.length}</div>
				<div className='form-check form-switch left-right-controller text-primary'>
					<input
						className='form-check-input'
						type='checkbox'
						checked={leftHand}
						onChange={onChangeHand}
					/>
				</div>
			</div>
			<Filters />
			{loading ? <Loader /> : <Notes />}
		</div>
	)
}

export default Home
