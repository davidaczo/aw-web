import clsx from 'clsx';
import {
	FC, PropsWithChildren, useEffect, useLayoutEffect, useState,
} from 'react';

import { px, SIDEBAR_WIDTH } from '../../../utils';
import { useLogout } from '../../auth';
import { Header } from '../../ui/components/Header';
import { SidebarContextProvider } from '../../ui/contexts/sidebar.context';

import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

type WithSidebarProps = {
	title?: string,
	backPath?: string,
	onBack?: () => void,
	contentClassName?: string,
	withSidebar?: boolean,
}

export const WithSidebar: FC<PropsWithChildren<WithSidebarProps>> = ({
	children, title, backPath, onBack, contentClassName, withSidebar = true,
}) => {
	const [isMobileView, setMobileView] = useState(false);
	const { handleLogout } = useLogout();

	useLayoutEffect(() => {
		setMobileView(window.innerWidth <= 600);
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setMobileView(window.innerWidth <= 600);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<SidebarContextProvider>
			<div
				className={clsx('grid min-h-screen bg-pageBg', isMobileView || !withSidebar ? 'grid-cols-1' : 'grid-cols-[var(--sidebar-width)_auto]')}
				style={{ '--sidebar-width': px(SIDEBAR_WIDTH) } as never}
			>
				{!isMobileView && withSidebar && <DesktopSidebar />}
				<div>
					<Header title={title} isMobileView={isMobileView} onLogout={handleLogout} backPath={backPath} onBack={onBack} withMenu={withSidebar} />
					<div className={clsx('pt-[40px]', contentClassName)}>
						{children}
					</div>
				</div>
				{withSidebar && <MobileSidebar isMobileView={isMobileView} />}
			</div>
		</SidebarContextProvider>
	);
};
