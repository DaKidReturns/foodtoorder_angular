import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-restaurantowner',
  templateUrl: './restaurantowner.component.html',
  styleUrls: ['./restaurantowner.component.scss']
})
export class RestaurantownerComponent {
    ownerId;
    arrRestaurants: Restaurant[] = []
    constructor(private restaurantService: RestaurantService, private router: Router) {
        this.ownerId = parseInt(localStorage.getItem("userId") ?? "-1")
        this.restaurantService.getRestaurants().subscribe((data)=>{
            //console.log(data)
            this.arrRestaurants = data.filter((restaurant)=>{
                return restaurant.ownerId==this.ownerId;
            })
            console.log(this.arrRestaurants)
        })
    }

    viewDetails(rid: number) {
        this.router.navigate(['restaurantdetailsadmin/' + rid])
    }

    deleteRestaurant(rid: number) {
        console.log(rid)
        this.restaurantService.deleteRestaurantById(rid).subscribe()
        this.arrRestaurants = this.restaurantService.getRestaurantByOwnerId(this.ownerId)
    }

    editRestaurant(rid:number){
        
    }
}
