import {NavBar} from 'components/NavBar/NavBar';
import {Alert} from 'components/Alert/Alert';
import '../../firebase';
import {useTheme} from 'hooks/useTheme';
import {AppRouter} from 'components/AppRouter/AppRouter';
import {SideBar} from 'components/SideBar/SideBar';

export const App = () => {
	const {theme} = useTheme();

	return (
		<div className={`App ${theme}`}>
			<NavBar />
			<main>
				<div className='AppContainer'>
					<Alert />
					<AppRouter/>
				</div>
			</main>
			<SideBar />
		</div>
	);
};

