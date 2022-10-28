import {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {App} from 'components/App/App';
import {ThemeProvider} from 'context/theme/ThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import {HandleSortProvider} from 'context/handleSort/HandleSortProvider';
import {PageLoader} from 'components/PageLoader/PageLoader';
import {ErrorBoundary} from 'components/ErrorBoundary/ErrorBoundary';
import {StoreProvider} from 'store/ui/StoreProvider/StoreProvider';

import 'style/index.scss';
import 'localization/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
	<Suspense fallback={<PageLoader className='PageLoader_app' />}>
		<BrowserRouter>
			<StoreProvider>
				<ErrorBoundary>
					<ThemeProvider>
						<HandleSortProvider>
							<App/>
						</HandleSortProvider>
					</ThemeProvider>
				</ErrorBoundary>
			</StoreProvider>
		</BrowserRouter>
	</Suspense>,
);
