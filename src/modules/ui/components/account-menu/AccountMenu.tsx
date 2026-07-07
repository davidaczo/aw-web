import { useRouter } from 'next/router';
import {
	RefObject, useCallback, useRef,
} from 'react';
import { useSelector } from 'react-redux';

import Cog from '../../../../assets/icons/cog';
import Logout from '../../../../assets/icons/logout';
import SvgTheme from '../../../../assets/icons/theme';
import { Theme, useTheme } from '../../../../providers/theme.context';
import { selectMe } from '../../../me/store/slice';
import { Dropdown } from '../../dropdown/components/Dropdown';
import { useDropdownRef } from '../../dropdown/hooks/useDropdownRef';
import { createDropdown } from '../../dropdown/store/actions';
import { Avatar } from '../Avatar';

import { AccountMenuItem } from './AccountMenuItem';
import { ThemeMenu } from './theme-menu';

type AccountMenuProps = {
 anchorRef: RefObject<any>,
	onLogout: () => void,
}

const themeMap: Record<Theme, string> = {
	system: 'System',
	light: 'Light',
	dark: 'Dark',
};

export const AccountMenu = createDropdown<AccountMenuProps>(({ anchorRef, onLogout }) => {
	const me = useSelector(selectMe);

	const { theme } = useTheme();

	const themeDropdown = useDropdownRef();
	const themeMenuRef = useRef<HTMLDivElement>(null);

	const { push } = useRouter();

	const handleAvatarClick = useCallback(() => {
		push('/settings');
	}, [push]);

	return (
		<>
			<Dropdown
				anchorRef={anchorRef}
				minWidth={240}
				maxWidth={300}
				className='modal-shadow max-h-[calc(75vh-32px)] rounded-[16px] bg-cardBg'
			>
				<div className='flex w-full flex-col gap-y-2 p-3'>
					{!!me && (
						<div onClick={handleAvatarClick} className='mb-2 flex items-center gap-2 rounded-[16px] px-2 py-3 hover:bg-hover1'>
							<Avatar user={me} />
							<div>
								<div className='body-large-medium leading-[1.1rem]'>{me.fullName}</div>
							</div>
						</div>
					)}
					<AccountMenuItem Icon={SvgTheme} label='Theme' value={themeMap[theme]} rootRef={themeMenuRef} onClick={() => themeDropdown.open()} />
					<AccountMenuItem Icon={Cog} label='Settings' href='/settings' />
					<AccountMenuItem Icon={Logout} label='Log out' onClick={onLogout} className='text-errorText1' />
				</div>
			</Dropdown>
			<ThemeMenu ref={themeDropdown.ref} anchorRef={themeMenuRef} onClose={themeDropdown.close} />
		</>
	);
});
