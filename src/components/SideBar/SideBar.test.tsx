import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {SideBar} from './SideBar';
import {componentTestRender} from 'shared/helpers/test/componentTestRender/componentTestRender';

describe('SideBar', () => {
	test('be in the document', () => {
		componentTestRender(<SideBar/>);
		expect(screen.getByTestId('SideBar')).toBeInTheDocument();
	});
	test('toggle collapse', async () => {
		componentTestRender(<SideBar/>);

		expect(screen.getByTestId('SideBar')).toHaveClass('collapsed');
		await userEvent.click(screen.getByTestId('SideBar-collapse'));
		expect(screen.getByTestId('SideBar')).not.toHaveClass('collapsed');
	});
});
