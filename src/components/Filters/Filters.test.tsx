import {screen} from '@testing-library/react';
import {act} from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {Filters} from './Filters';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';
import {FilterTypes} from 'store/model/notes/types/NotesSchema';

describe('Filters', () => {
	test('be in the document', () => {
		componentTestRender(<Filters/>);
		expect(screen.getByTestId('Filters')).toBeInTheDocument();
	});

	test('change filter', () => {
		componentTestRender(<Filters/>);
		expect(screen.getByTestId(`Filters_${FilterTypes.ACTIVE}`)).toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.DISABLE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.ALL}`)).not.toHaveClass('active');

		act(() => {
			userEvent.click(screen.getByTestId(`Filters_${FilterTypes.ALL}`));
		});
		expect(screen.getByTestId(`Filters_${FilterTypes.ACTIVE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.DISABLE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.ALL}`)).toHaveClass('active');

		act(() => {
			userEvent.click(screen.getByTestId(`Filters_${FilterTypes.DISABLE}`));
		});
		expect(screen.getByTestId(`Filters_${FilterTypes.ACTIVE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.DISABLE}`)).toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.ALL}`)).not.toHaveClass('active');

		act(() => {
			userEvent.click(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`));
		});
		expect(screen.getByTestId(`Filters_${FilterTypes.ACTIVE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.DISABLE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`)).toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.ALL}`)).not.toHaveClass('active');

		act(() => {
			userEvent.click(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`));
		});
		expect(screen.getByTestId(`Filters_${FilterTypes.ACTIVE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.DISABLE}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.IMPORTANT}`)).not.toHaveClass('active');
		expect(screen.getByTestId(`Filters_${FilterTypes.ALL}`)).toHaveClass('active');
	});
});
