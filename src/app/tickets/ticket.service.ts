import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GetTicketsReq} from '@app/tickets/models/get-tickets-req.model';
import {Observable} from 'rxjs';
import {GetTicketsRes} from '@app/tickets/models/get-tickets-res.model';
import { map } from 'rxjs/operators';
import {GetAttributesTicketRes} from '@app/tickets/models/get-attributes-ticket.model';

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    constructor(private http: HttpClient) {
    }

    getTickets(req: GetTicketsReq): Observable<GetTicketsRes> {
        return this.http.post<GetTicketsRes>('http://localhost:21021/api/services/app/Ticket/GetTickets', req)
            .pipe(
                map(res => res['result'])
            );
    }

    getAttributesTicket(): Observable<GetAttributesTicketRes> {
        return this.http.get<GetAttributesTicketRes>('http://localhost:21021/api/services/app/EavTicket/GetAttributesTicket')
            .pipe(
                map(res => res['result'])
            );
    }
}
