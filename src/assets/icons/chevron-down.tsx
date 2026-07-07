import type { SVGProps } from 'react';

const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
	<svg viewBox='0 0 24 24' width='1em' height='1em' {...props} fill='currentColor'>
		<path d='M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z' />
	</svg>
);
export default SvgChevronDown;
