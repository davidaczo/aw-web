import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	FC, useEffect, MouseEvent, useRef,
} from 'react';
import { useSelector } from 'react-redux';

import ArrowLeft from '../../../assets/icons/arrow-left';
import ChevronDown from '../../../assets/icons/chevron-down';
import Menu from '../../../assets/icons/menu';
import { useHeader } from '../../../providers/header.context';
import { px } from '../../../utils';
import { selectMe } from '../../me/store/slice';
import { useSidebar } from '../contexts/sidebar.context';
import { useDropdownRef } from '../dropdown/hooks/useDropdownRef';

import { AccountMenu } from './account-menu/AccountMenu';
import { Avatar } from './Avatar';

const HEIGHT = 60;

const headerAnimation = {
	variants: {
		close: { top: px(-(HEIGHT + 1)) },
		open: { top: 0 },
	},
	initial: 'close',
	transition: { duration: 0.2 },
};

type HeaderProps = {
	title?: string,
	isMobileView?: boolean,
	backPath?: string,
	onBack?: () => void,
	onLogout: () => void,
	withMenu?: boolean,
}

export const Header: FC<HeaderProps> = ({
	title, isMobileView, backPath, onBack, onLogout, withMenu = true,
}) => {
	const me = useSelector(selectMe);

	const { isOpen, onOpenChange } = useHeader();

	const { openSidebar } = useSidebar();

	const avatarRef = useRef<HTMLDivElement>(null);
	const accountMenuRef = useDropdownRef();

	const handleAvatarClick = () => {
		accountMenuRef.open();
	};

	useEffect(() => {
		const handleScroll = () => {
			onOpenChange(window.scrollY >= 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [onOpenChange]);

	const handleMenuClick = (e: MouseEvent) => {
		e.stopPropagation();
		openSidebar();
	};

	return (
		<div className='sticky top-0 z-[9]'>
			<div className='mx-auto grid h-[var(--height)] max-w-[1220px] grid-cols-[32px_1fr_52px] items-center gap-x-4 bg-pageBg px-4' style={{ '--height': px(HEIGHT) } as never}>
				<div>
					{(!!backPath || !!onBack) && (
						<>
							{onBack ? (
								<div className='cursor-pointer' onClick={onBack}>
									<ArrowLeft className='size-6' />
								</div>
							) : (
								<Link href={backPath || ''} replace>
									<ArrowLeft className='size-6' />
								</Link>
							)}
						</>
					)}
					{!backPath && !onBack && isMobileView && withMenu && (
						<button type='button' onClick={handleMenuClick} aria-label='Menu'>
							<Menu className='size-8' />
						</button>
					)}
				</div>
				<div>
					<div className='title-h4 line-clamp-2 pb-1 text-center leading-[1.6rem] max-[420px]:title-h5 max-[420px]:leading-[1.4rem]'>{title}</div>
				</div>
				<div>
					{!!me && (
						<>
							<div className='flex cursor-pointer items-center' onClick={handleAvatarClick}>
								<Avatar user={me} onClick={handleAvatarClick} ref={avatarRef} />
								<ChevronDown className='size-5 shrink-0 text-text1' />
							</div>
							<AccountMenu
								ref={accountMenuRef.ref}
								anchorRef={avatarRef}
								onLogout={onLogout}
							/>
						</>
					)}
				</div>
			</div>
			<motion.div {...headerAnimation} animate={isOpen ? 'open' : 'close'} className='relative h-px bg-primary' />
		</div>
	);
};
