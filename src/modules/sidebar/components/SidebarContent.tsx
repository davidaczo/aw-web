import clsx from 'clsx';
import { useRouter } from 'next/router';
import {
	ElementType, FC, SVGProps, useMemo,
} from 'react';
import { useSelector } from 'react-redux';

import Eye from '../../../assets/icons/eye';
import { getAppVersion } from '../../../utils';
import { selectMe } from '../../me/store/slice';
import { Logo } from '../../ui/components/Logo';
import type { UserDetailedDto } from '../../user/store/types';

import { SidebarItem } from './SidebarItem';

type IsActiveFunction = (path: string) => boolean;
// const pathStartsWith = (options: string | string[]): IsActiveFunction => (path: string): boolean => {
// 	if (!Array.isArray(options)) {
// 		return path.startsWith(options);
// 	}
// 	for (let i = 0; i < options.length; i += 1) {
// 		if (path.startsWith(options[i])) {
// 			return true;
// 		}
// 	}
// 	return false;
// };

type ISidebarItem = {
	label: string,
	href: string,
	isActiveFunc?: IsActiveFunction,
	icon: ElementType<SVGProps<SVGSVGElement>>,
}

export interface ICategory {
	name: string,
	isActive: boolean,
	menuItems: ISidebarItem[],
}

const getCategories = (user: UserDetailedDto | null): ICategory[] => {
	if (user) {
		const homeList: Array<ISidebarItem> = [];
		const adminList: Array<ISidebarItem> = [];

		const haveActive = (v: any[]): boolean => !!v.find(({ isActive }) => isActive);

		homeList.push({ label: 'Dashboard', href: '/', icon: Eye });
		homeList.push({ label: 'Examples', href: '/examples', icon: Eye });

		const red: ICategory[] = [];
		if (homeList.length) {
			red.push({ name: 'Home', menuItems: homeList, isActive: haveActive(homeList) });
		}
		if (adminList.length) {
			red.push({ name: 'Admin', menuItems: adminList, isActive: haveActive(adminList) });
		}
		return red;
	}
	return [];
};

type SidebarContentProps = {
	logoClassName?: string,
}

export const SidebarContent: FC<SidebarContentProps> = ({ logoClassName }) => {
	const { asPath } = useRouter();
	const me = useSelector(selectMe);

	const categories = useMemo(() => getCategories(me), [me]);

	return (
		<div className='flex h-full flex-col justify-between'>
			<div className='flex-1 overflow-y-auto'>
				<div className={clsx('sticky top-0 pb-8 text-center', logoClassName)}>
					<Logo className='mx-auto' size={26} />
				</div>
				<div className='flex flex-col gap-y-5 px-2'>
					{categories.map(({ name, menuItems }, i) => (
						<div key={i.toString()}>
							{/* <CategoryDivider title={name} /> */}
							{/* <div className='mt-2'> */}
							{menuItems.map(({
								label, href, icon, isActiveFunc,
							}) => (
								<SidebarItem
									key={label}
									label={label}
									href={href}
									Icon={icon}
									isActive={isActiveFunc ? isActiveFunc(asPath) : asPath === href}
								/>
							))}
							{/* </div> */}
						</div>
					))}
				</div>
			</div>
			{/* eslint-disable react/no-danger */}
			<div
				className='body-tiny-regular whitespace-pre-wrap pt-2 text-center leading-4'
				dangerouslySetInnerHTML={{
					__html: `Version: <strong>${getAppVersion()}</strong>\nApi version: <strong>${me?.apiVersion || 'N/A'}</strong>`,
				}}
			/>
		</div>
	);
};
