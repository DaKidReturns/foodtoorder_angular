export class User{
    id:number
    firstName: string
    lastName: string
    role: string
    dob:string
    email:string
    password:string
    addressId:string

    constructor(i:number,firstName:string,lastName:string, role:string, dob:string, email:string,password:string,addressId:string){
        this.id = i
        this.firstName=firstName
        this.lastName=lastName
        this.role=role
        this.dob=dob
        this.email=email
        this.password=password
        this.addressId=addressId
    }
}
