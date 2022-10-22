import axios from 'axios';

const url = process.env.REACT_APP_DB_URL;

export const $api = axios.create({
	baseURL: `${url}/notes`,
});
