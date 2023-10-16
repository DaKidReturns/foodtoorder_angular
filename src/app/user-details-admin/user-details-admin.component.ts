import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user';
import { Address } from '../models/address';

@Component({
  selector: 'app-user-details-admin',
  templateUrl: './user-details-admin.component.html',
  styleUrls: ['./user-details-admin.component.scss']
})
export class UserDetailsAdminComponent {
  user:User=new User(0,"","","","","","",new Address())
  
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService){
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.user = userService.getUserById(params['userId'])
    })
  }
}
