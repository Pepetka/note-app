import {Component, ErrorInfo, ReactNode} from 'react';
import {useTranslation} from 'react-i18next';
import {ReloadTemplate} from 'components/ReloadTemplate/ReloadTemplate';
import {classNames} from 'helpers/classNames/classNames';
import {useTheme} from 'hooks/useTheme';

import cls from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
	children: ReactNode
}

interface ErrorBoundaryState {
	hasError: boolean
}

const ErrorBoundaryReloadTemplate = () => {
	const {theme} = useTheme();
	const {t} = useTranslation();

	const onReload = () => {
		window.location.reload();
	};

	return (
		<div className={classNames(['ErrorBoundary', theme, cls.ErrorBoundary])}>
			<ReloadTemplate errorMessage={t('Error loading page')} onReload={onReload} />
		</div>
	);
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError(error: Error) {
		return {hasError: true};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		const {children} = this.props;
		const {hasError} = this.state;

		if (hasError) {
			return (
				<ErrorBoundaryReloadTemplate />
			);
		}

		return children;
	}
}
