import {LazyLoadEvent} from 'primeng/api';
import {Table} from 'primeng/table';
import {Paginator} from 'primeng/paginator';

export class PrimengTableHelper {
    predefinedRecordsCountPerPage = [5, 10, 25, 50];

    defaultRecordsCountPerPage = 10;

    isResponsive = true;

    resizableColumns: false;

    totalRecordsCount = 0;

    records: any[];

    isLoading = false;
    scrollableCols: any[];
    frozenCols: any[];
    getSorting(table: Table): string {
        let sorting;
        if (table.sortField) {
            sorting = table.sortField;
            if (table.sortOrder === 1) {
                sorting += ' ASC';
            } else if (table.sortOrder === -1) {
                sorting += ' DESC';
            }
        }

        return sorting;
    }

    getMaxResultCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.rows) {
            return paginator.rows;
        }

        if (!event) {
            return 0;
        }

        return event.rows;
    }

    getSkipCount(paginator: Paginator, event: LazyLoadEvent): number {
        if (paginator.first) {
            return paginator.first;
        }

        if (!event) {
            return 0;
        }

        return event.first;
    }

    shouldResetPaging(event: LazyLoadEvent): boolean {
        if (!event /*|| event.sortField*/) { // if you want to reset after sorting, comment out parameter
            return true;
        }

        return false;
    }
}
