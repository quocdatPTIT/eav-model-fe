export class GetTicketsReq {
    dateTimeFilters?: TicketFilter<Date>;
    decimalFilters?: TicketFilter<number>;
    intFilters?: TicketFilter<number>;
    varcharFilters?: TicketFilter<number>;
    textFilters?: TicketFilter<string>;

    constructor(public skip: number,  public take: number) {}

}

export class TicketFilter<T> {
    backendType: string;
    filters: FilterValues<T>;
}

export class FilterValues<T> {
    optionType?: string;
    attributeId: number;
    value: T;
}
