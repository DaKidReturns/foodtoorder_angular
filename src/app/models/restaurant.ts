import { Address } from "./address"
import { Dish } from "./dish"

export class Restaurant{
    id:number
    name:string
    addresses:Address[]
    items:Dish[]
    image:string
    ownerId:number

    constructor(i:number=0, nam:string="",addr:Address[]=[],m:Dish[]=[],img:string="",oid:number=0){
        this.id = i
        this.name = nam
        this.addresses =addr
        this.items=m
        this.image=img
        this.ownerId=oid
    }


}