import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {LocalizationButton} from './LocalizationButton';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('LocalizationButton', () => {
	test('be in the document', () => {
		componentTestRender(<LocalizationButton/>);
		expect(screen.getByTestId('LocalizationButton')).toBeInTheDocument();
	});
});
