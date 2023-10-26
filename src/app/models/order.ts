import { Dish } from "./dish"

export class Order{
    id:number
    userId:number
    items:Dish[]
    amount:number
    orderDate:string
    quantity:number[]
    restaurantId:number

    constructor(ono:number=-1,uid:number=-1,items:Dish[]=[],amount:number=0,d:string|null=null,quantity:number[]=[],restId=-1){
        this.id=ono
        this.userId=uid
        this.items=items
        this.amount = amount
        this.orderDate= d == null? "" : new Date().toISOString()
        this.quantity = quantity
        this.restaurantId = restId
    }
    
}