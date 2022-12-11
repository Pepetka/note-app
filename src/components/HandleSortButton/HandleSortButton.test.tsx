import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {HandleSortButton} from './HandleSortButton';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';
import userEvent from '@testing-library/user-event';

describe('HandleSortButton', () => {
	test('be in the document', () => {
		componentTestRender(<HandleSortButton/>);
		expect(screen.getByTestId('HandleSortButton')).toBeInTheDocument();
	});

	test('toggle', () => {
		componentTestRender(<HandleSortButton/>);
		expect(screen.getByTestId('HandleSortButton_shuffle')).toBeInTheDocument();
		expect(screen.queryByTestId('HandleSortButton_sort')).not.toBeInTheDocument();

		userEvent.click(screen.getByTestId('HandleSortButton'));

		expect(screen.queryByTestId('HandleSortButton_shuffle')).not.toBeInTheDocument();
		expect(screen.getByTestId('HandleSortButton_sort')).toBeInTheDocument();
	});
});
