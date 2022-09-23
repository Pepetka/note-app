import {Route, Routes} from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage';
import AboutPage from 'pages/AboutPage/AboutPage';
import NavBar from 'components/NavBar/NavBar';
import Alert from 'components/Alert/Alert';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import './firebase';
import ThemeButton from 'components/ThemeButton/ThemeButton';
import {useTheme} from 'hooks/useTheme';

function App() {
	const {theme} = useTheme();

	return (
		<div className={`App ${theme}`}>
			<NavBar />
			<main>
				<div className='container pt-4'>
					<div className='note-app'>
						<Alert />
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/about' element={<AboutPage />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
						</Routes>
					</div>
				</div>
			</main>
			<ThemeButton />
		</div>
	);
}

export default App;
