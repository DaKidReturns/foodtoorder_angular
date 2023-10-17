import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.scss']
})

export class UpdateuserComponent {
  updateForm: FormGroup
  arrUsers: User[] = []
  user:User=new User()
  submitted:boolean = false
  currentUserRole:string = 'user'
  idUpdated:number = 0;
  
  constructor(private userService:UserService, fb:FormBuilder) {
    this.updateForm = fb.group({
      "id":[""],
      "firstName": ["",Validators.required],
      "lastName": ["",Validators.required],
      "email":["",Validators.email],
      "password":["",Validators.required],
      "confirmPassword":["",Validators.required],
      "mobileNumber":[""],
      "houseNumber":[""],
      "street":[""],
      "area":[""],
      "city":[""],
      "state":[""],
      "country":[""],
      "pincode":["",Validators.required],
      "role":[""]
    })
    userService.getUsers().subscribe(data=>{this.arrUsers = data}) 
    this.currentUserRole = localStorage.getItem('role')??'user';
  }

  get fc(){
    return this.updateForm.controls
  }

  get formValue(){
    return 
  }
  onChangeType(event:any){
    var idObtained = event.target.value
    console.log(idObtained.split(":")[1].trim())    
    this.idUpdated = parseInt(idObtained.split(":")[1].trim())
    //var user:User
    this.userService.getUserById(this.idUpdated).subscribe((data)=>{
      var user = data
      this.updateForm.get('id')?.setValue(user.id)
      this.updateForm.get('firstName')?.setValue(user.firstName)
      this.updateForm.get('lastName')?.setValue(user.lastName)
      this.updateForm.get('email')?.setValue(user.email)
      this.updateForm.get('password')?.setValue(user.password)
      this.updateForm.get('confirmPassword')?.setValue(user.password)
      // this.updateForm.get('mobileNumber')?.setValue(user.)
      this.updateForm.get('houseNumber')?.setValue(user.address.houseNo)
      this.updateForm.get('street')?.setValue(user.address.street)
      this.updateForm.get('area')?.setValue(user.address.area)
      this.updateForm.get('city')?.setValue(user.address.city)
      this.updateForm.get('state')?.setValue(user.address.state)
      this.updateForm.get('country')?.setValue(user.address.country)
      this.updateForm.get('pincode')?.setValue(user.address.pincode)
      this.updateForm.get('role')?.setValue(user.role)
    })
  }

  OnSubmit(value:string){
    this.submitted = true;
    if(this.updateForm.invalid){
      console.log("invalid form")
      console.log(this.updateForm.controls['lastName'].errors)
      return
    }
    console.log(value)
    // var maxId = 0
    // var tempId = 0
    // this.arrUsers.forEach((user)=>{
    //   if(maxId < user.id){
    //     maxId = user.id
    //   }
    // })
    // tempId = maxId+1
    // console.log(tempId)

    let firstName = this.updateForm.value.firstName
    let lastName = this.updateForm.value.lastName
    let email = this.updateForm.value.email
    let password = this.updateForm.value.password
    let mobileNumber = this.updateForm.value.mobileNumber
    let houseNumber:string = this.updateForm.value.houseNumber
    let street = this.updateForm.value.street
    let area = this.updateForm.value.area
    let city = this.updateForm.value.city
    let state = this.updateForm.value.state
    let country = this.updateForm.value.country
    let pincode = this.updateForm.value.pincode
    let role = this.currentUserRole == 'admin'? this.updateForm.value.role:'user'

    if(firstName==null   || lastName==null    ||
      email==null        || password==null    ||
      mobileNumber==null || houseNumber==null ||
      street==null       || area==null        ||
      city==null         || country==null     ||
      pincode==null      
      ){
      // do this if any fields are null
        return;
      }
    this.user = new User(
      this.idUpdated,firstName,
      lastName,role,"",
      email,password, 
      new Address(
        0,parseInt(houseNumber),
        street,area,country,
        state,country,pincode
      )
    )

    this.userService.updateUser(this.user).subscribe();
  }
}

