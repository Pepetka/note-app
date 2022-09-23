import {Link} from 'react-router-dom';
import {Register} from 'components/Register/Register';

export const RegisterPage = () => {
	return (
		<>
			<h1>Register</h1>

			<Register />

			<p>
				Or <Link to='/login'>login</Link>
			</p>
		</>
	);
};
