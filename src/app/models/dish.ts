export class Dish{
    id:number
    name:string
    cost:number
    isAvailable:boolean
    description:string

    constructor(i:number,n:string,c:number,d:string,ia:boolean=true){
        this.id=i
        this.name=n
        this.cost=c
        this.isAvailable=ia
        this.description=d
    }
}