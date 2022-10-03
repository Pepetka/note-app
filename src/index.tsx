import {Suspense} from 'react'; import ReactDOM from 'react-dom/client';
import {App} from './components/App/App';
import {ThemeProvider} from 'context/theme/ThemeProvider';
import {Provider} from 'react-redux';
import {store} from 'store';
import {BrowserRouter} from 'react-router-dom';
import {HandleSortProvider} from 'context/handleSort/HandleSortProvider';

import './index.scss';
import 'localization/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<ThemeProvider>
		<HandleSortProvider>
			<Provider store={store}>
				<BrowserRouter>
					<Suspense fallback=''><App/></Suspense>
				</BrowserRouter>
			</Provider>
		</HandleSortProvider>
	</ThemeProvider>,
);
