export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}
export class PaginationResault<T> {
    result: T;
    pagination: Pagination;
}
