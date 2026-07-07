import clsx from 'clsx';
import {
	FC, Fragment, HTMLAttributeAnchorTarget, ReactNode,
} from 'react';

import { px } from '../../../utils';

const commonValueClassName = clsx('max-[380px]:mt-[-12px]');

export type PropertyTableItem = { label: string, value: string | ReactNode, href?: string, target?: HTMLAttributeAnchorTarget }

type PropertyTableProps = {
 items: Array<PropertyTableItem>,
 firstColWidth?: number,
	size?: 'sm' | 'md',
 className?: string,
}

export const PropertyTable: FC<PropertyTableProps> = ({
	items, firstColWidth = 120, size = 'sm', className,
}) => (
	<div
		className={clsx(
			'grid grid-cols-[var(--first-col-w)_auto] items-center gap-3 max-[380px]:grid-cols-1',
			size === 'sm' ? 'body-small-regular' : 'body-normal-regular',
			className,
		)}
		style={{ '--first-col-w': px(firstColWidth) } as never}
	>
		{items.map(({
			label, value, href, target,
		}) => (
			<Fragment key={label}>
				<div className='break-smart font-medium'>
					{`${label}:`}
				</div>
				{typeof value === 'string' && (
					<>
						{href ? (
							<a
								href={href}
								className={clsx('break-smart font-medium text-primaryLight', commonValueClassName)}
								target={target}
							>
								{value}
							</a>
						) : (
							<div className={clsx('break-smart font-normal', commonValueClassName)}>{value}</div>
						)}
					</>
				)}
				{typeof value !== 'string' && (
					<span className={commonValueClassName}>{value}</span>
				)}
			</Fragment>
		))}
	</div>
);
