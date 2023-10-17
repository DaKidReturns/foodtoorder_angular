import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signupform',
  templateUrl: './signupform.component.html',
  styleUrls: ['./signupform.component.scss']
})
export class SignupformComponent{
  signUpForm: FormGroup
  arrUsers: User[] = []
  user:User=new User()
  submitted:boolean = false
  currentUserRole:string = 'user'

  constructor(private userService:UserService, private cartService:CartService, fb:FormBuilder) {
    this.signUpForm = fb.group({
      "firstName": ["",Validators.required],
      "lastName": ["",Validators.required],
      "email":["",Validators.email],
      "password":["",Validators.required],
      "confirmPassword":["",Validators.required],
      "mobileNumber":["",Validators.required],
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
  }

  get fc(){
    return this.signUpForm.controls
  }

  OnSubmit(value:string){
    this.submitted = true;
    if(this.signUpForm.invalid){
      console.log("invalid form")
      console.log(this.signUpForm.controls['lastName'].errors)
      return
    }
    console.log(value)
    var maxId = 0
    var tempId = 0
    this.arrUsers.forEach((user)=>{
      if(maxId < user.id){
        maxId = user.id
      }
    })
    tempId = maxId+1
    console.log(tempId)

    let firstName = this.signUpForm.value.firstName
    let lastName = this.signUpForm.value.lastName
    let email = this.signUpForm.value.email
    let password = this.signUpForm.value.password
    let mobileNumber = this.signUpForm.value.mobileNumber
    let houseNumber:string = this.signUpForm.value.houseNumber
    let street = this.signUpForm.value.street
    let area = this.signUpForm.value.area
    let city = this.signUpForm.value.city
    let state = this.signUpForm.value.state
    let country = this.signUpForm.value.country
    let pincode = this.signUpForm.value.pincode
    let role = this.currentUserRole == 'admin'? this.signUpForm.value.role:'user'

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
      tempId,firstName,
      lastName,role,"",
      email,password, 
      new Address(
        0,parseInt(houseNumber),
        street,area,country,
        state,country,pincode
      )
    )

    this.userService.addUser(this.user).subscribe(()=>{
     // location.reload()

    });
    this.cartService.addCart(new Cart(this.user.id))

  }
}
