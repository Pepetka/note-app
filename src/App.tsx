import { Provider } from "react-redux/es/exports"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import NavBar from "./components/NavBar"
import Alert from "./components/Alert"
import { store } from "./store"
import LoginPage from "pages/LoginPage"
import RegisterPage from "pages/RegisterPage"
import "./firebase"
import ThemeButton from "components/ThemeButton"
import { useState } from "react"

type Theme = "dark" | "light"

const defaultTheme: Theme = (localStorage.getItem("theme") as Theme) ?? "light"

function App() {
	const [theme, setTheme] = useState<Theme>(defaultTheme)

	const onThemeChange = () => {
		const newTheme = theme === "light" ? "dark" : "light"

		setTheme(newTheme)

		localStorage.setItem("theme", newTheme)
	}

	return (
		<Provider store={store}>
			<BrowserRouter>
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
					<ThemeButton onThemeChange={onThemeChange} theme={theme} />
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
