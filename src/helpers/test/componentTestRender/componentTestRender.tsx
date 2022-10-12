import {ReactNode} from 'react';
import {render} from '@testing-library/react';
import {I18nextProvider} from 'react-i18next';
import i18nConfigForTesting from 'localization/i18nTesting';
import {MemoryRouter} from 'react-router-dom';
import {StoreProvider} from 'store/StoreProvider/StoreProvider';
import {StateSchema} from 'store/types/StateSchema';
import {HandleSortProvider} from 'context/handleSort/HandleSortProvider';
import {ThemeProvider} from 'context/theme/ThemeProvider';

interface ComponentTestRenderOptions {
	route?: string
	initialState?: StateSchema
}

export const componentTestRender = (component: ReactNode, options?: ComponentTestRenderOptions) => {
	return render(
		<ThemeProvider>
			<HandleSortProvider>
				<StoreProvider initialState={options?.initialState}>
					<MemoryRouter initialEntries={[options?.route ?? '/']}>
						<I18nextProvider i18n={i18nConfigForTesting}>
							{component}
						</I18nextProvider>
					</MemoryRouter>
				</StoreProvider>
			</HandleSortProvider>
		</ThemeProvider>,
	);
};
