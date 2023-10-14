export class Address{
    id:Number
    houseNo:number
    street:string
    area:string
    city:string
    state:string
    country:string
    pincode:string

    constructor(id:Number,hn:number, st:string,ar:string,ct: string,state:string, country:string, pincode:string){
        this.id=id
        this.houseNo = hn
        this.street=st
        this.area = ar
        this.state = state
        this.city = ct
        this.country = country
        this.pincode = pincode
    }
}