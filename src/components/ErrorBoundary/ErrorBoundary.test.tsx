import {screen} from '@testing-library/react';
import {ErrorBoundary} from './ErrorBoundary';
import '@testing-library/jest-dom';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('Error Boundary', () => {
	test('Error Boundary', () => {
		const ThrowError = () => {
			throw new Error('Test');
		};

		componentTestRender(
			<ErrorBoundary>
				<ThrowError />
			</ErrorBoundary>,
		);

		expect(screen.getByTestId('ErrorReloadTemplate')).toBeInTheDocument();
	});
});
