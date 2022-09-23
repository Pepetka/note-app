import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {ThemeProvider} from 'themes/context/ThemeProvider';
import {Provider} from 'react-redux';
import {store} from 'store';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<ThemeProvider>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</ThemeProvider>,
);
