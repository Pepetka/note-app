import {useForm, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';

import './AuthForm.scss';

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
	.object().shape({
		email: yup
			.string()
			.required('Required field')
			.email('Email must be a valid email'),
		password: yup
			.string()
			.required('Required field')
			.min(6, 'Password must be at least 6 characters'),
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
		<form className='authForm' onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className='authForm__inputGroup'>
				<label htmlFor='form-email' className='authForm__label'>
					{t('Email address')}
				</label>
				<input
					{...register('email')}
					type='email'
					className='input authForm__input'
					id='form-email'
					placeholder='name@example.com'
				/>
				{errors.email && (
					<ErrorMessage errorMessage={errors.email.message!}/>
				)}
			</div>
			<div className='authForm__inputGroup'>
				<label htmlFor='form-password' className='authForm__label'>
					{t('Password')}
				</label>
				<input
					{...register('password')}
					type='password'
					className='input authForm__input'
					id='form-password'
				/>
				{errors.password && (
					<ErrorMessage errorMessage={errors.password.message!}/>
				)}
			</div>
			<div className='authForm__inputGroupCheck'>
				<label className='authForm__labelCheck'>
					<input
						{...register('rememberMe')}
						type='checkbox'
						className='authForm__inputCheck'
					/>
					{t('Remember me')}
				</label>
			</div>
			<button type='submit' className='button authForm__button'>
				{t(title)}
			</button>
		</form>
	);
};

const ErrorMessage = ({errorMessage}: { errorMessage: string }) => {
	const {t} = useTranslation('auth');

	return (
		<div className='authForm__error'>
			{t(errorMessage)}
		</div>
	);
};
