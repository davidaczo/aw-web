import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';

import { px, SIDEBAR_WIDTH } from '../../../utils';
import { useSidebar } from '../../ui/contexts/sidebar.context';

import { SidebarContent } from './SidebarContent';

type MobileSidebarProps = {
	isMobileView: boolean,
};

export const MobileSidebar: FC<MobileSidebarProps> = ({ isMobileView }) => {
	const { host, isOpen, closeSidebar } = useSidebar();

	useEffect(() => {
		if (!isMobileView) {
			closeSidebar();
		}
	}, [isMobileView, closeSidebar]);

	const handleBackdropClick = () => {
		closeSidebar();
	};

	if (isMobileView && !!host) {
		return createPortal(
			<FocusLock returnFocus disabled={!isOpen}>
				<AnimatePresence>
					{isOpen && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								exit={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.2 }}
								className='fixed inset-0 z-[100] bg-black/60'
								onClick={handleBackdropClick}
							/>
							<motion.div
								initial={{ left: px(-SIDEBAR_WIDTH) }}
								exit={{ left: px(-SIDEBAR_WIDTH) }}
								animate={{ left: 0 }}
								transition={{ duration: 0.2 }}
								className={clsx('modal-shadow fixed top-0 z-[101] h-full max-h-screen w-[var(--width)] rounded-r-[16px] bg-cardBg pb-2 pt-6')}
								style={{ '--width': px(SIDEBAR_WIDTH) } as never}
							>
								<SidebarContent logoClassName='bg-cardBg' />
							</motion.div>
						</>
					)}
				</AnimatePresence>
			</FocusLock>, host,
		);
	}

	return null;
};
