import clsx from 'clsx';
import { useRouter } from 'next/router';
import type {
	ElementType, FC, RefObject, SVGProps,
} from 'react';

type AccountMenuItemProps = {
	rootRef?: RefObject<HTMLDivElement>,
 Icon?: ElementType<SVGProps<SVGSVGElement>>,
 label: string,
	value?: string,
 onClick?: () => void,
	href?: string,
 className?: string,
};

export const AccountMenuItem: FC<AccountMenuItemProps> = ({
	rootRef, Icon, label, value, onClick, href, className,
}) => {
	const { push } = useRouter();

	const handleNavigate = () => {
		if (href) {
			push(href);
		}
	};

	return (
		<div
			ref={rootRef}
			className={clsx('rounded-[16px] px-2 py-3 hover:bg-hover1', className)}
			onClick={href ? handleNavigate : onClick}
		>
			<div className=' flex items-center gap-x-2'>
				{!!Icon && <Icon className='size-6 shrink-0' />}
				<div>
					<div className='body-normal-medium'>{label}</div>
					{!!value && <div className='body-tiny-regular -mt-0.5 text-primary0 dark:text-primary40'>{value}</div>}
				</div>
			</div>
		</div>
	);
};
