import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import Login from "components/Login"
import { useAppDispatch } from "hooks/redux-hooks"
import { setUser } from "store/slices/userSlice"
import { User } from "types"
import { showAlert } from "store/slices/alertSlice"

function LoginPage() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const onLogin = () => {
		const provider = new GoogleAuthProvider()
		const auth = getAuth()

		signInWithPopup(auth, provider)
			.then((result) => {
				const user: User = {
					id: result!.user.uid,
					token: result!.user.refreshToken,
					email: result!.user.email,
				}

				dispatch(setUser(user))

				localStorage.setItem("user", JSON.stringify(user))

				navigate("/")
			})
			.catch((error) => {
				dispatch(
					showAlert({
						message: error.message,
						alertType: "danger",
					})
				)
			})
	}

	return (
		<>
			<h1>Login</h1>

			<Login />

			<p>
				Or <Link to='/register'>register</Link>
			</p>

			<button onClick={onLogin} type='button' className='btn btn-outline-primary w-100 mt-3'>
				Login with Google
			</button>
		</>
	)
}

export default LoginPage
