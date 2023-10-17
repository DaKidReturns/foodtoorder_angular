import { Dish } from "./dish"

export class Cart{
    id:number
    items:Dish[]
    amount:number

    constructor(uid:number=-1,items:Dish[]=[],amount:number=0){
        this.id=uid
        this.items=items
        this.amount = amount
    }
}