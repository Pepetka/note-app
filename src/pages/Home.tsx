import React from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import Form from "../components/Form"
import Loader from "../components/Loader"
import Notes from "../components/Notes"
import { fetchNotes, showLoader } from "../store/slices/firebaseSlice"

const url = process.env.REACT_APP_DB_URL

function Home() {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.firebase)

	React.useEffect(() => {
		dispatch(showLoader)

		axios
			.get(`${url}/notes.json`)
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
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<h1>Home Page</h1>
			<Form />
			<hr />
			{loading ? <Loader /> : <Notes />}
		</>
	)
}

export default Home
