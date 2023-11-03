import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users:User[]=[]
  UserRole : string = ""
  constructor(private userService:UserService,private cartService:CartService,private router:Router){
    userService.getUsers().subscribe(data=>{this.users = data
    console.log(data)
    }) 
  }

  /**
   * Navigates to the page where the user details will be shown
   * @param id The id of the user whose details needs to be shown
   */
  viewUser(id:number){
    this.router.navigate(['userdetails/'+id])
  }

  /**
   * This function calls the deleteUserById from the user service and alsoe
   * deletes the corresponding user's cart
   * @param id : The id of the user who needs to be deleted.
   */
  deleteUser(id:number){
    this.userService.deleteUserById(id).subscribe((data)=>{
      this.cartService.deleteCartById(id).subscribe()
    })
  }

  getUserByRole(){
    console.log(this.UserRole)
    this.userService.getUserByRoles(this.UserRole).subscribe((data)=>{
      this.users = data
    })
  }

}
