import {ReactNode} from 'react';
import {render} from '@testing-library/react';
import {I18nextProvider} from 'react-i18next';
import i18nConfigForTesting from 'localization/i18nTesting';
import {MemoryRouter} from 'react-router-dom';
import {StoreProvider} from 'store/ui/StoreProvider/StoreProvider';
import {StateSchema} from 'store/model/types/StateSchema';
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
				<MemoryRouter initialEntries={[options?.route ?? '/']}>
					<StoreProvider initialState={options?.initialState}>
						<I18nextProvider i18n={i18nConfigForTesting}>
							{component}
						</I18nextProvider>
					</StoreProvider>
				</MemoryRouter>
			</HandleSortProvider>
		</ThemeProvider>,
	);
};
