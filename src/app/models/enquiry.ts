export class Enquiry{
    Name:string=""
    PhoneNumber:string=""
    Email:string=""
    Description:string=""
    constructor(name:string="",phoneNumber:string="",email:string="",description:string=""){
        this.Name=name
        this.PhoneNumber=phoneNumber
        this.Email=email
        this.Description=description
    }

}