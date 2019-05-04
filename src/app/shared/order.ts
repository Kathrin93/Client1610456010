import { Book } from "./book";
import { Orderlog } from "./orderlog";


export class Order {

    constructor(
        public id : number,
        public netto : number,
        public brutto : number,
        public state : number,
        public books : Book [],
        public user_id : number,
        public orderlogs?: Orderlog []
        //public time? : Date


    ){}

}
