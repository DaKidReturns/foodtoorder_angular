
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { UserService } from '../services/user.service';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { User } from '../models/user';

@Component({
  selector: 'app-order-details-admin',
  templateUrl: './order-details-admin.component.html',
  styleUrls: ['./order-details-admin.component.scss']
})
export class OrderDetailsAdminComponent {
  orderItem:Order = new Order(0,0,[],0,"")
  userOrdered: User = new User()
  restaurantOrdered: Restaurant = new Restaurant()
  constructor(private orderservice:OrderService,private userService: UserService, private restaurantService:RestaurantService, private activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe((params:Params)=>{
      orderservice.getOrderById(params['orderId']).subscribe((value)=>{
        this.orderItem=value
        userService.getUserById(this.orderItem.userId).subscribe((data)=>this.userOrdered=data)
        restaurantService.getRestaurantById(this.orderItem.userId).subscribe((data)=>this.restaurantOrdered=data)
      })
    })
  }
}
