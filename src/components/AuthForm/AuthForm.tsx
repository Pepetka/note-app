import {SubmitHandler, useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {Button, ButtonThemes} from '../lib/Button/Button';

import cls from './AuthForm.module.scss';
import {Input} from 'components/lib/Input/Input';

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
		control,
		formState: {errors},
	} = useForm<SubmitArgs>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});
	const onSubmit: SubmitHandler<SubmitArgs> = (data) => onSubmitForm(data);

	return (
		<form className={cls.AuthForm} onSubmit={handleSubmit(onSubmit)} noValidate>
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
							type='email'
							id='form-email'
							placeholder='name@example.com'
						/>
					)}
				/>
				{errors.email && (
					<ErrorMessage errorMessage={errors.email.message!}/>
				)}
			</div>
			<div className={cls.inputGroup}>
				<label htmlFor='form-password'>
					{t('Password')}
				</label>
				<Controller
					name="password"
					control={control}
					defaultValue=""
					render={({field}) => (
						<Input
							{...field}
							type='password'
							id='form-password'
						/>
					)}
				/>
				{errors.password && (
					<ErrorMessage errorMessage={errors.password.message!}/>
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
			<Button type='submit' theme={ButtonThemes.PRIMARY} className={cls.button}>
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
