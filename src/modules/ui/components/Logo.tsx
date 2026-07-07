import clsx from 'clsx';
import { FC, useMemo } from 'react';

import { px } from '../../../utils';

type Props = {
	size?: number,
	className?: string
}

export const Logo: FC<Props> = ({ size = 26, className }) => {
	const sTracking = useMemo(() => Math.round(size * 0.3038), [size]);
	const sMt = useMemo(() => Math.round(size * 0.406923), [size]);

	return (
		<div className={clsx('flex select-none flex-col items-center whitespace-nowrap', className)}>
			<div
				className='scale-y-[0.7] text-center font-semibold uppercase transition-all duration-300'
				style={{
					fontSize: px(size),
					letterSpacing: px(sTracking),
					paddingLeft: px(sTracking),
					marginTop: px(-sMt),
				}}
			>
				test
			</div>
		</div>
	);
};
