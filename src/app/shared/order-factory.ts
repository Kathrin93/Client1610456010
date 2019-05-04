import { Order } from './order';


export class OrderFactory {

    static empty(): Order {
        return new Order(null,  0, 0, 0, [], 1, []);
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.netto,
            rawOrder.brutto,
            rawOrder.state,
            rawOrder.books,
            rawOrder.user_id,
            rawOrder.oderlogs
           // typeof(rawOrder.time) === 'string' ?
               // new Date(rawOrder.time) : rawOrder.time


        );
    }
}



