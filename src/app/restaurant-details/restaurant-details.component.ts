import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent {
  restaurant:Restaurant = new Restaurant(0,"",[],[],"");
  constructor(private activateRoute:ActivatedRoute,private restaturantService:RestaurantService){
    this.activateRoute.params.subscribe((params:Params)=>{
      console.log("Details for "+params['rid']);
      this.restaurant=restaturantService.getRestaurantById(params['rid']);
    })
  }
}
