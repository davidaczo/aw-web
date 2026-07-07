import clsx from 'clsx';
import type { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import Close from '../../../assets/icons/close';
import { px } from '../../../utils';
import { selectMe } from '../../me/store/slice';
import type { UserMinDto } from '../../user/store/types';

import { Avatar } from './Avatar';

type AvatarWithNameProps = {
 user: UserMinDto,
 deleteMode?: boolean,
 onClick?: (e: MouseEvent) => void,
 onDelete?: (e: MouseEvent) => void,
	className?: string,
}

export const AvatarWithName: FC<AvatarWithNameProps> = ({
	user, deleteMode, onClick, onDelete, className,
}) => {
	const me = useSelector(selectMe);
	const isMe = !!me && me.id === user.id;

	const handleDelete = (e: MouseEvent) => {
		if (deleteMode && onDelete) {
			onDelete(e);
		}
	};

	return (
		<div
			className={clsx(
				'flex w-fit min-w-0 max-w-[210px] items-center gap-2 rounded-[20px] py-1 pl-2 pr-3 hover:bg-cardBg',
				onClick ? 'cursor-pointer' : 'cursor-default',
				className,
			)}
			onClick={onClick}
		>
			{deleteMode && onDelete && (
				<div
					className='flex aspect-square shrink-0 cursor-pointer items-center justify-center rounded-[50%] bg-errorBg1 text-white'
					style={{ width: px(28) }}
					onClick={handleDelete}
				>
					<Close className='size-5' />
				</div>
			)}
			{(!deleteMode || !onDelete) && (
				<Avatar user={user} size={28} style={{ cursor: 'inherit' }} />
			)}
			<div className={clsx(
				'body-normal-medium line-clamp-2 overflow-hidden pb-0.5',
				isMe ? 'font-bold' : 'font-medium')}
			>
				{user.fullName}
			</div>
		</div>
	);
};
