import React from "react"
import Form from "../components/Form"
import Loader from "../components/Loader"
import Notes from "../components/Notes"
import { FirebaseContext } from "../context/firebase/firebaseContext"

function Home() {
	const { loading, fetchNotes } = React.useContext(FirebaseContext)

	React.useEffect(() => {
		fetchNotes()
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
