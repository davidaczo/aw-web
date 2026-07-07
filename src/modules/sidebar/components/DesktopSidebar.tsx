import type { FC } from 'react';

import { SidebarContent } from './SidebarContent';

export const DesktopSidebar: FC = () => (
	<div className='sticky top-0 h-full  max-h-screen border-r-[1px] border-primary pb-2 pt-6'>
		<SidebarContent logoClassName='bg-pageBg' />
	</div>
);
