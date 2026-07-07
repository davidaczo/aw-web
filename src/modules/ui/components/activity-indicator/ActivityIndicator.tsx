import clsx from 'clsx';
import type { FC } from 'react';

import { px } from '../../../../utils';

import styles from './ActivityIndicator.module.scss';

type ActivityIndicatorSize = 'lg' | 'md' | 'sm' | 'xs';

export type ActivityIndicatorProps = {
	size?: ActivityIndicatorSize;
	progress?: number; // 0 to 100
	spinning?: boolean;
	className?: string;
	color?: string;
};

const sizeMap: Record<ActivityIndicatorSize, [number, number]> = {
	lg: [40, 6],
	md: [32, 5],
	sm: [24, 4],
	xs: [16, 3],
};

export const ActivityIndicator: FC<ActivityIndicatorProps> = ({
	size = 'md', progress = 42, spinning = true, className, color,
}) => {
	const [width, strokeWidth] = sizeMap[size];
	const circumference = width * Math.PI;

	const style = {
		'--radius': px(width / 2),
		'--stroke-width': px(strokeWidth),
		'--progress': circumference * (1 - progress / 100),
		'--circumference': circumference,
	} as never;

	return (
		<div className={className} style={{ width: width + strokeWidth }}>
			<svg className={clsx(styles.svg, spinning && styles.spinning)} style={style}>
				<circle className={styles.track} />
				<circle className={styles.indicator} style={{ stroke: color }} />
			</svg>
		</div>
	);
};
