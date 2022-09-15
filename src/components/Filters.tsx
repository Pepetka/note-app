import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { changeFilter } from "store/slices/firebaseSlice"

const buttons = [
	{ name: "Active", data: "active" },
	{ name: "Important", data: "isImportant" },
	{ name: "Disable", data: "isDisable" },
	{ name: "All", data: "all" },
]

function Filters() {
	const dispatch = useAppDispatch()
	const { filter } = useAppSelector((state) => state.firebase)

	const onChangeFilter = (data: string) => {
		dispatch(changeFilter({ filter: data }))
	}

	return (
		<div className='filter mb-3'>
			{buttons.map((el) => {
				const classBtn =
					filter === el.data
						? "btn btn-outline-primary primary-bg primary-text"
						: "btn btn-outline-primary secondary-bg secondary-text"

				return (
					<button
						key={el.data}
						type='button'
						className={classBtn}
						onClick={() => onChangeFilter(el.data)}
					>
						{el.name}
					</button>
				)
			})}
		</div>
	)
}

export default Filters
