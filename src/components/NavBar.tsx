import { useAppDispatch } from "hooks/redux-hooks"
import { useAuth } from "hooks/use-auth"
import { NavLink } from "react-router-dom"
import { clearNotes } from "store/slices/firebaseSlice"
import { removeUser } from "store/slices/userSlice"

const NavBar = () => {
	const dispatch = useAppDispatch()
	const { isAuth } = useAuth()

	const onLogOut = () => {
		dispatch(removeUser())
		dispatch(clearNotes())
		localStorage.removeItem("user")
	}

	return (
		<nav className='navbar navbar-dark navbar-expand bg-primary d-flex justify-content-between'>
			<div className='container-fluid d-flex justify-content-between'>
				<div className='d-flex justify-content-between'>
					<div className='navbar-brand'>Note App</div>

					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link' to={"/"}>
								Home
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to={"/about"}>
								About
							</NavLink>
						</li>
					</ul>
				</div>

				<ul className='navbar-nav'>
					<li className='nav-item'>
						{isAuth ? (
							<NavLink className='nav-link' to={"/login"} onClick={onLogOut}>
								Logout
							</NavLink>
						) : (
							<NavLink className='nav-link' to={"/login"}>
								Login
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
