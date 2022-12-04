import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Lang} from './i18n';

i18n
	.use(initReactI18next)
	.init({
		lng: Lang.EN,
		fallbackLng: Lang.EN,
		debug: false,

		interpolation: {
			escapeValue: false,
		},

		resources: {[Lang.EN]: {translations: {}}},
	});

export default i18n;
