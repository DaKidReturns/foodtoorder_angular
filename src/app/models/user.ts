import { Address } from "./address"

export class User{
    id:number
    firstName: string
    lastName: string
    role: string
    dob:string
    email:string
    password:string
    address:Address

    constructor(i:number=0,firstName:string ="",lastName:string="", 
        role:string="user", dob:string="", email:string="",password:string="",
        address:Address=new Address()){
        this.id = i
        this.firstName=firstName
        this.lastName=lastName
        this.role=role
        this.dob=dob
        this.email=email
        this.password=password
        this.address=address
    }
}
