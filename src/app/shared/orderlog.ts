
export class Orderlog {

    constructor(
        public id : number,
        public time : Date,
        public public_comment : string,
        public comment : string,
        public state : number,
        public username : string,
        public order_id : number
    ){}

}
