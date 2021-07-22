import {ChangeDetectorRef, Component, Injector, OnInit, ViewChild} from '@angular/core';

import {FROZEN_COLUMNS, SCROLL_COLUMNS} from '../list-ticket-columns';
import {TicketService} from '../ticket.service';
import {AppComponentBase} from '../../../shared/app-component-base';

import {Paginator} from 'primeng/paginator';

import {GetTicketsReq} from '../models/get-tickets-req.model';
import {GetTicketsRes} from '../models/get-tickets-res.model';

import {finalize} from 'rxjs/operators';

import '../extension-method';
@Component({
    selector: 'app-list-ticket',
    templateUrl: './list-ticket.component.html',
    styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent extends AppComponentBase implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    filters: GetTicketsReq;
    constructor(injector: Injector, private ticketService: TicketService, private cdf: ChangeDetectorRef) {
        super(injector);
    }

    ngOnInit(): void {
        this.primengTableHelper.frozenCols = FROZEN_COLUMNS;
        this.primengTableHelper.scrollableCols = SCROLL_COLUMNS;
        this.filters = new GetTicketsReq(0, this.primengTableHelper.defaultRecordsCountPerPage);
        this.ticketService.getAttributesTicket().subscribe(res => {
            res.attributes.forEach(attr => this.primengTableHelper.scrollableCols.push({...attr, style: {width: '250px'}}));
        });
        this.list();
    }

    paginate($event: any) {
        this.filters.skip = this.primengTableHelper.getSkipCount(this.paginator, $event);
        this.filters.take = this.primengTableHelper.getMaxResultCount(this.paginator, $event);
        this.list();

    }

    list(): void {
        this.primengTableHelper.isLoading = true;
        this.ticketService.getTickets(this.filters)
            .pipe(
                finalize(() => {
                    this.primengTableHelper.isLoading = false;
                    this.cdf.detectChanges();
                })
            )
            .subscribe((result: GetTicketsRes) => {
                this.primengTableHelper.records = result.tickets;
                this.primengTableHelper.totalRecordsCount = result.total;
            });
    }
}
