import {ForwardedRef, forwardRef} from 'react';
import {Flex, FlexProps} from './Flex';

type HStackProps = Omit<FlexProps, 'direction'>

export const HStack = forwardRef((props: HStackProps, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<Flex ref={ref} direction='row' {...props}/>
	);
});
