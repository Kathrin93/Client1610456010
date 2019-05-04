import { Image } from "./image";
export { Image } from "./image";
import { Author } from "./author";
export { Author } from "./author";
import { Order } from "./order";
export { Order } from "./order";

export class Book {
    constructor(
        public id : number,
        public isbn : string,
        public title : string,
        public authors : Author[],
        public orders : Order[],
        public published : Date,
        public user_id : number,
        public price : number,
        public subtitle? : string,
        public rating? : number,
        public images?: Image[],
        public description? : string,
        public amount? : number


    ){}


}
