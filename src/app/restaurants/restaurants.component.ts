import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit{
  role:string=""
  arrRestaurants:Restaurant[]=[]

  // This array is modified whenever the paginator is changed
  restaurantsToShow:Restaurant[]=[]

  length = 0;
  pageSize = 0;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];
  pageEvent: PageEvent = new PageEvent();

  constructor(private restaurantService:RestaurantService, private router:Router){
    restaurantService.getRestaurants().subscribe((data)=>{
      this.arrRestaurants=data;
      
      // declare variables for the paginator
      this.pageIndex = 0;
      this.pageSize = 2
      this.length = this.arrRestaurants.length
      this.restaurantsToShow = this.arrRestaurants.slice(this.pageIndex*this.pageSize, 
        (this.pageIndex+1)*this.pageSize)

    });
    this.role = localStorage.getItem('role') ??""

  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.restaurantsToShow = this.arrRestaurants.slice(this.pageIndex*this.pageSize, 
      (this.pageIndex+1)*this.pageSize)
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
