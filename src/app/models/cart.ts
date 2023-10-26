import { Dish } from "./dish"

export class Cart{
    id:number
    items:Dish[]
    amount:number
    quantity:number[]
    restaurantId:number

    constructor(uid:number=-1,items:Dish[]=[],amount:number=0,quantity:number[]=[],restId:number=-1 ){
        this.id=uid
        this.items=items
        this.amount = amount
        this.quantity = quantity
        this.restaurantId = restId
    }
    clear(){
        this.items=[]
        this.amount=0
        this.quantity=[]
        this.restaurantId=-1
    }
}