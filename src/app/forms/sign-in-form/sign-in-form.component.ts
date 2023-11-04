import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {

  signInForm: FormGroup
  arrUsers: User[] = []
  submitted:boolean = false
  userNameFound = true

  constructor(private userService: UserService, fb: FormBuilder) {
    this.signInForm = fb.group({
      "email": ["", Validators.compose([Validators.email, Validators.required])],
      "password": ["", Validators.required]
    })
    userService.getUsers().subscribe(data=>this.arrUsers = data)
  }

  get fc() {
    return this.signInForm.controls
  }

  OnSubmit(value: string){
    this.submitted = true
    if(this.signInForm.invalid){
      return
    }
    this.userService.login(new User(0,"","","","",this.signInForm.value.email,this.signInForm.value.password,new Address())).subscribe((data)=>{
      // console.log(data);
      let usr = data as any;
      localStorage.setItem("role", usr.role)
      localStorage.setItem("userId", usr.userId.toString());
      localStorage.setItem("token", usr.token);
      location.reload();
    })
    // var foundUser = this.arrUsers.find((u) => u.email == this.signInForm.value.email)
    // if (foundUser == null) {
    //   this.userNameFound = false
    //   this.signInForm.controls['email'].setErrors({userNotFound:true})
    //   return;
    // }
    // if (foundUser.password == this.signInForm.value.password) {
    //   console.log(foundUser.role);
    //   localStorage.setItem("role", foundUser.role)
    //   localStorage.setItem("userId", foundUser.id.toString());
    //   alert("Login Successful");
    //   location.reload();
    // }else{
    //   this.signInForm.controls['password'].setErrors({passwordIncorrect:true})
    // }
  }
}
