import {useState} from 'react';
import {ThemeButton} from 'components/ThemeButton/ThemeButton';
import {LocalizationButton} from 'components/LocalizationButton/LocalizationButton';
import {HandleSortButton} from 'components/HandleSortButton/HandleSortButton';
import {classNames} from 'helpers/classNames/classNames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

import cls from './SideBar.module.scss';

export const SideBar = () => {
	const [collapsed, setCollapsed] = useState(true);

	const onCollapsed = () => {
		setCollapsed((collapsed) => !collapsed);
	};

	return (
		<div data-testid='SideBar' className={classNames([cls.SideBar], {[cls.collapsed]: collapsed})}>
			<div className={cls.button}>
				<ThemeButton />
			</div>

			<div className={cls.button}>
				<LocalizationButton />
			</div>

			<div className={cls.button}>
				<HandleSortButton />
			</div>

			<button
				data-testid='SideBar-collapse'
				className={cls.open}
				onClick={onCollapsed}>
				<FontAwesomeIcon icon={faXmark}/>
			</button>
		</div>
	);
};
