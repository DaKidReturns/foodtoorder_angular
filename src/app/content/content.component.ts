import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { RestaurantService } from '../services/restaurant.service';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent {
  //declare a variable and display it in the view
  // testVal = "I am the test value in a varable."
  choice: number = 0;
  arrUsers:User[]=[]
  
  constructor(private userService:UserService, private restaurantServie:RestaurantService){
    this.arrUsers=userService.getUsers()
  }

  
  ngOnInit() {
    this.choice = 1;

  }
  IsValidVoter(user: string) {
    if (user == "Jane") {
      return true;

    }
    return false;
  }
  nextChoice() {
    this.choice += 1;
    if (this.choice > 5) {
      this.choice = 1;
    }
  }
}

