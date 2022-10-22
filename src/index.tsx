import {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {App} from 'components/App/App';
import {ThemeProvider} from 'context/theme/ThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import {HandleSortProvider} from 'context/handleSort/HandleSortProvider';
import {PageLoader} from 'components/PageLoader/PageLoader';
import {ErrorBoundary} from 'components/ErrorBoundary/ErrorBoundary';

import 'style/index.scss';
import 'localization/i18n';
import {StoreProvider} from './store/StoreProvider/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<Suspense fallback={<PageLoader className='PageLoader_app' />}>
		<ThemeProvider>
			<HandleSortProvider>
				<BrowserRouter>
					<StoreProvider>
						<ErrorBoundary>
							<App/>
						</ErrorBoundary>
					</StoreProvider>
				</BrowserRouter>
			</HandleSortProvider>
		</ThemeProvider>
	</Suspense>,
);
