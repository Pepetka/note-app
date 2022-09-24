import {Suspense} from 'react'; import ReactDOM from 'react-dom/client';
import './index.scss';
import {App} from './components/App/App';
import {ThemeProvider} from 'themes/context/ThemeProvider';
import {Provider} from 'react-redux';
import {store} from 'store';
import {BrowserRouter} from 'react-router-dom';

import 'localization/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<ThemeProvider>
		<Provider store={store}>
			<BrowserRouter>
				<Suspense fallback=''><App/></Suspense>
			</BrowserRouter>
		</Provider>
	</ThemeProvider>,
);
