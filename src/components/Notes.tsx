import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { Reorder, AnimatePresence } from "framer-motion"
import { sortNotes } from "../store/slices/firebaseSlice"
import NotesItem from "./NotesItem"
import { Note } from "types"

interface Prop {
	handleSort: boolean
}

const Notes = ({ handleSort }: Prop) => {
	const { notes } = useAppSelector((state) => state.firebase)
	const { id } = useAppSelector((state) => state.user.user)
	const dispatch = useAppDispatch()

	const onSortNotes = (notes: Array<Note>) => {
		dispatch(sortNotes({ notes, userId: id! }))
	}

	return (
		<Reorder.Group axis='y' values={notes} onReorder={onSortNotes} className='list-group notes'>
			<AnimatePresence>
				{notes.map((note) => (
					<NotesItem handleSort={handleSort} key={note.id} note={note} />
				))}
			</AnimatePresence>
		</Reorder.Group>
	)
}

export default Notes
