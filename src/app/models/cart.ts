import { Dish } from "./dish"

export class Cart{
    id:number
    items:Dish[]
    amount:number
    quantity:number[]
    constructor(uid:number=-1,items:Dish[]=[],amount:number=0,quantity=[]){
        this.id=uid
        this.items=items
        this.amount = amount
        this.quantity = quantity
    }
}