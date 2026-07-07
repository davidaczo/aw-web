import clsx from 'clsx';
import {
	Fragment, ReactNode, useCallback, useMemo,
} from 'react';

import { useIntersect } from '../../../hooks/useIntersect';
import { useJsonApi } from '../../api/jsonApi';

type Props<T> = {
 dataKey: string,
 listSelector: any,
 loadFunc: any,
 loadNextPageFunc: any,
 renderItem: (item: T, index: number, listLength: number) => ReactNode,
 nothingToShowText: string,
}

export const PaginatedList = <T extends { id: string}, >({
	dataKey, listSelector, loadFunc, loadNextPageFunc, renderItem, nothingToShowText,
}: Props<T>) => {
	const api = useJsonApi();
	const list = listSelector(dataKey);

	const hasMore = useMemo(() => list?.meta?.currentPage < list?.meta?.totalPages, [list]);

	const [setBottomNode] = useIntersect({ threshold: 0 }, () => {
		if (hasMore) {
			api(loadNextPageFunc(dataKey));
		}
	});

	const bottomRef = useCallback((node: any) => {
		if (node) {
			setBottomNode(node);
		}
	}, [setBottomNode]);

	if (!list) {
		return <></>;
	}

	return (
		<div>
			{!list.items.length ? (
				<div className='mt-6 text-center'>{nothingToShowText}</div>
			) : (
				<>
					{list.items.map((item: T, i: number) => (
						<Fragment key={item.id}>{renderItem(item, i, list.items.length)}</Fragment>
					))}
					<div ref={bottomRef} className={clsx('mt-8 text-center', hasMore ? 'block' : 'hidden')}>
						<div>loading</div>
					</div>
				</>
			)}
		</div>
	);
};
