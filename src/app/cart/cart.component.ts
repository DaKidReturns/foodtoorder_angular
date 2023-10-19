import { Component } from '@angular/core';

import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { Dish } from '../models/dish';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  loggedInUserId:number = -1
  cart:Cart = new Cart()
  
  constructor(private cartService:CartService, private restaurantService:RestaurantService){
    this.loggedInUserId = parseInt(localStorage.getItem('userId')??'-1') ?? -1
      cartService.getCartById(this.loggedInUserId).subscribe((data) => { this.cart = data })
  }
  
  removeItemFromCart(item:Dish){
    
  }
  addAgainToCart(item:Dish){
    this.cartService.addItemToCart(item,this.cart)
  }
}
