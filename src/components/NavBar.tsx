import { NavLink } from "react-router-dom"

const NavBar = () => {
	return (
		<nav className='navbar navbar-dark navbar-expand bg-primary'>
			<div className='navbar-brand ms-3'>Note App</div>

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
		</nav>
	)
}

export default NavBar
