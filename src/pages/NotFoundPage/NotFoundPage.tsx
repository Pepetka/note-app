import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {memo, useCallback} from 'react';
import {VStack} from 'lib/Flex/VStack';

const NotFoundPage = memo(() => {
	const {t} = useTranslation();
	const navigate = useNavigate();

	const onNavigate = useCallback(() => {
		navigate('/');
	}, [navigate]);

	return (
		<VStack align='center' data-testid='NotFoundPage'>
			<h1>{t('Page not found')}</h1>
			<Button
				theme={ButtonThemes.PRIMARY}
				onClick={onNavigate}
			>
				{t('To main')}
			</Button>
		</VStack>
	);
});

export default NotFoundPage;
