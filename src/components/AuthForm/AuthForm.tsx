import {useEffect, useRef, useState} from 'react';
import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {Input} from 'lib/Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import cls from './AuthForm.module.scss';

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
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const {t} = useTranslation('auth');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onPassword = () => {
		setPasswordVisibility((prev) => !prev);
	};

	const {
		register,
		handleSubmit,
		control,
		formState: {errors},
	} = useForm<SubmitArgs>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	const onSubmit: SubmitHandler<SubmitArgs> = (data) => onSubmitForm(data);

	return (
		<form className={cls.AuthForm} onSubmit={handleSubmit(onSubmit)} noValidate data-testid='AuthForm'>
			<div className={cls.inputGroup}>
				<label htmlFor='form-email'>
					{t('Email address')}
				</label>
				<Controller
					name="email"
					control={control}
					defaultValue=""
					render={({field}) => (
						<Input
							{...field}
							ref={inputRef}
							type='email'
							id='form-email'
							placeholder='name@example.com'
						/>
					)}
				/>
				{errors.email && (
					<ErrorMessage data-testid='AuthForm_emailError' errorMessage={errors.email.message!} />
				)}
			</div>
			<div className={cls.inputGroup}>
				<label htmlFor='form-password'>
					{t('Password')}
				</label>
				<div className={cls.password}>
					<Controller
						name="password"
						control={control}
						render={({field}) => (
							<Input
								{...field}
								type={passwordVisibility ? 'text' : 'password'}
								id='form-password'
								withCorners
							/>
						)}
					/>
					<Button
						onClick={onPassword}
						className={cls.visibilityBtn}
						corners
						theme={ButtonThemes.PRIMARY}
					>
						{passwordVisibility ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
					</Button>
				</div>
				{errors.password && (
					<ErrorMessage data-testid='AuthForm_passwordError' errorMessage={errors.password.message!} />
				)}
			</div>
			<div className={cls.inputGroupCheck}>
				<label>
					<input
						{...register('rememberMe')}
						type='checkbox'
						className={cls.inputCheck}
					/>
					{t('Remember me')}
				</label>
			</div>
			<Button testid='AuthForm_btn' type='submit' theme={ButtonThemes.PRIMARY} className={cls.button}>
				{t(title)}
			</Button>
		</form>
	);
};

const ErrorMessage = ({errorMessage}: { errorMessage: string }) => {
	const {t} = useTranslation('auth');

	return (
		<div className={cls.error}>
			{t(errorMessage)}
		</div>
	);
};
