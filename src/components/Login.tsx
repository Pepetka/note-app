import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAppDispatch } from "hooks/redux-hooks"
import { useNavigate } from "react-router-dom"
import Form from "./LoginRegisterForm"
import { setUser } from "store/slices/userSlice"
import { showAlert, hideAlert } from "store/slices/alertSlice"

function toUpperFirs(string: string) {
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

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth()

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				const userData = {
					email: user.email,
					id: user.uid,
					token: user.refreshToken,
				}

				dispatch(setUser(userData))
				localStorage.setItem("user", JSON.stringify(userData))
				navigate("/", { replace: true })
			})
			.catch((error) => {
				let errorMessage = error.message
				const index = errorMessage.indexOf("/") + 1

				errorMessage = errorMessage.slice(index, -2).split("-").join(" ")

				onShowAlert(toUpperFirs(errorMessage))
			})
	}

	return <Form title='Login' onSubmit={handleLogin} />
}

export default Login