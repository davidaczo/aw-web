import clsx from 'clsx';
import type { ReactNode, RefObject, CSSProperties } from 'react';
import {
	useCallback, useContext, useEffect, useLayoutEffect, useRef, useState,
} from 'react';

import { px } from '../../../../utils';
import { DropdownContext } from '../contexts/dropdown.context';

import styles from './Dropdown.module.scss';

const PY = 16;
const PX = 16;

const getTop = (ref: RefObject<HTMLDivElement>, anchorTop: number, anchorHeight: number) => {
	if (ref.current) {
		const { height } = ref.current.getBoundingClientRect();
		const initTop = anchorTop + anchorHeight + 8;
		let t = initTop;
		if (initTop + height > window.innerHeight - PY) {
			t = initTop - ((initTop + height) - window.innerHeight + PY);
		}
		return Math.max(t, PY);
	}
	return 0;
};

const getLeft = (ref: RefObject<HTMLDivElement>, anchorLeft: number, anchorWidth: number, minWidth: number) => {
	if (ref.current) {
		const { width } = ref.current.getBoundingClientRect();

		const w = Math.max(width, minWidth);
		let l = anchorLeft;
		if (w > anchorWidth) {
			l -= w / 2 - anchorWidth / 2;
		}
		return Math.max(Math.min(Math.max(l, PX), window.innerWidth - w - PX), PX);
	}
	return 0;
};

type DropdownProps = {
 children?: ReactNode;
 anchorRef: RefObject<any>;
 minWidth?: number,
 maxWidth?: number | null,
 isAnchorWidth?: boolean,
	className?: string,
};

export const Dropdown = ({
	children, anchorRef, minWidth = 120, maxWidth = 320, isAnchorWidth, className,
}: DropdownProps) => {
	const { state } = useContext(DropdownContext);
	const ref = useRef<HTMLDivElement>(null);
	const [rootStyle, setRootStyle] = useState<CSSProperties>({});

	const { width: anchorWidth } = anchorRef.current ? anchorRef.current.getBoundingClientRect() : { width: 0 };

	const calculateRootStyle = useCallback(() => {
		const {
			top, left, height, width,
		} = anchorRef.current ? anchorRef.current.getBoundingClientRect() : {
			top: 0, left: 0, height: 0, width: 0,
		};
		const mw = Math.min(minWidth, window.innerWidth - PX * 2);
		const style: CSSProperties = {
			top: getTop(ref, top, height),
			left: getLeft(ref, left, width, mw),
			minWidth: Math.min(Math.max(Math.min(window.innerWidth - PX * 2, width), mw), maxWidth || Number.POSITIVE_INFINITY),
		};
		setRootStyle(style);
	}, [anchorRef, minWidth, maxWidth]);

	useLayoutEffect(() => {
		calculateRootStyle();
	}, [calculateRootStyle]);

	useEffect(() => {
		const handleResize = () => {
			calculateRootStyle();
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [calculateRootStyle]);

	return (
		<span className={styles.dropdownRoot}>
			<div
				className={clsx(
					'fixed cursor-pointer select-none overflow-y-auto',
					'max-h-[calc(100vh-32px)] w-fit',
					isAnchorWidth && 'max-w-[min(var(--aw),calc(100vw-32px))]',
					!isAnchorWidth && (maxWidth ? 'max-w-[min(var(--mw),calc(100vw-32px))]' : 'max-w-[calc(100vw-32px)]'),
					state === 'background' ? 'pointer-events-none' : 'pointer-events-auto',
					className,
				)}
				style={{
					'--mw': maxWidth ? px(maxWidth) : 0, '--aw': px(anchorWidth), WebkitTapHighlightColor: 'transparent', ...rootStyle,
				} as never}
			>
				<div ref={ref}>
					{children}
				</div>
			</div>
		</span>
	);
};
