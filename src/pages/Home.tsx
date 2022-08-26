import React from "react"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import Form from "../components/Form"
import Loader from "../components/Loader"
import Notes from "../components/Notes"
import { fetchNotes } from "../store/slices/firebaseSlice"
import Filters from "components/Filters"

const url = process.env.REACT_APP_DB_URL

function Home() {
	const dispatch = useAppDispatch()
	const { loading, notes } = useAppSelector((state) => state.firebase)

	React.useEffect(() => {
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
		<div className='pb-5 home'>
			<h1>Home Page</h1>
			<Form />
			<div className='pt-3 pb-3 text-end num-notes'>Number of notes: {notes.length}</div>
			<Filters />
			{loading ? <Loader /> : <Notes />}
		</div>
	)
}

export default Home
