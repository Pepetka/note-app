import React from "react"
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface SubmitArgs {
	email: string
	password: string
	rememberMe: boolean
}

export type FuncArgs = {
	register: UseFormRegister<SubmitArgs>
}

interface FormProps {
	title: string
	onSubmitForm: ({ email, password, rememberMe }: SubmitArgs) => void
}

type Inputs = {
	email: string
	password: string
	rememberMe: boolean
}

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
		rememberMe: yup.boolean(),
	})
	.required()

function Form({ title, onSubmitForm }: FormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		mode: "onChange",
	})
	const onSubmit: SubmitHandler<Inputs> = (data) => onSubmitForm(data)

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className='mb-3'>
				<label htmlFor='form-email' className='form-label'>
					Email address
				</label>
				<input
					{...register("email")}
					type='email'
<<<<<<< HEAD
					className='form-control secondary-elem primary-text'
=======
					className='form-control secondary-bg primary-text'
>>>>>>> dev
					id='form-email'
					placeholder='name@example.com'
				/>
				{errors.email && <div className='form-text text-danger mt-2'>{errors.email?.message}</div>}
			</div>
			<div className='mb-3'>
				<label htmlFor='form-password' className='form-label'>
					Password
				</label>
				<input
					{...register("password")}
					type='password'
<<<<<<< HEAD
					className='form-control secondary-elem primary-text'
=======
					className='form-control secondary-bg primary-text'
>>>>>>> dev
					id='form-password'
				/>
				{errors.password && (
					<div className='form-text text-danger mt-2'>{errors.password?.message}</div>
				)}
			</div>
			<div className='mb-3 form-check'>
				<label className='form-check-label'>
					<input
						{...register("rememberMe")}
						type='checkbox'
						className='form-check-input secondary-bg'
					/>
					Remember me
				</label>
			</div>
			<button type='submit' className='btn btn-outline-primary primary-bg primary-text'>
				{title}
			</button>
		</form>
	)
}

export default Form
