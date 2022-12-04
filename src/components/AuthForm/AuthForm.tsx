import {memo, useEffect, useRef, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from 'lib/Button/Button';
import {Input} from 'lib/Input/Input';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import cls from './AuthForm.module.scss';
import {VStack} from '../../lib/Flex/VStack';
import {HStack} from '../../lib/Flex/HStack';

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

export const AuthForm = memo(({title, onSubmitForm}: AuthFormProps) => {
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
		<form onSubmit={handleSubmit(onSubmit)} noValidate data-testid='AuthForm'>
			<VStack gap='8' align='start'>
				<VStack align='start' w100>
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
				</VStack>
				<VStack align='start' w100>
					<label htmlFor='form-password'>
						{t('Password')}
					</label>
					<HStack w100>
						<Controller
							name="password"
							control={control}
							defaultValue=""
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
					</HStack>
					{errors.password && (
						<ErrorMessage data-testid='AuthForm_passwordError' errorMessage={errors.password.message!} />
					)}
				</VStack>
				<HStack justify='start'>
					<label>
						<input
							{...register('rememberMe')}
							type='checkbox'
							className={cls.inputCheck}
						/>
						{t('Remember me')}
					</label>
				</HStack>
				<Button testid='AuthForm_btn' type='submit' theme={ButtonThemes.PRIMARY} className={cls.button}>
					{t(title)}
				</Button>
			</VStack>
		</form>
	);
});

const ErrorMessage = memo(({errorMessage}: { errorMessage: string }) => {
	const {t} = useTranslation('auth');

	return (
		<div className={cls.error}>
			{t(errorMessage)}
		</div>
	);
});
