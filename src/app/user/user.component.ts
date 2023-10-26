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
export class UserComponent implements OnInit{
  // @Input() userName:string='initial';
  users:User[]=[]
  constructor(private userService:UserService,private cartService:CartService,private router:Router){
    userService.getUsers().subscribe(data=>{this.users = data}) 
  }


  ngOnInit(): void{
    // console.log(this.userName)
  }

  viewUser(i:number){
    this.router.navigate(['userdetails/'+i])
  }
  deleteUser(i:number){
    this.userService.deleteUserById(i).subscribe((data)=>{
      this.cartService.deleteCartById(i).subscribe()
    })
    
  }
}
