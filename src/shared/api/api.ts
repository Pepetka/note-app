import axios from 'axios';
import {LocalStorageKeys} from 'shared/const/localStorage';
import {User} from 'store/model/user/types/UserSchema';

const url = process.env.REACT_APP_DB_URL;

export const $api = axios.create({
	baseURL: `${url}/notes`,
});

$api.interceptors.request.use((config) => {
	if (config.headers && localStorage.getItem(LocalStorageKeys.USER)) {
		const userData = JSON.parse(localStorage.getItem(LocalStorageKeys.USER)!) as User;
		config.headers.authorization = JSON.stringify(userData.token);
	}

	return config;
});
