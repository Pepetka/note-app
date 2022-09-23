import {useState} from 'react';

export const LocalizationButton = () => {
	const [lang, setLang] = useState('en');

	const onChangeLang = () => {
		const newLang = lang === 'en' ? 'ru' : 'en';

		setLang(newLang);
	};

	return (
		<button
			onClick={onChangeLang}
			className='theme-button d-flex justify-content-center align-items-center secondary-bg secondary-text'
		>
			{lang}
		</button>
	);
};
