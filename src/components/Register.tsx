import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useAppDispatch } from "hooks/redux-hooks"
import { useNavigate } from "react-router-dom"
import Form from "./LoginRegisterForm"
import { setUser } from "store/slices/userSlice"

function Register() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleRegister = (email: string, password: string) => {
		const auth = getAuth()

		createUserWithEmailAndPassword(auth, email, password)
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

	return <Form title='Register' onSubmit={handleRegister} />
}

export default Register
