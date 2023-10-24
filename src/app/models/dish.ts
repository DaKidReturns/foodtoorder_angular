export class Dish{
    id:number
    name:string
    image:string
    cost:number
    isAvailable:boolean
    description:string

    constructor(i:number,n:string,c:number,d:string,img:string,ia:boolean=true){
        this.id=i
        this.name=n
        this.image = img
        this.cost=c
        this.isAvailable=ia
        this.description=d
    }
}