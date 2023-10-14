import { Dish } from "./dish"

export class Cart{
    userId:number
    items:Dish[]
    amount:number

    constructor(uid:number,items:Dish[],amount:number){
        this.userId=uid
        this.items=items
        this.amount = amount
    }
}