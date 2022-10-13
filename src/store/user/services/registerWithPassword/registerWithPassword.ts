import {createAsyncThunk} from '@reduxjs/toolkit';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {User} from '../../types/UserSchema';
import {ThunkApi} from '../types';
import {alertActions} from '../../../alert/slice/alertSlice';

interface registerWithPasswordProps {
	email: string
	password: string
	rememberMe: boolean
}

export const registerWithPassword = createAsyncThunk<User, registerWithPasswordProps, ThunkApi>(
	'user/registerWithPassword',
	async ({email, password, rememberMe}, {rejectWithValue, dispatch}) => {
		try {
			const auth = getAuth();

			const {user} = await createUserWithEmailAndPassword(auth, email, password);

			const userData: User = {
				email: user.email!,
				id: user.uid,
				token: user.refreshToken,
			};

			if (rememberMe) localStorage.setItem('user', JSON.stringify(userData));

			return userData;
		} catch (error) {
			let errorMessage = (error as Error).message;
			const index = errorMessage.indexOf('/') + 1;
			console.log((error as Error).message);

			errorMessage = errorMessage.slice(index, -2).split('-').join(' ');

			dispatch(
				alertActions.showAlert({
					text: errorMessage,
					type: 'danger',
				}),
			);

			return rejectWithValue(errorMessage);
		}
	},
);
