import clsx from 'clsx';
import Link from 'next/link';
import {
	ElementType, FC, SVGProps, useMemo,
} from 'react';

type SidebarItemProps = {
	label: string,
	href?: string,
	onClick?: () => void,
	Icon: ElementType<SVGProps<SVGSVGElement>>,
	isActive?: boolean,
}

export const SidebarItem: FC<SidebarItemProps> = ({
	label, href, onClick, Icon, isActive,
}) => {
	const rootClassName = clsx('flex h-10 cursor-pointer items-center gap-x-2 rounded-[16px] px-2 hover:bg-hover1', isActive ? 'pointer-events-none text-primary30 hover:bg-transparent' : '');
	const content = useMemo(() => (
		<>
			<Icon className='size-5 shrink-0' />
			<div className={clsx(isActive ? 'body-normal-bold' : 'body-normal-medium')}>{label}</div>
		</>
	), [Icon, isActive, label]);

	return (
		<>
			{!!href && (
				<Link href={href} className={rootClassName}>
					{content}
				</Link>
			)}
			{!href && (
				<button type='button' onClick={onClick} className={rootClassName} aria-label='Log out'>
					{content}
				</button>
			)}
		</>
	);
};
