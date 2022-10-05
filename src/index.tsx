import {Suspense} from 'react'; import ReactDOM from 'react-dom/client';
import {App} from 'components/App/App';
import {ThemeProvider} from 'context/theme/ThemeProvider';
import {Provider} from 'react-redux';
import {store} from 'store';
import {BrowserRouter} from 'react-router-dom';
import {HandleSortProvider} from 'context/handleSort/HandleSortProvider';
import {PageLoader} from 'components/PageLoader/PageLoader';

import 'style/index.scss';
import 'localization/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<Suspense fallback={<PageLoader className='PageLoader_app' />}>
		<ThemeProvider>
			<HandleSortProvider>
				<Provider store={store}>
					<BrowserRouter>
						<App/>
					</BrowserRouter>
				</Provider>
			</HandleSortProvider>
		</ThemeProvider>
	</Suspense>,
);
