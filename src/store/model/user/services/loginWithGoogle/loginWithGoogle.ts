import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {User} from '../../types/UserSchema';
import {alertActions} from '../../../alert/slice/alertSlice';
import {userActions} from '../../slice/userSlice';
import {ThunkConfig} from 'store/model/types/StateSchema';

export const loginWithGoogle = createAsyncThunk<User, undefined, ThunkConfig<string>>(
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

			dispatch(userActions.setUser(userData));

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
