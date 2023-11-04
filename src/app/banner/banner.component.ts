import { Component, OnChanges } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestaurantService } from '../services/restaurant.service';
import { Observable, interval, map, take } from 'rxjs';
import { Dish } from '../models/dish';
import { Restaurant } from '../models/restaurant';
import { Address } from '../models/address';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

// Apply the async pipe to create an auto suggest for serarch dishes

export class BannerComponent {
  arrUsers: User[] = []
  searchString = ""
  dishList$: Observable<Dish[]> = new Observable<Dish[]>
  dishList: Dish[] = []
  constructor(private userService: UserService, private restaurantService: RestaurantService, private fb: FormBuilder) {
    //restaurantService.updateDishes()
    userService.getUsers().subscribe(data => { this.arrUsers = data })
    this.searchString = ""


    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        data.forEach(
          (restaurant) => restaurant.items.forEach(
            (dish) => {
              this.dishList.push(dish)
            }
          )
        )
      }
    )
  }
  onChange(event: string) {
    console.log(event)
    let dl: Dish[] = []
    this.restaurantService.getDishes().subscribe((data) => {
      console.log(data)
      dl = data.filter((dish) => dish.name.toLowerCase().startsWith(event.toLowerCase()))
      
      this.dishList$ = interval(1).pipe(map(i => dl), take(dl.length))
    }
    )
  }

  isLoggedIn() {
    return localStorage.getItem('userId') != null
  }

  logOut() {
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    localStorage.removeItem('token')
  }

  VerifyCredentials(email: HTMLInputElement, password: HTMLInputElement) {

    this.userService.login(new User(0,"","","","",email.value,password.value,new Address())).subscribe((data)=>{
      console.log(data);
    })
  }
  //   var foundUser = this.arrUsers.find((u) => u.email == email.value)
  //   if (foundUser == null) {
  //     alert("Usernot found");
  //     return;
  //   }
  //   if (foundUser.password == password.value) {
  //     // console.log(foundUser.role);
  //     localStorage.setItem("role", foundUser.role)
  //     localStorage.setItem("userId", foundUser.id.toString());
  //     alert("Login Successful")
  //   }
}
