import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {
    arrUsers: User[] = []
    //   arrUsers = [
    //     new User(1, "Brian", "Cranston", "user", "12/04/1976", "breakinggood@gmail.com", "JesseWhereIsTheProduct", "22/1 Albaquerque"),
    //     new User(2, "Gandalf", "White", "admin", "01/03/1800", "mageSupereme@Elfmail.com", "Youshallnotpass", "45 MiddleEarth"),
    //     new User(3, "Jonathan", "Jostar", "restaurantowner", "12/04/1888", "theultimateGentleman@gmail.com", "Diowhydidyoudothis", "22/1 London"),
    //     new User(4, "Jonathan", "Jostar", "restaurantowner", "12/04/1888", "sample@mail.com", "hellothere", "22/1 London")
    //   ]

    constructor(private userService: UserService, fb:FormBuilder) {
      userService.getUsers().subscribe(data=>{this.arrUsers = data}) 
    }

  VerifyCredentials(email: HTMLInputElement, password: HTMLInputElement) {

    var foundUser = this.arrUsers.find((u) => u.email == email.value)
    if (foundUser == null) {
      alert("Usernot found");
      return;
    }
    if (foundUser.password == password.value) {
      console.log(foundUser.role);
      localStorage.setItem("role", foundUser.role)
        localStorage.setItem("userId", foundUser.id.toString());
        alert("Login Successful")
    }
  }
}
