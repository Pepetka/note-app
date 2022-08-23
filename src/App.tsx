import { Provider } from "react-redux/es/exports"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import NavBar from "./components/NavBar"
import Alert from "./components/Alert"
import { store } from "./store"

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavBar />
				<main>
					<div className='container pt-4'>
						<Alert />
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
						</Routes>
					</div>
				</main>
			</BrowserRouter>
		</Provider>
	)
}

export default App
