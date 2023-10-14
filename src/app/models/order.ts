import { Dish } from "./dish"

export class Order{
    orderId:number
    userId:number
    items:Dish[]
    amount:number
    oderDate:string

    constructor(ono:number,uid:number,items:Dish[],amount:number,d:string){
        this.orderId=ono
        this.userId=uid
        this.items=items
        this.amount = amount
        this.oderDate=d
    }
    
}