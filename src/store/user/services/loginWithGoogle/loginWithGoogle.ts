import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {User} from '../../types/UserSchema';
import {ThunkApi} from '../types';
import {alertActions} from '../../../alert/slice/alertSlice';
import {LocalStorageKeys} from 'const/localStorage';

export const loginWithGoogle = createAsyncThunk<User, undefined, ThunkApi>(
	'user/loginWithGoogle',
	async (_, {rejectWithValue, dispatch}) => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth();

			const {user} = await signInWithPopup(auth, provider);

			const userData: User = {
				id: user.uid,
				token: user.refreshToken,
				email: user.email!,
			};

			localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(userData));

			return userData;
		} catch (error) {
			dispatch(
				alertActions.showAlert({
					text: (error as Error).message,
					type: 'danger',
				}),
			);

			return rejectWithValue((error as Error).message);
		}
	},
);
