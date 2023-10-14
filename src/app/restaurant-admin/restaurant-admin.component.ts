import { Component } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-admin',
  templateUrl: './restaurant-admin.component.html',
  styleUrls: ['./restaurant-admin.component.scss']
})
export class RestaurantAdminComponent {
  arrRestaurants:Restaurant[]=[]
  constructor(private restaurantService:RestaurantService, private router:Router ){
    this.arrRestaurants=restaurantService.getRestaurants()
  }
  viewDetails(i:number){
    this.router.navigate(['restaurantdetailsadmin/'+i])
  }
  deleteRestaurant(i:number){
    this.restaurantService.deleteRestaurantById(i)
  }
}
