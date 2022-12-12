import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Loader} from './Loader';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('Loader', () => {
	test('be in the document', () => {
		componentTestRender(<Loader/>);
		expect(screen.getByTestId('Loader')).toBeInTheDocument();
	});
});
