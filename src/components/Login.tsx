import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useAppDispatch } from "hooks/redux-hooks"
import { useNavigate } from "react-router-dom"
import Form from "./LoginRegisterForm"
import { setUser } from "store/slices/userSlice"

function Login() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth()

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						token: user.refreshToken,
					})
				)
				navigate("/", { replace: true })
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message

				console.log(errorCode, errorMessage)
			})
	}

	return <Form title='Login' onSubmit={handleLogin} />
}

export default Login
