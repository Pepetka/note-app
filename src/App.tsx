import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import NavBar from "./components/NavBar"
import Alert from "./components/Alert"
import LoginPage from "pages/LoginPage"
import RegisterPage from "pages/RegisterPage"
import "./firebase"
import ThemeButton from "components/ThemeButton"
import { useTheme } from "hooks/theme-hooks"

function App() {
	const { theme } = useTheme()

	return (
		<div className={`App ${theme}`}>
			<NavBar />
			<main>
				<div className='container pt-4'>
					<div className='note-app'>
						<Alert />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
						</Routes>
					</div>
				</div>
			</main>
			<ThemeButton />
		</div>
	)
}

export default App
