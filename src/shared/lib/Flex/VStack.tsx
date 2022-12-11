import {ForwardedRef, forwardRef} from 'react';
import {Flex, FlexProps} from './Flex';

type VStackProps = Omit<FlexProps, 'direction'>

export const VStack = forwardRef((props: VStackProps, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<Flex ref={ref} direction='column' {...props}/>
	);
});
