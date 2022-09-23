import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useAppDispatch} from 'hooks/useRedux';
import {useNavigate} from 'react-router-dom';
import AuthForm, {SubmitArgs} from '../AuthForm/AuthForm';
import {setUser} from 'store/slices/userSlice';
import {showAlert, hideAlert} from 'store/slices/alertSlice';
import {User} from '../../types';

function toUpperFirs(string: string): string {
	return string[0].toUpperCase() + string.slice(1);
}

function Login() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onShowAlert = (text: string) => {
		dispatch(
			showAlert({
				text,
				type: 'danger',
			}),
		);

		setTimeout(() => {
			dispatch(hideAlert());
		}, 5000);
	};

	const handleLogin = ({
		email,
		password,
		rememberMe,
	}: SubmitArgs) => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, email, password)
			.then(({user}) => {
				const userData: User = {
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				};

				dispatch(setUser(userData));

				if (rememberMe) localStorage.setItem('user', JSON.stringify(userData));

				navigate('/');
			})
			.catch((error) => {
				onShowAlert(toUpperFirs(error.message));
			});
	};

	return <AuthForm title='Login' onSubmitForm={handleLogin} />;
}

export default Login;
