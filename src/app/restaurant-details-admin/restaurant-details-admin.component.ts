import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-details-admin',
  templateUrl: './restaurant-details-admin.component.html',
  styleUrls: ['./restaurant-details-admin.component.scss']
})
export class RestaurantDetailsAdminComponent {
  restaurant:Restaurant = new Restaurant(0,"",[],[],"");
  constructor(private activateRoute:ActivatedRoute,private  restaurantService:RestaurantService){
    this.activateRoute.params.subscribe((params:Params)=>{
      this.restaurant=restaurantService.getRestaurantById(params['rid'])
    })
  }
}
