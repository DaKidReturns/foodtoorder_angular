import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit{
  role:string=""
  arrRestaurants:Restaurant[]=[]

  constructor(private restaurantService:RestaurantService, private router:Router){
    
    restaurantService.getRestaurants().subscribe((data)=>{this.arrRestaurants=data});
    this.role = localStorage.getItem('role') ??""

  }
  
  ngOnInit(){

  }
  viewDetails(id:number){
    
    this.router.navigate(['restaurantdetails/'+id])
  }
  getRestaurants(){
    return this.arrRestaurants;
  }
}
