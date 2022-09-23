interface NotesControlPanelProps {
	notesLength: number
	handleSort: boolean
	onHandleSort: () => void
}
export const NotesControlPanel = ({notesLength, handleSort, onHandleSort}: NotesControlPanelProps) => {
	return (
		<div className='d-flex justify-content-between align-items-center controller-wrapper'>
			<div className='num-notes'>Number of notes: {notesLength}</div>
			<div className='form-check form-switch sort-controller'>
				<label htmlFor='handle-sort' className='handle-sort-label'>
					Handle Sort
				</label>
				<input
					className={`form-check-input ${handleSort ? 'primary-bg' : 'secondary-bg'}`}
					type='checkbox'
					id='handle-sort'
					checked={handleSort}
					onChange={onHandleSort}
				/>
			</div>
		</div>
	);
};