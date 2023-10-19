import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Dish } from '../models/dish';

@Component({
  selector: 'app-restaurant-details-admin',
  templateUrl: './restaurant-details-admin.component.html',
  styleUrls: ['./restaurant-details-admin.component.scss']
})
export class RestaurantDetailsAdminComponent {
  restaurant:Restaurant = new Restaurant(0,"",[],[],"");
  constructor(private activateRoute:ActivatedRoute,private  restaurantService:RestaurantService){
    this.activateRoute.params.subscribe((params:Params)=>{
      restaurantService.getRestaurantById(params['rid']).subscribe((data)=>this.restaurant=data)
    })
  }
  onChangeAvailability(dish:Dish){
    dish.isAvailable = !dish.isAvailable
    var index = this.restaurant.items.findIndex((d)=>dish==d)
    this.restaurant.items[index]=dish
    this.restaurantService.updateRestaurant(this.restaurant).subscribe(
      (data)=>{location.reload()}
    )

  }
}
