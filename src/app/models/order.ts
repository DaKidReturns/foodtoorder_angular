import { Dish } from "./dish"

export class Order{
    id:number
    userId:number
    items:Dish[]
    amount:number
    oderDate:string
    quantity:number[]
    constructor(ono:number=-1,uid:number=-1,items:Dish[]=[],amount:number=0,d:string="",quantity:number[]=[]){
        this.id=ono
        this.userId=uid
        this.items=items
        this.amount = amount
        this.oderDate=d
        this.quantity = quantity
    }
    
}