import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';

export interface SubmitArgs {
	email: string
	password: string
	rememberMe: boolean
}

interface AuthFormProps {
	title: string
	onSubmitForm: ({email, password, rememberMe}: SubmitArgs) => void
}

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
		rememberMe: yup.boolean(),
	})
	.required();

export const AuthForm = ({title, onSubmitForm}: AuthFormProps) => {
	const {t} = useTranslation('auth');
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<SubmitArgs>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	const onSubmit: SubmitHandler<SubmitArgs> = (data) => onSubmitForm(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className='mb-3'>
				<label htmlFor='form-email' className='form-label'>
					{t('Email address')}
				</label>
				<input
					{...register('email')}
					type='email'
					className='form-control secondary-bg primary-text'
					id='form-email'
					placeholder='name@example.com'
				/>
				{errors.email && <div className='form-text text-danger mt-2'>
					{errors.email?.message}
				</div>}
			</div>
			<div className='mb-3'>
				<label htmlFor='form-password' className='form-label'>
					{t('Password')}
				</label>
				<input
					{...register('password')}
					type='password'
					className='form-control secondary-bg primary-text'
					id='form-password'
				/>
				{errors.password && (
					<div className='form-text text-danger mt-2'>{errors.password?.message}</div>
				)}
			</div>
			<div className='mb-3 form-check'>
				<label className='form-check-label'>
					<input
						{...register('rememberMe')}
						type='checkbox'
						className='form-check-input secondary-bg'
					/>
					{t('Remember me')}
				</label>
			</div>
			<button type='submit' className='btn btn-outline-primary primary-bg primary-text'>
				{t(title)}
			</button>
		</form>
	);
};
