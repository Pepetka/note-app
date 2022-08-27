import React from "react"

interface FormProps {
	title: string
	onSubmit: (email: string, password: string) => void
}

function Form({ title, onSubmit }: FormProps) {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")

	return (
		<form>
			<div className='mb-3'>
				<label htmlFor='form-email' className='form-label'>
					Email address
				</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					className='form-control'
					id='form-email'
					placeholder='name@example.com'
				/>
			</div>
			<div className='mb-3'>
				<label htmlFor='form-password' className='form-label'>
					Password
				</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					className='form-control'
					id='form-password'
				/>
			</div>
			<button
				onClick={(e) => {
					e.preventDefault()
					onSubmit(email, password)
				}}
				type='submit'
				className='btn btn-primary'
			>
				{title}
			</button>
		</form>
	)
}

export default Form
