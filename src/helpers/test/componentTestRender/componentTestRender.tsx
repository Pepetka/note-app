import {ReactNode} from 'react';
import {render} from '@testing-library/react';
import {I18nextProvider} from 'react-i18next';
import i18nConfigForTesting from 'localization/i18nTesting';
import {MemoryRouter} from 'react-router-dom';

interface ComponentTestRenderOptions {
	route?: string
}

export const componentTestRender = (component: ReactNode, options?: ComponentTestRenderOptions) => {
	let route = '/';

	if (options?.route) route = options.route;

	return render(
		<MemoryRouter initialEntries={[route]}>
			<I18nextProvider i18n={i18nConfigForTesting}>
				{component}
			</I18nextProvider>
		</MemoryRouter>,
	);
};
