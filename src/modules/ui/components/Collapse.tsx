import { motion } from 'framer-motion';
import type { FC, PropsWithChildren } from 'react';

const getCollapseAnimation = (isOpen: boolean) => ({
	variants: {
		close: { height: 0 },
		open: { height: 'fit-content' },
	},
	initial: isOpen ? 'open' :  'close',
	transition: { duration: 0.3 },
});

type CollapseProps = {
 isOpen: boolean,
}

export const Collapse: FC<PropsWithChildren<CollapseProps>> = ({ children, isOpen }) => (
	<motion.div {...getCollapseAnimation(isOpen)} className='overflow-hidden' animate={!isOpen ? 'close' : 'open'}>
		{children}
	</motion.div>
);
