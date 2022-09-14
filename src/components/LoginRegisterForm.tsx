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
					className='form-control secondary-elem'
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
					className='form-control secondary-elem'
					id='form-password'
				/>
				{errors.password && (
					<div className='form-text text-danger mt-2'>{errors.password?.message}</div>
				)}
			</div>
			<div className='mb-3 form-check'>
				<label className='form-check-label'>
					<input {...register("rememberMe")} type='checkbox' className='form-check-input' />
					Remember me
				</label>
			</div>
			<button type='submit' className='btn btn-primary primary-elem'>
				{title}
			</button>
		</form>
	)
}

export default Form
