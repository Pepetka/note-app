import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAppDispatch } from "hooks/redux-hooks"
import { useNavigate } from "react-router-dom"
import Form from "./LoginRegisterForm"
import { setUser } from "store/slices/userSlice"
import { showAlert, hideAlert } from "store/slices/alertSlice"

function toUpperFirs(string: string): string {
	return string[0].toUpperCase() + string.slice(1)
}

function Login() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onShowAlert = (text: string) => {
		dispatch(
			showAlert({
				text,
				type: "danger",
			})
		)

		setTimeout(() => {
			dispatch(hideAlert())
		}, 5000)
	}

	const handleLogin = ({
		email,
		password,
		rememberMe,
	}: {
		email: string
		password: string
		rememberMe: boolean
	}) => {
		const auth = getAuth()

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				const userData = {
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				}

				dispatch(setUser(userData))

				if (rememberMe) localStorage.setItem("user", JSON.stringify(userData))

				navigate("/")
			})
			.catch((error) => {
				onShowAlert(toUpperFirs(error.message))
			})
	}

	return <Form title='Login' onSubmitForm={handleLogin} />
}

export default Login
