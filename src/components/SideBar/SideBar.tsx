import {ThemeButton} from 'components/ThemeButton/ThemeButton';
import {useState} from 'react';
import {LocalizationButton} from '../LocalizationButton/LocalizationButton';

export const SideBar = () => {
	const [collapsed, setCollapsed] = useState(true);

	const onCollapsed = () => {
		setCollapsed((collapsed) => !collapsed);
	};

	return (
		<div className={`sideBar ${collapsed ? 'sideBar_collapsed' : ''}`}>
			<div>
				<button
					className={`sideBar__open ${collapsed ? 'sideBar__open_collapsed' : ''}`}
					onClick={onCollapsed}>
					<i className="fa-solid fa-arrow-up"></i>
				</button>
			</div>
			<div className='sideBar__btn-group'>
				<ThemeButton/>
				<LocalizationButton />
			</div>
		</div>
	);
};
