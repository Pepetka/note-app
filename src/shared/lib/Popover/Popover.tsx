import {classNames} from 'shared/helpers/classNames/classNames';
import cls from './Popover.module.scss';
import {ReactNode, useRef} from 'react';
import {useHover} from 'shared/hooks/useHover';
import {Placement, useFloating, arrow, offset} from '@floating-ui/react-dom-interactions';

interface PopoverProps {
	/**
	 * Дополнительные классы
	 */
	className?: string
	/**
	 * Триггер, взаимодействие с которым открывает контент
	 */
	children: ReactNode
	/**
	 * Контент
	 */
	popoverContent: ReactNode
	/**
	 * Позиция, занимаемая контентом после открытия
	 */
	position?: Placement
	/**
	 * Флаг, отвечающий за возможность занять 100% ширины контейнера
	 */
	w100?: boolean
}

export const Popover = ({className, children, popoverContent, position = 'bottom-start', w100}: PopoverProps) => {
	const {hover, onMouseLeave, onMouseEnter} = useHover();
	const arrowRef = useRef<HTMLDivElement | null>(null);
	const {x, y, reference, floating, strategy, middlewareData: {arrow: {x: arrowX, y: arrowY} = {}}} = useFloating({
		placement: position,
		middleware: [offset(10), arrow({
			element: arrowRef,
		})],
	});

	return (
		<div className={classNames([cls.popoverWrapper, className], {[cls.w100]: w100})}>
			<div
				ref={reference}
				onMouseLeave={onMouseLeave}
				onMouseEnter={onMouseEnter}
				className={classNames([cls.triggerWrapper, className], {[cls.w100]: w100})}
			>
				{children}
			</div>
			{hover && (
				<div
					ref={floating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
						width: 'max-content',
					}}
					className={classNames([cls.Popover, cls[position]])}
				>
					<div
						ref={arrowRef}
						className={cls.arrow}
						style={{
							left: arrowX != null ? `${arrowX}px` : '',
							top: position?.includes('bottom') ? '-10px' : '',
							right: '',
							bottom: position?.includes('top') ? '-10px' : '',
						}}>
					</div>
					{popoverContent}
				</div>
			)}
		</div>
	);
};
