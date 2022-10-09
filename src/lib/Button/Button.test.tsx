import {screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {Button, ButtonThemes} from './Button';
import {componentTestRender} from 'helpers/test/componentTestRender/componentTestRender';

describe('Button', () => {
	test('primary button', () => {
		componentTestRender(<Button theme={ButtonThemes.PRIMARY}/>);
		expect(screen.getByTestId('Button-primary')).toBeInTheDocument();
		expect(screen.getByTestId('Button-primary')).toHaveClass('primary');
		expect(screen.getByTestId('Button-primary')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-primary')).not.toHaveClass('withoutBorders');
		expect(screen.getByTestId('Button-primary')).not.toHaveClass('active');
	});

	test('secondary button', () => {
		componentTestRender(<Button theme={ButtonThemes.SECONDARY} />);
		expect(screen.getByTestId('Button-secondary')).toBeInTheDocument();
		expect(screen.getByTestId('Button-secondary')).toHaveClass('secondary');
		expect(screen.getByTestId('Button-secondary')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-secondary')).not.toHaveClass('withoutBorders');
		expect(screen.getByTestId('Button-secondary')).not.toHaveClass('active');
	});

	test('clear button', () => {
		componentTestRender(<Button theme={ButtonThemes.CLEAR} />);
		expect(screen.getByTestId('Button-clear')).toBeInTheDocument();
		expect(screen.getByTestId('Button-clear')).toHaveClass('clear');
		expect(screen.getByTestId('Button-clear')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-clear')).not.toHaveClass('withoutBorders');
		expect(screen.getByTestId('Button-clear')).not.toHaveClass('active');
	});

	test('circle button', () => {
		componentTestRender(<Button theme={ButtonThemes.CIRCLE} />);
		expect(screen.getByTestId('Button-circle')).toBeInTheDocument();
		expect(screen.getByTestId('Button-circle')).toHaveClass('circle');
		expect(screen.getByTestId('Button-circle')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-circle')).not.toHaveClass('withoutBorders');
		expect(screen.getByTestId('Button-circle')).not.toHaveClass('active');
	});

	test('active button', () => {
		componentTestRender(<Button theme={ButtonThemes.PRIMARY} active={true} />);
		componentTestRender(<Button theme={ButtonThemes.SECONDARY} active={true} />);
		componentTestRender(<Button theme={ButtonThemes.CLEAR} active={true} />);
		componentTestRender(<Button theme={ButtonThemes.CIRCLE} active={true} />);
		expect(screen.getByTestId('Button-primary')).toHaveClass('active');
		expect(screen.getByTestId('Button-secondary')).toHaveClass('active');
		expect(screen.getByTestId('Button-clear')).toHaveClass('active');
		expect(screen.getByTestId('Button-circle')).toHaveClass('active');
	});

	test('with corners button', () => {
		componentTestRender(<Button theme={ButtonThemes.PRIMARY} corners />);
		componentTestRender(<Button theme={ButtonThemes.SECONDARY} corners />);
		componentTestRender(<Button theme={ButtonThemes.CLEAR} corners />);
		componentTestRender(<Button theme={ButtonThemes.CIRCLE} corners />);
		expect(screen.getByTestId('Button-primary')).not.toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-secondary')).not.toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-clear')).not.toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-circle')).not.toHaveClass('withoutCorners');
	});

	test('without border button', () => {
		componentTestRender(<Button theme={ButtonThemes.PRIMARY} border={false} />);
		componentTestRender(<Button theme={ButtonThemes.SECONDARY} border={false} />);
		componentTestRender(<Button theme={ButtonThemes.CLEAR} border={false} />);
		componentTestRender(<Button theme={ButtonThemes.CIRCLE} border={false} />);
		expect(screen.getByTestId('Button-primary')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-secondary')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-clear')).toHaveClass('withoutCorners');
		expect(screen.getByTestId('Button-circle')).toHaveClass('withoutCorners');
	});
});
