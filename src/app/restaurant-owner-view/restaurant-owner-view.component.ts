import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-owner-view',
  templateUrl: './restaurant-owner-view.component.html',
  styleUrls: ['./restaurant-owner-view.component.scss']
})
export class RestaurantOwnerViewComponent {
  ownerId:number
  constructor(){
    this.ownerId = parseInt(localStorage.getItem('userId')??"0")
    console.log(this.ownerId)
  }
}
