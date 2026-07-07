import { FC } from 'react';

type CategoryDividerProps = {
 title: string,
}

export const CategoryDivider: FC<CategoryDividerProps> = ({ title })  => (
	<div className='flex items-center gap-1 text-primary'>
		<div className='body-tiny-medium'>{title.toUpperCase()}</div>
		<div className='h-px flex-1 bg-primary' />
	</div>
);
