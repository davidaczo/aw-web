export type ListState<T, F> = {
	items: T[],
	filters: F,
}

export type PaginationMeta = {
totalItems: number,
	itemCount: number,
	itemsPerPage: number,
	totalPages: number,
	currentPage: number,
}

export type PaginatedListState<T, F> = {
	items: T[],
	meta: PaginationMeta,
	filters: F,
}

export type CreationResponseDto = {
	id: string,
};

export type ModificationResponseDto = {
	success: boolean,
};
