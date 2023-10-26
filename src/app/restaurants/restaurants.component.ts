import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})

export class RestaurantsComponent implements AfterViewInit{
  role:string=""
  arrRestaurants:Restaurant[]=[]
  availableArray:boolean[]=[]
  itemsUnavailable:[number,number][] = []
  totalNumberOfUnavailableDishes: number = 0
  // This array is modified whenever the paginator is changed
  restaurantsToShow:Restaurant[]=[]
  

  length = 0;
  pageSize = 0;
  pageIndex = 0;
  pageSizeOptions = [1, 2, 5];
  pageEvent: PageEvent = new PageEvent();


  constructor(private restaurantService:RestaurantService, private router:Router, private cd: ChangeDetectorRef){

    restaurantService.getRestaurants().subscribe((data)=>{
      this.arrRestaurants=data;

      restaurantService.getUnavailableDishes().subscribe(data=>{
        this.itemsUnavailable=data
      })

      restaurantService.getAllUnavailableDishes().subscribe(data=>{
        this.totalNumberOfUnavailableDishes = data
      })
      // declare variables for the paginator
      this.pageIndex = 0;
      this.pageSize = 2
      this.length = this.arrRestaurants.length
      this.restaurantsToShow = this.arrRestaurants.slice(this.pageIndex*this.pageSize, 
        (this.pageIndex+1)*this.pageSize)
        this.restaurantsToShow.forEach(()=> this.availableArray.push(true))
    });
    this.role = localStorage.getItem('role') ??""

  }
  ngAfterViewInit(): void {
      this.cd.detectChanges();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.restaurantsToShow = this.arrRestaurants.slice(this.pageIndex*this.pageSize, 
      (this.pageIndex+1)*this.pageSize)
    
    //this.availableArray.splice(0,Infinity)
    //this.restaurantsToShow.forEach(()=> this.availableArray.push(true))
    // location.reload()
    this.cd.detectChanges();
  }

  modifyAvailableArray(event:boolean, index:number){
    this.availableArray[index] = event
  }

  viewDetails(id:number){
    
    this.router.navigate(['restaurantdetails/'+id])
  }
  getRestaurants(){
    return this.arrRestaurants;
  }
  showUnAvailableItems(id:number){
    return this.itemsUnavailable.find((x)=>x[0] == id)??[-1,-1]
  }
}
