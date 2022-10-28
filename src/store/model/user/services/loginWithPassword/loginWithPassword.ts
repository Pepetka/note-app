import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {User} from '../../types/UserSchema';
import {alertActions} from '../../../alert/slice/alertSlice';
import {userActions} from '../../slice/userSlice';
import {ThunkConfig} from 'store/model/types/StateSchema';

interface LoginWithPasswordProps {
	email: string
	password: string
	rememberMe: boolean
}

export const loginWithPassword = createAsyncThunk<User, LoginWithPasswordProps, ThunkConfig<string>>(
	'user/loginWithPassword',
	async ({email, password, rememberMe}, {rejectWithValue, dispatch}) => {
		try {
			const auth = getAuth();

			const {user} = await signInWithEmailAndPassword(auth, email, password);

			const userData: User = {
				email: user.email!,
				id: user.uid,
				token: user.refreshToken,
			};

			if (rememberMe) {
				dispatch(userActions.setUserLocal(userData));
			} else {
				dispatch(userActions.setUserSession(userData));
			}

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
